'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import Link from 'next/link';
import { EditIcon, DeleteIcon, GradeIcon, DisciplineIcon, StatsIcon } from '@/components/icons/3DIcons';

interface StudentDetailProps {
  params: {
    id: string;
  };
}

export default function StudentDetail({ params }: StudentDetailProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudent();
  }, [params.id]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/api/students/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('آیا از حذف این دانش‌آموز اطمینان دارید؟')) {
      try {
        const response = await fetch(`/api/students/${params.id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          router.push('/');
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

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">دانش‌آموز یافت نشد</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  const averageGrade = student.grades.length > 0 
    ? (student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{student.fullName}</h1>
                <p className="text-gray-600">کلاس {student.className}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/students/${student.id}/edit`}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <EditIcon className="w-5 h-5" />
                ویرایش
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <DeleteIcon className="w-5 h-5" />
                حذف
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">اطلاعات پایه</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">نام کامل</label>
                  <p className="text-lg text-gray-900">{student.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">کلاس</label>
                  <p className="text-lg text-gray-900">{student.className}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">نمره انضباط</label>
                  <p className="text-lg text-gray-900">{student.discipline}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">میانگین نمرات</label>
                  <p className="text-lg text-gray-900">{averageGrade}</p>
                </div>
              </div>
            </div>

            {/* Grades */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <GradeIcon className="w-6 h-6" />
                نمرات دروس
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.grades.map((grade, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{grade.subject}</span>
                    <span className={`text-lg font-bold ${
                      grade.score >= 18 ? 'text-green-600' :
                      grade.score >= 15 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {grade.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Points Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">خلاصه امتیازات</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">امتیاز مثبت</span>
                  <span className="text-2xl font-bold text-green-600">+{student.positivePoints}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700 font-medium">امتیاز منفی</span>
                  <span className="text-2xl font-bold text-red-600">-{student.negativePoints}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">امتیاز خالص</span>
                  <span className={`text-2xl font-bold ${
                    student.positivePoints - student.negativePoints >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {student.positivePoints - student.negativePoints >= 0 ? '+' : ''}
                    {student.positivePoints - student.negativePoints}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <StatsIcon className="w-5 h-5" />
                نمودار عملکرد
              </h3>
              <div className="space-y-3">
                {student.grades.map((grade, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{grade.subject}</span>
                      <span>{grade.score}/20</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          grade.score >= 18 ? 'bg-green-500' :
                          grade.score >= 15 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(grade.score / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">عملیات سریع</h3>
              <div className="space-y-3">
                <Link
                  href={`/students/${student.id}/edit`}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center block flex items-center justify-center gap-2"
                >
                  <EditIcon className="w-4 h-4" />
                  ویرایش اطلاعات
                </Link>
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <DeleteIcon className="w-4 h-4" />
                  حذف دانش‌آموز
                </button>
                <Link
                  href="/"
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-center block"
                >
                  بازگشت به لیست
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
