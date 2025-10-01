'use client';

import { useState } from 'react';
import { Student, CreateStudentData } from '@/types/student';
import { GradeIcon, DisciplineIcon, AddIcon } from '@/components/icons/3DIcons';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: CreateStudentData) => void;
  onCancel: () => void;
  onFormChange?: (data: CreateStudentData) => void;
}

export default function StudentForm({ student, onSubmit, onCancel, onFormChange }: StudentFormProps) {
  const [formData, setFormData] = useState<CreateStudentData>({
    fullName: student?.fullName || '',
    className: student?.className || '701',
    grades: student?.grades || [
      { subject: 'ریاضی', score: 0 },
      { subject: 'علوم', score: 0 },
      { subject: 'فارسی', score: 0 },
      { subject: 'انگلیسی', score: 0 },
      { subject: 'تاریخ', score: 0 }
    ],
    discipline: student?.discipline || 0,
    positivePoints: student?.positivePoints || 0,
    negativePoints: student?.negativePoints || 0,
    profileImage: student?.profileImage || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (newData: Partial<CreateStudentData>) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    if (onFormChange) {
      onFormChange(updatedData);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'نام کامل الزامی است';
    }
    
    if (!['701', '702'].includes(formData.className)) {
      newErrors.className = 'کلاس باید 701 یا 702 باشد';
    }
    
    formData.grades.forEach((grade, index) => {
      if (grade.score < 0 || grade.score > 20) {
        newErrors[`grade_${index}`] = 'نمره باید بین 0 تا 20 باشد';
      }
    });
    
    if (formData.discipline < 0 || formData.discipline > 20) {
      newErrors.discipline = 'نمره انضباط باید بین 0 تا 20 باشد';
    }
    
    if (formData.positivePoints < 0) {
      newErrors.positivePoints = 'امتیاز مثبت نمی‌تواند منفی باشد';
    }
    
    if (formData.negativePoints < 0) {
      newErrors.negativePoints = 'امتیاز منفی نمی‌تواند منفی باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateGrade = (index: number, score: number) => {
    const newGrades = [...formData.grades];
    newGrades[index].score = score;
    updateFormData({ grades: newGrades });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData({ profileImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">اطلاعات پایه</h3>
          
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عکس پروفایل
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0">
                {formData.profileImage ? (
                  <img 
                    src={formData.profileImage} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {formData.fullName.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 hover:bg-gray-600 transition-all duration-200"
                />
                <p className="text-xs text-gray-400 mt-1">فرمت‌های مجاز: JPG, PNG, GIF</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام کامل *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
              }`}
              placeholder="نام کامل دانش‌آموز"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              کلاس *
            </label>
            <select
              value={formData.className}
              onChange={(e) => updateFormData({ className: e.target.value as '701' | '702' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.className ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
              }`}
            >
              <option value="701">701</option>
              <option value="702">702</option>
            </select>
            {errors.className && <p className="text-red-500 text-sm mt-1">{errors.className}</p>}
          </div>
        </div>

        {/* Grades */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <GradeIcon className="w-5 h-5" />
            نمرات
          </h3>
          {formData.grades.map((grade, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {grade.subject}
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={grade.score}
                onChange={(e) => updateGrade(index, parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`grade_${index}`] ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
                }`}
              />
              {errors[`grade_${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`grade_${index}`]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Discipline and Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <DisciplineIcon className="w-4 h-4" />
            نمره انضباط
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={formData.discipline}
            onChange={(e) => updateFormData({ discipline: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.discipline ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
            }`}
          />
          {errors.discipline && <p className="text-red-500 text-sm mt-1">{errors.discipline}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            امتیاز مثبت
          </label>
          <input
            type="number"
            min="0"
            value={formData.positivePoints}
            onChange={(e) => updateFormData({ positivePoints: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.positivePoints ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
            }`}
          />
          {errors.positivePoints && <p className="text-red-500 text-sm mt-1">{errors.positivePoints}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            امتیاز منفی
          </label>
          <input
            type="number"
            min="0"
            value={formData.negativePoints}
            onChange={(e) => updateFormData({ negativePoints: parseInt(e.target.value) || 0 })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.negativePoints ? 'border-red-500' : 'border-gray-600 bg-gray-700 text-white'
            }`}
          />
          {errors.negativePoints && <p className="text-red-500 text-sm mt-1">{errors.negativePoints}</p>}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <AddIcon className="w-4 h-4" />
          {student ? 'به‌روزرسانی' : 'ایجاد'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
