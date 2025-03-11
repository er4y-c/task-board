export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  reporter: User;
  assignee?: User;
  storyPoints?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: TaskStatus;
  title: string;
}
