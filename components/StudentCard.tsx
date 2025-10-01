'use client';

import { Student } from '@/types/student';
import Link from 'next/link';
import { ViewIcon, EditIcon, GradeIcon, DisciplineIcon } from '@/components/icons/3DIcons';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const grades = student.grades || [];
  const averageGrade = grades.length > 0 
    ? (grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length).toFixed(1)
    : '0';

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 transition-all duration-300 border border-green-500 hover:border-green-400">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0 hover:w-20 hover:h-20 hover:border-green-400 transition-all duration-300">
            {student.profileImage ? (
              <img 
                src={student.profileImage} 
                alt={student.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                {student.fullName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{student.fullName}</h3>
            <p className="text-green-300">کلاس {student.className}</p>
            <p className="text-xs text-gray-400">ID: {student.id}</p>
          </div>
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-400">+{student.positivePoints || 0}</span>
            <span className="text-red-400">-{student.negativePoints || 0}</span>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <DisciplineIcon className="w-3 h-3" />
            انضباط: {student.discipline || 'نامشخص'}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <GradeIcon className="w-4 h-4" />
          نمرات:
        </h4>
        
        {/* Mini Chart with Icons */}
        {grades.length > 0 ? (
          <>
            <div className="mb-3 h-24 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grades.map(grade => ({
                  subject: grade.subject,
                  score: grade.score,
                  fill: grade.subject === 'ریاضی' ? '#3B82F6' :
                        grade.subject === 'علوم' ? '#10B981' :
                        grade.subject === 'فارسی' ? '#F59E0B' :
                        grade.subject === 'انگلیسی' ? '#8B5CF6' :
                        grade.subject === 'تاریخ' ? '#EF4444' : '#6B7280'
                }))}>
                  <XAxis 
                    dataKey="subject" 
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Bar dataKey="score" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Subject Icons - Properly aligned with chart bars */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4">
                {grades.map((grade, index) => {
                  const icon = grade.subject === 'ریاضی' ? '📐' :
                              grade.subject === 'علوم' ? '🔬' :
                              grade.subject === 'فارسی' ? '📚' :
                              grade.subject === 'انگلیسی' ? '🌍' :
                              grade.subject === 'تاریخ' ? '🏛️' : '📖';
                  
                  return (
                    <div 
                      key={index}
                      className="relative group cursor-pointer flex justify-center"
                      style={{ 
                        width: `${100 / grades.length}%`
                      }}
                    >
                      <div className="text-lg hover:scale-110 transition-transform duration-200">
                        {icon}
                      </div>
                      {/* Hover Tooltip */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {grade.subject}: {grade.score}/20
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {grades.map((grade, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-300">
                  <span>{grade.subject}:</span>
                  <span className="font-medium text-white">{grade.score}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-gray-400">
            <p>هنوز نمره‌ای ثبت نشده</p>
          </div>
        )}
        <div className="mt-2 pt-2 border-t border-gray-600">
          <div className="flex justify-between font-semibold text-gray-300">
            <span>میانگین:</span>
            <span className="text-blue-400">{averageGrade}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Link 
          href={`/students/${student.id}`}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group"
        >
          <ViewIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          مشاهده جزئیات
        </Link>
        <Link 
          href={`/students/${student.id}/edit`}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600 hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group"
        >
          <EditIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          ویرایش
        </Link>
      </div>

    </div>
  );
}
