'use client';

import { Student } from '@/types/student';
import Link from 'next/link';
import { ViewIcon, EditIcon, GradeIcon, DisciplineIcon } from '@/components/icons/3DIcons';

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const averageGrade = student.grades.length > 0 
    ? (student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length).toFixed(1)
    : '0';

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{student.fullName}</h3>
          <p className="text-gray-300">کلاس {student.className}</p>
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-600">+{student.positivePoints}</span>
            <span className="text-red-600">-{student.negativePoints}</span>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <DisciplineIcon className="w-3 h-3" />
            انضباط: {student.discipline}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <GradeIcon className="w-4 h-4" />
          نمرات:
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {student.grades.map((grade, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-300">
              <span>{grade.subject}:</span>
              <span className="font-medium text-white">{grade.score}</span>
            </div>
          ))}
        </div>
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
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <ViewIcon className="w-4 h-4" />
          مشاهده جزئیات
        </Link>
        <Link 
          href={`/students/${student.id}/edit`}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <EditIcon className="w-4 h-4" />
          ویرایش
        </Link>
      </div>
    </div>
  );
}
