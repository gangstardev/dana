'use client';

import { useState } from 'react';
import { CreateSubjectData } from '@/types/subject';
import { AddIcon } from '@/components/icons/3DIcons';

interface SubjectFormProps {
  onSubmit: (data: CreateSubjectData) => void;
  onCancel: () => void;
}

const availableIcons = [
  '📚', '📐', '🔬', '🌍', '🏛️', '🎨', '🎵', '⚽', '💻', '🧪',
  '📖', '✏️', '🎯', '🏆', '⭐', '🌟', '💡', '🔍', '📊', '🎪'
];

const availableColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export default function SubjectForm({ onSubmit, onCancel }: SubjectFormProps) {
  const [formData, setFormData] = useState<CreateSubjectData>({
    name: '',
    description: '',
    color: availableColors[0],
    icon: availableIcons[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'نام درس الزامی است';
    }
    
    if (formData.name.length < 2) {
      newErrors.name = 'نام درس باید حداقل 2 کاراکتر باشد';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <AddIcon className="w-5 h-5" />
          اطلاعات درس جدید
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            نام درس *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="نام درس"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            توضیحات
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="توضیحات درس (اختیاری)"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            آیکون
          </label>
          <div className="grid grid-cols-10 gap-2">
            {availableIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`p-2 text-2xl rounded-lg border-2 transition-colors ${
                  formData.icon === icon
                    ? 'border-blue-500 bg-blue-900'
                    : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            رنگ
          </label>
          <div className="grid grid-cols-5 gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-12 h-12 rounded-lg border-2 transition-colors ${
                  formData.color === color
                    ? 'border-white scale-110'
                    : 'border-gray-600 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">پیش‌نمایش:</h4>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: formData.color }}
            >
              {formData.icon}
            </div>
            <div>
              <p className="font-medium text-white">{formData.name || 'نام درس'}</p>
              <p className="text-sm text-gray-400">{formData.description || 'توضیحات درس'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <AddIcon className="w-4 h-4" />
          ایجاد درس
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
