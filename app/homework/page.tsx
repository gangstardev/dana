'use client';

import { useState, useEffect } from 'react';
import { AddIcon, GradeIcon, SendIcon } from '@/components/icons/3DIcons';
import Link from 'next/link';
import { Subject } from '@/types/subject';

interface HomeworkSubject {
  name: string;
  content: string;
  homework: string;
}

export default function HomeworkPage() {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('fa-IR'),
    className: '701',
    teacherName: '',
    subjects: [
      { name: '', content: '', homework: '' }
    ]
  });


  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setAvailableSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', content: '', homework: '' }]
    });
  };

  const updateSubject = (index: number, field: keyof HomeworkSubject, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const removeSubject = (index: number) => {
    if (formData.subjects.length > 1) {
      const newSubjects = formData.subjects.filter((_, i) => i !== index);
      setFormData({ ...formData, subjects: newSubjects });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      // Auto export students data first
      try {
        const exportResponse = await fetch('/api/export-students', { method: 'POST' });
        if (!exportResponse.ok) {
          console.warn('Export students failed, continuing with existing data');
        }
      } catch (exportError) {
        console.warn('Export students error:', exportError);
      }
      
      // Fetch students data to send with homework
      const studentsResponse = await fetch('/students-export.json');
      if (!studentsResponse.ok) {
        throw new Error(`Failed to fetch students data: ${studentsResponse.status}`);
      }
      const studentsData = await studentsResponse.json();

      const response = await fetch('https://dana-homework-worker.ggk2703.workers.dev/api/generate-homework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homeworkData: formData,
          studentsData: studentsData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.report);
        alert('گزارش با موفقیت تولید و ارسال شد!');
      } else {
        alert('خطا در تولید گزارش: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-green-500">
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
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <SendIcon className="w-8 h-8 text-green-600" />
                  ارسال تکلیف
                </h1>
                <p className="text-green-300 mt-2">تولید و ارسال گزارش تکالیف با هوش مصنوعی</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Info */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <GradeIcon className="w-5 h-5" />
              اطلاعات تکلیف
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    تاریخ
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                    placeholder="شنبه ۵ مهرماه"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    کلاس
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                  >
                    <option value="701">701</option>
                    <option value="702">702</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نام معلم
                  </label>
                  <input
                    type="text"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                    placeholder="نام معلم"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    در حال پردازش...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5" />
                    تولید و ارسال گزارش
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Subjects */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <AddIcon className="w-5 h-5" />
                دروس
              </h2>
              <button
                type="button"
                onClick={addSubject}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <AddIcon className="w-4 h-4" />
                افزودن درس
              </button>
            </div>

            <div className="space-y-4">
              {formData.subjects.map((subject, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-green-500 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">درس {index + 1}</h4>
                    {formData.subjects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <select
                      value={subject.name}
                      onChange={(e) => updateSubject(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                    >
                      <option value="">انتخاب درس</option>
                      {availableSubjects.map((subject) => (
                        <option key={subject.id} value={subject.name}>
                          {subject.icon} {subject.name}
                        </option>
                      ))}
                    </select>
                    
                    <textarea
                      value={subject.content}
                      onChange={(e) => updateSubject(index, 'content', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                      placeholder="محتوای تدریس شده"
                      rows={2}
                    />
                    
                    <textarea
                      value={subject.homework}
                      onChange={(e) => updateSubject(index, 'homework', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
                      placeholder="تکلیف جلسه آینده"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4">پیش‌نمایش گزارش</h2>
            
            {loading ? (
              <div className="space-y-4">
                {/* Skeleton Header */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Skeleton Content Lines */}
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-5/6 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-2/3 h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-4/5 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-3/5 h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-7/8 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Loading indicator */}
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-3 text-green-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
                    <span className="text-sm">در حال تولید گزارش...</span>
                  </div>
                </div>
              </div>
            ) : result ? (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-green-500 transition-all duration-200">
                <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">گزارش تولید نشده</h3>
                <p className="text-gray-300">برای مشاهده پیش‌نمایش، فرم را پر کنید و دکمه تولید را بزنید.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
