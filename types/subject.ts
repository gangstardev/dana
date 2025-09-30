export interface Subject {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: Date;
}

export interface CreateSubjectData {
  name: string;
  description?: string;
  color: string;
  icon: string;
}
