import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Student } from '@/types/student';

const dataFilePath = path.join(process.cwd(), 'students.json');

async function readStudents(): Promise<Student[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// GET /api/students/class/[className]
export async function GET(
  request: NextRequest,
  { params }: { params: { className: string } }
) {
  try {
    const { className } = params;
    
    if (!['701', '702'].includes(className)) {
      return NextResponse.json({ error: 'کلاس باید 701 یا 702 باشد' }, { status: 400 });
    }

    const students = await readStudents();
    const classStudents = students.filter(s => s.className === className);
    
    return NextResponse.json(classStudents);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در خواندن اطلاعات دانش‌آموزان کلاس' }, { status: 500 });
  }
}
