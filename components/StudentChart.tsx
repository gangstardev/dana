'use client';

import { Student } from '@/types/student';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface StudentChartProps {
  student: Student;
}

// Subject colors matching the application theme
const SUBJECT_COLORS: { [key: string]: string } = {
  'ریاضی': '#3B82F6',    // Blue
  'علوم': '#10B981',     // Green  
  'فارسی': '#F59E0B',    // Orange
  'انگلیسی': '#8B5CF6',  // Purple
  'تاریخ': '#EF4444'      // Red
};

export default function StudentChart({ student }: StudentChartProps) {
  // Prepare data for the bar chart (grades)
  const gradesData = student.grades.map(grade => ({
    subject: grade.subject,
    score: grade.score,
    fill: SUBJECT_COLORS[grade.subject] || '#6B7280'
  }));

  // Prepare data for the pie chart (points distribution)
  const pointsData = [
    { name: 'امتیاز مثبت', value: student.positivePoints, color: '#10B981' },
    { name: 'امتیاز منفی', value: student.negativePoints, color: '#EF4444' }
  ];

  // Prepare data for the line chart (performance over time - mock data)
  const performanceData = [
    { month: 'فروردین', average: 15.2, discipline: 16.5 },
    { month: 'اردیبهشت', average: 16.8, discipline: 17.2 },
    { month: 'خرداد', average: 14.5, discipline: 15.8 },
    { month: 'تیر', average: 17.2, discipline: 18.1 },
    { month: 'مرداد', average: 18.5, discipline: 19.0 },
    { month: 'شهریور', average: 16.8, discipline: 17.5 },
    { month: 'مهر', average: 19.2, discipline: 19.8 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="font-dirooz text-sm">{`${label}: ${payload[0].value}/20`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Line Chart */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500">
        <h3 className="text-lg font-semibold text-white mb-4 font-dirooz">
          تحلیل عملکرد دانش‌آموز
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                tick={{ fontFamily: 'Dirooz-FD', fontSize: 12, fill: '#9CA3AF' }}
                stroke="#6B7280"
              />
              <YAxis 
                domain={[10, 20]}
                tick={{ fontFamily: 'Dirooz-FD', fontSize: 12, fill: '#9CA3AF' }}
                stroke="#6B7280"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                  fontFamily: 'Dirooz-FD'
                }}
                labelStyle={{ fontFamily: 'Dirooz-FD' }}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="discipline" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-300 font-dirooz">میانگین نمرات</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-300 font-dirooz">نمره انضباط</span>
          </div>
        </div>
      </div>

      {/* Grades Bar Chart */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500">
        <h3 className="text-lg font-semibold text-white mb-4 font-dirooz">
          نمودار نمرات دروس
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="subject" 
                tick={{ fontFamily: 'Dirooz-FD', fontSize: 12, fill: '#9CA3AF' }}
                stroke="#6B7280"
              />
              <YAxis 
                domain={[0, 20]}
                tick={{ fontFamily: 'Dirooz-FD', fontSize: 12, fill: '#9CA3AF' }}
                stroke="#6B7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {gradesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Points Pie Chart */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500">
        <h3 className="text-lg font-semibold text-white mb-4 font-dirooz">
          توزیع امتیازات
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pointsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pointsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [value, 'امتیاز']}
                labelStyle={{ fontFamily: 'Dirooz-FD' }}
                contentStyle={{ 
                  fontFamily: 'Dirooz-FD',
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-green-500">
        <h3 className="text-lg font-semibold text-white mb-4 font-dirooz">
          خلاصه عملکرد
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-blue-500">
            <div className="text-2xl font-bold text-blue-400 font-dirooz">
              {student.grades.length > 0 
                ? (student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length).toFixed(1)
                : '0'
              }
            </div>
            <div className="text-sm text-gray-300 font-dirooz">میانگین نمرات</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-green-500">
            <div className="text-2xl font-bold text-green-400 font-dirooz">
              {student.positivePoints}
            </div>
            <div className="text-sm text-gray-300 font-dirooz">امتیاز مثبت</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-red-500">
            <div className="text-2xl font-bold text-red-400 font-dirooz">
              {student.negativePoints}
            </div>
            <div className="text-sm text-gray-300 font-dirooz">امتیاز منفی</div>
          </div>
        </div>
      </div>
    </div>
  );
}
