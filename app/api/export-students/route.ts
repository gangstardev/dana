import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Student } from '@/types/student';

export async function POST(request: NextRequest) {
  try {
    // Read students.json directly
    const studentsPath = path.join(process.cwd(), 'students.json');
    const students: Student[] = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

    // Create export data with proper structure
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      students: students.map(student => ({
        id: student.id,
        fullName: student.fullName,
        className: student.className,
        profileImage: student.profileImage,
        // Keep essential data for bot matching
        searchNames: [
          student.fullName,
          // Add variations for better matching
          student.fullName.replace(/\s+/g, ''),
          student.fullName.split(' ')[0], // First name only
          student.fullName.split(' ').slice(1).join(' ') // Last name only
        ]
      }))
    };

    // Write export file to public directory
    const exportPath = path.join(process.cwd(), 'public', 'students-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Students data exported successfully',
      studentsCount: exportData.students.length
    });
    
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Export failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
