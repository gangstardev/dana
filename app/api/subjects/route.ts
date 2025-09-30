import { NextRequest, NextResponse } from 'next/server';
import { Subject, CreateSubjectData } from '@/types/subject';

// Mock data - در پروژه واقعی از دیتابیس استفاده کنید
let subjects: Subject[] = [
  {
    id: '1',
    name: 'ریاضی',
    description: 'درس ریاضی پایه هفتم',
    color: '#3B82F6',
    icon: '📐',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'علوم',
    description: 'درس علوم تجربی',
    color: '#10B981',
    icon: '🔬',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'فارسی',
    description: 'درس زبان و ادبیات فارسی',
    color: '#F59E0B',
    icon: '📚',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'انگلیسی',
    description: 'درس زبان انگلیسی',
    color: '#8B5CF6',
    icon: '🌍',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'تاریخ',
    description: 'درس تاریخ و جغرافیا',
    color: '#EF4444',
    icon: '🏛️',
    createdAt: new Date()
  }
];

export async function GET() {
  try {
    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت دروس' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateSubjectData = await request.json();
    
    // اعتبارسنجی
    if (!data.name || !data.color || !data.icon) {
      return NextResponse.json({ error: 'نام، رنگ و آیکون الزامی هستند' }, { status: 400 });
    }

    // بررسی تکراری نبودن نام درس
    const existingSubject = subjects.find(s => s.name === data.name);
    if (existingSubject) {
      return NextResponse.json({ error: 'درس با این نام قبلاً وجود دارد' }, { status: 400 });
    }

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      color: data.color,
      icon: data.icon,
      createdAt: new Date()
    };

    subjects.push(newSubject);
    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد درس جدید' }, { status: 500 });
  }
}
