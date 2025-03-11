export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  reporter: string;
  assignee?: string;
  storyPoints?: number;
}

export interface Column {
  id: TaskStatus;
  title: string;
}

export interface GrouppedTasks {
  TODO: Task[];
  IN_PROGRESS: Task[];
  REVIEW: Task[];
  DONE: Task[];
}
