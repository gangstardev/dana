const fs = require('fs');
const path = require('path');

// Read students.json
const studentsPath = path.join(__dirname, '../students.json');
const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

// Create export data with proper structure
const exportData = {
  version: '1.0',
  timestamp: new Date().toISOString(),
  students: students.map(student => ({
    // Keep all original student data
    ...student,
    // Add search names for bot matching
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
const exportPath = path.join(__dirname, '../public/students-export.json');
fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));

console.log('✅ Students export created successfully!');
console.log(`📁 Export file: ${exportPath}`);
console.log(`📊 Total students: ${exportData.students.length}`);
console.log('🤖 This export is specifically for Telegram bot matching');
console.log('📋 Completions page uses original students.json');
