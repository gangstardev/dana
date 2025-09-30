import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Student, CreateStudentData } from '@/types/student';

const dataFilePath = path.join(process.cwd(), 'students.json');

async function readStudents(): Promise<Student[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeStudents(students: Student[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(students, null, 2));
}

// GET /api/students
export async function GET(request: NextRequest) {
  try {
    const students = await readStudents();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در خواندن اطلاعات دانش‌آموزان' }, { status: 500 });
  }
}

// POST /api/students
export async function POST(request: NextRequest) {
  try {
    const body: CreateStudentData = await request.json();
    
    // Validation
    if (!body.fullName || !body.className) {
      return NextResponse.json({ error: 'نام کامل و کلاس الزامی است' }, { status: 400 });
    }
    
    if (!['701', '702'].includes(body.className)) {
      return NextResponse.json({ error: 'کلاس باید 701 یا 702 باشد' }, { status: 400 });
    }

    const students = await readStudents();
    const newStudent: Student = {
      id: Date.now().toString(),
      ...body,
      grades: body.grades || [],
      discipline: body.discipline || 0,
      positivePoints: body.positivePoints || 0,
      negativePoints: body.negativePoints || 0
    };

    students.push(newStudent);
    await writeStudents(students);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در ایجاد دانش‌آموز جدید' }, { status: 500 });
  }
}
