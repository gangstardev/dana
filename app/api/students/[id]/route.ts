import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Student, UpdateStudentData } from '@/types/student';

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

// GET /api/students/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const students = await readStudents();
    const student = students.find(s => s.id === params.id);
    
    if (!student) {
      return NextResponse.json({ error: 'دانش‌آموز یافت نشد' }, { status: 404 });
    }
    
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در خواندن اطلاعات دانش‌آموز' }, { status: 500 });
  }
}

// PUT /api/students/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateStudentData = await request.json();
    const students = await readStudents();
    const studentIndex = students.findIndex(s => s.id === params.id);
    
    if (studentIndex === -1) {
      return NextResponse.json({ error: 'دانش‌آموز یافت نشد' }, { status: 404 });
    }

    // Validation
    if (body.className && !['701', '702'].includes(body.className)) {
      return NextResponse.json({ error: 'کلاس باید 701 یا 702 باشد' }, { status: 400 });
    }

    students[studentIndex] = { ...students[studentIndex], ...body };
    await writeStudents(students);

    return NextResponse.json(students[studentIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در به‌روزرسانی اطلاعات دانش‌آموز' }, { status: 500 });
  }
}

// DELETE /api/students/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const students = await readStudents();
    const studentIndex = students.findIndex(s => s.id === params.id);
    
    if (studentIndex === -1) {
      return NextResponse.json({ error: 'دانش‌آموز یافت نشد' }, { status: 404 });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];
    await writeStudents(students);

    return NextResponse.json({ message: 'دانش‌آموز با موفقیت حذف شد', student: deletedStudent });
  } catch (error) {
    return NextResponse.json({ error: 'خطا در حذف دانش‌آموز' }, { status: 500 });
  }
}
