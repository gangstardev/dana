'use client';

import { useState, useEffect } from 'react';
import { Subject } from '@/types/subject';
import { AddIcon, EditIcon, DeleteIcon } from '@/components/icons/3DIcons';
import SubjectForm from '@/components/SubjectForm';
import Link from 'next/link';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = async (data: any) => {
    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newSubject = await response.json();
        setSubjects([...subjects, newSubject]);
        setShowAddForm(false);
      } else {
        const error = await response.json();
        alert(error.error || 'خطا در ایجاد درس جدید');
      }
    } catch (error) {
      console.error('Error creating subject:', error);
      alert('خطا در ایجاد درس جدید');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این درس اطمینان دارید؟')) {
      // در اینجا API حذف را فراخوانی کنید
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">در حال بارگذاری...</p>
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
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">مدیریت دروس</h1>
                <p className="text-gray-300 mt-2">مدیریت دروس مدرسه</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <AddIcon className="w-5 h-5" />
              افزودن درس جدید
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddForm && (
          <div className="bg-gray-800 rounded-lg shadow-sm p-8 mb-8 border border-gray-700">
            <SubjectForm
              onSubmit={handleAddSubject}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{subject.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(subject.createdAt).toLocaleDateString('fa-IR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {/* ویرایش */}}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    title="ویرایش"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="حذف"
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {subject.description && (
                <p className="text-gray-300 text-sm mb-4">{subject.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  ایجاد شده در {new Date(subject.createdAt).toLocaleDateString('fa-IR')}
                </span>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">هیچ درسی یافت نشد</h3>
            <p className="text-gray-300">برای شروع، درس جدیدی اضافه کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
}
