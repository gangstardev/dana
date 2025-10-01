'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStudentData } from '@/types/student';
import StudentForm from '@/components/StudentForm';
import { AddIcon } from '@/components/icons/3DIcons';

export default function NewStudent() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateStudentData | null>(null);
  const router = useRouter();

  const handleFormChange = (data: CreateStudentData) => {
    setFormData(data);
  };

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
    <div>
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <AddIcon className="w-8 h-8 text-blue-400" />
                  افزودن دانش‌آموز جدید
                </h1>
                <p className="text-gray-300">اطلاعات دانش‌آموز جدید را وارد کنید</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-green-500">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-green-300">در حال ایجاد دانش‌آموز...</p>
            </div>
          ) : (
            <StudentForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              onFormChange={handleFormChange}
            />
          )}
        </div>
        
        {/* Preview Section */}
        <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-8 border border-green-500">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            پیش‌نمایش دانش‌آموز
          </h2>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                {formData?.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-2xl">
                    {formData?.fullName?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {formData?.fullName || 'دانش‌آموز جدید'}
              </h3>
              <p className="text-green-300 mb-4">
                {formData ? 'پیش‌نمایش اطلاعات' : 'اطلاعات دانش‌آموز پس از ثبت نمایش داده خواهد شد'}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-700 rounded-lg p-3">
                  <span className="text-gray-400">نام:</span>
                  <span className="text-white mr-2">{formData?.fullName || '-'}</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <span className="text-gray-400">کلاس:</span>
                  <span className="text-white mr-2">{formData?.className || '-'}</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <span className="text-gray-400">میانگین:</span>
                  <span className="text-white mr-2">
                    {formData?.grades ? 
                      (formData.grades.reduce((sum, grade) => sum + grade.score, 0) / formData.grades.length).toFixed(1) 
                      : '-'
                    }
                  </span>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <span className="text-gray-400">انضباط:</span>
                  <span className="text-white mr-2">{formData?.discipline || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
