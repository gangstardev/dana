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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subject = subjects.find(s => s.id === params.id);
    
    if (!subject) {
      return NextResponse.json({ error: 'درس یافت نشد' }, { status: 404 });
    }
    
    return NextResponse.json(subject);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت درس' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data: CreateSubjectData = await request.json();
    
    const subjectIndex = subjects.findIndex(s => s.id === params.id);
    
    if (subjectIndex === -1) {
      return NextResponse.json({ error: 'درس یافت نشد' }, { status: 404 });
    }
    
    // Validate data
    if (!data.name || data.name.trim().length < 2) {
      return NextResponse.json({ error: 'نام درس باید حداقل 2 کاراکتر باشد' }, { status: 400 });
    }
    
    // Update subject
    subjects[subjectIndex] = {
      ...subjects[subjectIndex],
      name: data.name,
      description: data.description || '',
      color: data.color,
      icon: data.icon
    };
    
    return NextResponse.json(subjects[subjectIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در به‌روزرسانی درس' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subjectIndex = subjects.findIndex(s => s.id === params.id);
    
    if (subjectIndex === -1) {
      return NextResponse.json({ error: 'درس یافت نشد' }, { status: 404 });
    }
    
    subjects.splice(subjectIndex, 1);
    
    return NextResponse.json({ message: 'درس با موفقیت حذف شد' });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف درس' }, { status: 500 });
  }
}
