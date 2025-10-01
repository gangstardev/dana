'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subject } from '@/types/subject';
import SubjectForm from '@/components/SubjectForm';
import { EditIcon } from '@/components/icons/3DIcons';

interface EditSubjectProps {
  params: {
    id: string;
  };
}

export default function EditSubject({ params }: EditSubjectProps) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchSubject();
  }, [params.id]);

  const fetchSubject = async () => {
    try {
      const response = await fetch(`/api/subjects/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setSubject(data);
      } else {
        router.push('/subjects');
      }
    } catch (error) {
      console.error('Error fetching subject:', error);
      router.push('/subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/subjects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/subjects');
      } else {
        const error = await response.json();
        alert(error.error || 'خطا در به‌روزرسانی درس');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
      alert('خطا در به‌روزرسانی درس');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/subjects');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-green-300">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">درس یافت نشد</h1>
          <button
            onClick={() => router.push('/subjects')}
            className="text-green-400 hover:text-green-300"
          >
            بازگشت به لیست دروس
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
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
                  <EditIcon className="w-8 h-8 text-green-400" />
                  ویرایش درس {subject.name}
                </h1>
                <p className="text-green-300">اطلاعات درس را به‌روزرسانی کنید</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-green-500">
          {saving ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-green-300">در حال ذخیره تغییرات...</p>
            </div>
          ) : (
            <SubjectForm
              subject={subject}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
