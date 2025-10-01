const fs = require('fs');
const path = require('path');

async function syncAndExport() {
  try {
    console.log('🚀 Starting sync and export process...');
    
    // Step 1: Export students data
    console.log('📤 Exporting students data...');
    const studentsPath = path.join(__dirname, '../students.json');
    const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      students: students.map(student => ({
        ...student,
        searchNames: [
          student.fullName,
          student.fullName.replace(/\s+/g, ''),
          student.fullName.split(' ')[0],
          student.fullName.split(' ').slice(1).join(' ')
        ]
      }))
    };

    // Write to public directory
    const exportPath = path.join(__dirname, '../public/students-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    console.log('✅ Students export created successfully!');

    // Step 2: Sync to Cloudflare Worker
    console.log('🔄 Syncing to Cloudflare Worker...');
    const response = await fetch('https://dana-homework-worker.ggk2703.workers.dev/api/sync-students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentsData: exportData })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Students data synced successfully!');
      console.log(`📊 Total students: ${result.studentsCount}`);
    } else {
      console.error('❌ Sync failed:', result.error);
    }
    
    console.log('🎉 Sync and export process completed!');
    
  } catch (error) {
    console.error('❌ Error in sync and export process:', error);
  }
}

syncAndExport();
