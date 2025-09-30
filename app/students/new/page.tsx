'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStudentData } from '@/types/student';
import StudentForm from '@/components/StudentForm';
import { AddIcon } from '@/components/icons/3DIcons';

export default function NewStudent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: CreateStudentData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newStudent = await response.json();
        router.push(`/students/${newStudent.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'خطا در ایجاد دانش‌آموز جدید');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      alert('خطا در ایجاد دانش‌آموز جدید');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <AddIcon className="w-8 h-8 text-blue-600" />
                  افزودن دانش‌آموز جدید
                </h1>
                <p className="text-gray-600">اطلاعات دانش‌آموز جدید را وارد کنید</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">در حال ایجاد دانش‌آموز...</p>
            </div>
          ) : (
            <StudentForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
