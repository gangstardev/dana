'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import StudentCard from '@/components/StudentCard';
import Link from 'next/link';
import { StudentIcon, ClassIcon, GradeIcon, StatsIcon, AddIcon, SendIcon } from '@/components/icons/3DIcons';
import { useTheme } from '@/components/ThemeProvider';

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    className: '',
    searchName: '',
    minDiscipline: '',
    sortBy: 'name'
  });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, filters]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...students];

    // Filter by class
    if (filters.className) {
      filtered = filtered.filter(s => s.className === filters.className);
    }

    // Filter by name
    if (filters.searchName) {
      filtered = filtered.filter(s => 
        s.fullName.toLowerCase().includes(filters.searchName.toLowerCase())
      );
    }

    // Filter by minimum discipline
    if (filters.minDiscipline) {
      filtered = filtered.filter(s => s.discipline >= parseInt(filters.minDiscipline));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.fullName.localeCompare(b.fullName);
        case 'class':
          return a.className.localeCompare(b.className);
        case 'discipline':
          return b.discipline - a.discipline;
        case 'positivePoints':
          return b.positivePoints - a.positivePoints;
        case 'negativePoints':
          return b.negativePoints - a.negativePoints;
        default:
          return 0;
      }
    });

    setFilteredStudents(filtered);
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این دانش‌آموز اطمینان دارید؟')) {
      try {
        const response = await fetch(`/api/students/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setStudents(students.filter(s => s.id !== id));
        } else {
          alert('خطا در حذف دانش‌آموز');
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('خطا در حذف دانش‌آموز');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">سیستم مدیریت مدرسه دانا</h1>
              <p className="text-gray-300 mt-2">مدیریت دانش‌آموزان پایه هفتم</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <Link
                href="/subjects"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <GradeIcon className="w-5 h-5" />
                مدیریت دروس
              </Link>
              <Link
                href="/homework"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <SendIcon className="w-5 h-5" />
                ارسال تکلیف
              </Link>
              <Link
                href="/students/new"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <AddIcon className="w-5 h-5" />
                افزودن دانش‌آموز جدید
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">فیلترها و مرتب‌سازی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">کلاس</label>
              <select
                value={filters.className}
                onChange={(e) => setFilters({ ...filters, className: e.target.value })}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">همه کلاس‌ها</option>
                <option value="701">701</option>
                <option value="702">702</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">جستجو در نام</label>
              <input
                type="text"
                value={filters.searchName}
                onChange={(e) => setFilters({ ...filters, searchName: e.target.value })}
                placeholder="نام دانش‌آموز"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">حداقل انضباط</label>
              <input
                type="number"
                min="0"
                max="20"
                value={filters.minDiscipline}
                onChange={(e) => setFilters({ ...filters, minDiscipline: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">مرتب‌سازی بر اساس</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">نام</option>
                <option value="class">کلاس</option>
                <option value="discipline">انضباط</option>
                <option value="positivePoints">امتیاز مثبت</option>
                <option value="negativePoints">امتیاز منفی</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({
                  className: '',
                  searchName: '',
                  minDiscipline: '',
                  sortBy: 'name'
                })}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
              >
                پاک کردن فیلترها
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-900 rounded-lg">
                <StudentIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-300">کل دانش‌آموزان</p>
                <p className="text-2xl font-bold text-white">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-900 rounded-lg">
                <ClassIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-300">کلاس 701</p>
                <p className="text-2xl font-bold text-white">{students.filter(s => s.className === '701').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-900 rounded-lg">
                <ClassIcon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-300">کلاس 702</p>
                <p className="text-2xl font-bold text-white">{students.filter(s => s.className === '702').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-900 rounded-lg">
                <StatsIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-300">میانگین انضباط</p>
                <p className="text-2xl font-bold text-white">
                  {students.length > 0 
                    ? (students.reduce((sum, s) => sum + s.discipline, 0) / students.length).toFixed(1)
                    : '0'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">هیچ دانش‌آموزی یافت نشد</h3>
            <p className="text-gray-300">لطفاً فیلترهای جستجو را تغییر دهید یا دانش‌آموز جدیدی اضافه کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
}
