'use client';

import { useState, useRef, useEffect } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TimePicker({ 
  value, 
  onChange, 
  placeholder = "زمان را انتخاب کنید",
  className = ""
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState('18');
  const [minutes, setMinutes] = useState('00');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h || '18');
      setMinutes(m || '00');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeChange = (newHours: string, newMinutes: string) => {
    setHours(newHours);
    setMinutes(newMinutes);
    onChange(`${newHours}:${newMinutes}`);
    setIsOpen(false);
  };

  const formatTime = (h: string, m: string) => {
    return `${h}:${m}`;
  };

  const generateHours = () => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return { value: hour, label: hour };
    });
  };

  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => {
      const minute = i.toString().padStart(2, '0');
      return { value: minute, label: minute };
    });
  };

  const presetTimes = [
    { label: 'صبح', times: ['08:00', '09:00', '10:00', '11:00'] },
    { label: 'ظهر', times: ['12:00', '13:00', '14:00', '15:00'] },
    { label: 'عصر', times: ['16:00', '17:00', '18:00', '19:00'] },
    { label: 'شب', times: ['20:00', '21:00', '22:00', '23:00'] }
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value ? formatTime(hours, minutes) : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg">
          <div className="p-4">
            {/* Preset Times */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">زمان‌های پیش‌فرض</h4>
              <div className="grid grid-cols-2 gap-2">
                {presetTimes.map((preset) => (
                  <div key={preset.label}>
                    <p className="text-xs text-gray-400 mb-1">{preset.label}</p>
                    <div className="flex flex-wrap gap-1">
                      {preset.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            const [h, m] = time.split(':');
                            handleTimeChange(h, m);
                          }}
                          className={`px-2 py-1 text-xs rounded ${
                            value === time 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Time Selection */}
            <div className="border-t border-gray-600 pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">انتخاب زمان سفارشی</h4>
              
              <div className="flex items-center gap-4">
                {/* Hours */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">ساعت</label>
                  <select
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {generateHours().map((hour) => (
                      <option key={hour.value} value={hour.value}>
                        {hour.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-gray-400 text-lg">:</div>

                {/* Minutes */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-400 mb-1">دقیقه</label>
                  <select
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {generateMinutes().map((minute) => (
                      <option key={minute.value} value={minute.value}>
                        {minute.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleTimeChange(hours, minutes)}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  تایید
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
