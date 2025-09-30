'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Student Icon - آیکون دانش‌آموز
export const StudentIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    {/* 3D Student Icon */}
    <defs>
      <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Head */}
    <circle 
      cx="12" 
      cy="8" 
      r="3" 
      fill="url(#studentGradient)" 
      filter="url(#shadow)"
    />
    
    {/* Body */}
    <path 
      d="M8 18c0-2.2 1.8-4 4-4s4 1.8 4 4" 
      stroke="url(#studentGradient)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#shadow)"
    />
    
    {/* Arms */}
    <path 
      d="M6 12l-2-2M18 12l2-2" 
      stroke="url(#studentGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
      filter="url(#shadow)"
    />
    
    {/* Book/Backpack */}
    <rect 
      x="10" 
      y="14" 
      width="4" 
      height="6" 
      rx="1" 
      fill="#8B5CF6" 
      filter="url(#shadow)"
    />
  </svg>
);

// Class Icon - آیکون کلاس
export const ClassIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="classGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="classShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Building/Classroom */}
    <rect 
      x="3" 
      y="6" 
      width="18" 
      height="12" 
      rx="2" 
      fill="url(#classGradient)" 
      filter="url(#classShadow)"
    />
    
    {/* Windows */}
    <rect x="6" y="9" width="3" height="3" fill="#F3F4F6" />
    <rect x="11" y="9" width="3" height="3" fill="#F3F4F6" />
    <rect x="16" y="9" width="3" height="3" fill="#F3F4F6" />
    
    {/* Door */}
    <rect x="9" y="15" width="2" height="3" fill="#6B7280" />
    
    {/* Roof */}
    <path d="M2 6l10-4 10 4" stroke="#EF4444" strokeWidth="2" fill="none" />
  </svg>
);

// Grade Icon - آیکون نمره
export const GradeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="gradeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="gradeShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Certificate/Document */}
    <rect 
      x="4" 
      y="6" 
      width="16" 
      height="12" 
      rx="2" 
      fill="url(#gradeGradient)" 
      filter="url(#gradeShadow)"
    />
    
    {/* Star */}
    <path 
      d="M12 2l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" 
      fill="#FCD34D" 
      filter="url(#gradeShadow)"
    />
    
    {/* Lines on document */}
    <line x1="7" y1="10" x2="17" y2="10" stroke="#F3F4F6" strokeWidth="1" />
    <line x1="7" y1="12" x2="15" y2="12" stroke="#F3F4F6" strokeWidth="1" />
    <line x1="7" y1="14" x2="13" y2="14" stroke="#F3F4F6" strokeWidth="1" />
  </svg>
);

// Discipline Icon - آیکون انضباط
export const DisciplineIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="disciplineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <filter id="disciplineShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Shield */}
    <path 
      d="M12 2l8 4v6c0 5.5-3.5 10-8 12s-8-6.5-8-12V6l8-4z" 
      fill="url(#disciplineGradient)" 
      filter="url(#disciplineShadow)"
    />
    
    {/* Checkmark */}
    <path 
      d="M9 12l2 2 4-4" 
      stroke="#F3F4F6" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Edit Icon - آیکون ویرایش
export const EditIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="editGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="editShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Pencil */}
    <path 
      d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" 
      stroke="url(#editGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#editShadow)"
    />
  </svg>
);

// View Icon - آیکون مشاهده
export const ViewIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="viewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <filter id="viewShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Eye */}
    <path 
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" 
      stroke="url(#viewGradient)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#viewShadow)"
    />
    <circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke="url(#viewGradient)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#viewShadow)"
    />
  </svg>
);

// Delete Icon - آیکون حذف
export const DeleteIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="deleteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <filter id="deleteShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Trash can */}
    <path 
      d="M3 6h18l-1 13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 6z" 
      fill="url(#deleteGradient)" 
      filter="url(#deleteShadow)"
    />
    <path 
      d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" 
      stroke="url(#deleteGradient)" 
      strokeWidth="2" 
      strokeLinecap="round"
      filter="url(#deleteShadow)"
    />
    <line x1="10" y1="11" x2="10" y2="17" stroke="#F3F4F6" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="11" x2="14" y2="17" stroke="#F3F4F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Add Icon - آیکون افزودن
export const AddIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="addGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <filter id="addShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Plus circle */}
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="url(#addGradient)" 
      filter="url(#addShadow)"
    />
    <path 
      d="M12 8v8M8 12h8" 
      stroke="#F3F4F6" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// Stats Icon - آیکون آمار
export const StatsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <filter id="statsShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Chart bars */}
    <rect x="3" y="16" width="4" height="5" fill="url(#statsGradient)" filter="url(#statsShadow)" />
    <rect x="8" y="12" width="4" height="9" fill="url(#statsGradient)" filter="url(#statsShadow)" />
    <rect x="13" y="8" width="4" height="13" fill="url(#statsGradient)" filter="url(#statsShadow)" />
    <rect x="18" y="4" width="4" height="17" fill="url(#statsGradient)" filter="url(#statsShadow)" />
  </svg>
);

// Send Icon - آیکون ارسال
export const SendIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="sendShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Send arrow */}
    <path 
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" 
      stroke="url(#sendGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#sendShadow)"
    />
    <circle 
      cx="22" 
      cy="2" 
      r="3" 
      fill="url(#sendGradient)" 
      filter="url(#sendShadow)"
    />
  </svg>
);
