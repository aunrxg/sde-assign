export type TaskStatus = 'PENDING' | 'COMPLETED' | 'IN_PROGRESS';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus,
  createdAt: Date;
  updatedAt: Date;
}