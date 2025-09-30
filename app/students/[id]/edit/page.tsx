'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Student, CreateStudentData } from '@/types/student';
import StudentForm from '@/components/StudentForm';
import { EditIcon } from '@/components/icons/3DIcons';

interface EditStudentProps {
  params: {
    id: string;
  };
}

export default function EditStudent({ params }: EditStudentProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (data: CreateStudentData) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/students/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/students/${params.id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'خطا در به‌روزرسانی اطلاعات دانش‌آموز');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      alert('خطا در به‌روزرسانی اطلاعات دانش‌آموز');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/students/${params.id}`);
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
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-600"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

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
                  <EditIcon className="w-8 h-8 text-green-600" />
                  ویرایش اطلاعات {student.fullName}
                </h1>
                <p className="text-gray-600">اطلاعات دانش‌آموز را به‌روزرسانی کنید</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {saving ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">در حال ذخیره تغییرات...</p>
            </div>
          ) : (
            <StudentForm
              student={student}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
