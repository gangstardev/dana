'use client';

import { useState, useEffect } from 'react';
import { StatsIcon, StudentIcon, GradeIcon } from '@/components/icons/3DIcons';
import Link from 'next/link';
import StudentCard from '@/components/StudentCard';
import { Student } from '@/types/student';

interface CompletionRecord {
  userId: string;
  fullName: string;
  studentId?: string;
  homeworkId?: string;
  completedAt: string;
  date: string;
  time: string;
}

export default function CompletionsPage() {
  const [completions, setCompletions] = useState<CompletionRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);
  const [homeworkContent, setHomeworkContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch completions
      const completionsResponse = await fetch('https://dana-homework-worker.ggk2703.workers.dev/api/completions');
      const completionsData = await completionsResponse.json();
      
      // Fetch students data from original students.json
      const studentsResponse = await fetch('/students.json');
      const studentsData = await studentsResponse.json();
      
      if (completionsData.success) {
        setCompletions(completionsData.completions);
      }
      
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to find student by name or ID
  const findStudentByName = (fullName: string, studentId?: string): Student | undefined => {
    // First try to find by studentId if available
    if (studentId) {
      const studentById = students.find(student => student.id === studentId);
      if (studentById) return studentById;
    }
    
    // Fallback to name matching
    return students.find(student => 
      student.fullName.toLowerCase().trim() === fullName.toLowerCase().trim()
    );
  };

  // Function to fetch homework content
  const fetchHomeworkContent = async (homeworkId: string) => {
    setLoadingContent(true);
    try {
      const response = await fetch(`https://dana-homework-worker.ggk2703.workers.dev/api/homework-content?id=${homeworkId}`);
      const data = await response.json();
      
      if (data.success) {
        setHomeworkContent(data.content);
        setSelectedHomework(homeworkId);
      }
    } catch (error) {
      console.error('Error fetching homework content:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  // Function to close homework popup
  const closeHomeworkPopup = () => {
    setSelectedHomework(null);
    setHomeworkContent(null);
  };

  // Function to clear all completions
  const clearAllCompletions = async () => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید همه تکالیف انجام شده را پاک کنید؟')) {
      return;
    }

    try {
      const response = await fetch('https://dana-homework-worker.ggk2703.workers.dev/api/clear-completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCompletions([]);
        alert('همه تکالیف انجام شده پاک شدند');
      } else {
        alert('خطا در پاک‌سازی تکالیف');
      }
    } catch (error) {
      console.error('Error clearing completions:', error);
      alert('خطا در پاک‌سازی تکالیف');
    }
  };

  if (loading) {
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
                    <StatsIcon className="w-8 h-8 text-green-400" />
                    گزارش تکالیف انجام شده
                  </h1>
                  <p className="text-green-300 mt-2">لیست دانش‌آموزانی که تکالیف خود را انجام داده‌اند</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="ml-4 text-green-300">در حال بارگذاری...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  <StatsIcon className="w-8 h-8 text-green-400" />
                  گزارش تکالیف انجام شده
                </h1>
                <p className="text-green-300 mt-2">لیست دانش‌آموزانی که تکالیف خود را انجام داده‌اند</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-lg">
                <StatsIcon className="w-6 h-6 text-white" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-400">تکالیف انجام شده</p>
                <p className="text-2xl font-bold text-white">{completions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 rounded-lg">
                <StudentIcon className="w-6 h-6 text-white" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-400">دانش‌آموزان فعال</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(completions.map(c => c.userId)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500 rounded-lg">
                <GradeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-400">امروز</p>
                <p className="text-2xl font-bold text-white">
                  {completions.filter(c => c.date === new Date().toLocaleDateString('fa-IR')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Completions List */}
        <div className="bg-gray-900 rounded-lg shadow-lg border border-green-500">
          <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">لیست تکالیف انجام شده</h2>
            <button
              onClick={clearAllCompletions}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🗑️ پاک‌سازی همه
            </button>
          </div>

          {completions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <StatsIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">هنوز تکلیفی انجام نشده</h3>
              <p className="text-gray-300">وقتی دانش‌آموزان تکالیف خود را انجام دهند، اینجا نمایش داده می‌شود.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {completions
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .map((completion, index) => {
                  const student = findStudentByName(completion.fullName, completion.studentId);
                  
                  if (student) {
                    return (
                      <div key={index} className="relative">
                        <StudentCard student={student} />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          ✅ تکمیل شده
                        </div>
                        <div className="absolute bottom-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                          {completion.date} - {completion.time}
                        </div>
                        {completion.homeworkId && (
                          <div className="absolute bottom-2 right-2">
                            <button
                              onClick={() => completion.homeworkId && fetchHomeworkContent(completion.homeworkId)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                            >
                              📖 مشاهده تکلیف
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    // Fallback for students not found in database
                    return (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <StatsIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{completion.fullName}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">{completion.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">{completion.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ✅ تکمیل شده
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          )}
        </div>
      </div>

      {/* Homework Content Popup */}
      {selectedHomework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-green-500">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">مشاهده تکلیف</h3>
              <button
                onClick={closeHomeworkPopup}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {loadingContent ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  <span className="mr-3 text-green-300">در حال بارگذاری...</span>
                </div>
              ) : homeworkContent ? (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {homeworkContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">محتوای تکلیف یافت نشد</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
