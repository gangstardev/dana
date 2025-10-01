export interface Grade {
  subject: string;
  score: number;
}

export interface Student {
  id: string;
  fullName: string;
  className: '701' | '702';
  grades: Grade[];
  discipline: number;
  positivePoints: number;
  negativePoints: number;
  profileImage?: string;
}

export interface CreateStudentData {
  fullName: string;
  className: '701' | '702';
  grades: Grade[];
  discipline: number;
  positivePoints: number;
  negativePoints: number;
  profileImage?: string;
}

export interface UpdateStudentData extends Partial<CreateStudentData> {
  id: string;
}
