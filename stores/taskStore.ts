import { create } from 'zustand';
import { Task, TaskStatus, User } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: Task[];
  users: User[];

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;

  addUser: (user: Omit<User, 'id'>) => User;
  getUsers: () => User[];
}

const defaultUsers: User[] = [
  { id: '1', name: 'Ali Yılmaz', avatar: '/avatars/ali.png' },
  { id: '2', name: 'Ayşe Demir', avatar: '/avatars/ayse.png' },
  { id: '3', name: 'Mehmet Kaya', avatar: '/avatars/mehmet.png' },
];

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Login sayfası tasarımı',
    description: 'Kullanıcı girişi sayfasının tasarlanması',
    status: 'TODO',
    reporter: defaultUsers[0],
    assignee: defaultUsers[1],
    storyPoints: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'API entegrasyonu',
    description: 'Backend API servislerine bağlantı kurulması',
    status: 'IN_PROGRESS',
    reporter: defaultUsers[0],
    assignee: defaultUsers[2],
    storyPoints: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Dashboard kodlaması',
    description: 'Ana dashboard ekranının kodlanması',
    status: 'REVIEW',
    reporter: defaultUsers[1],
    assignee: defaultUsers[0],
    storyPoints: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: defaultTasks,
  users: defaultUsers,

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask, updatedAt: new Date() } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  moveTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task,
      ),
    })),

  addUser: (user) => {
    const newUser = { ...user, id: uuidv4() };
    set((state) => ({
      users: [...state.users, newUser],
    }));
    return newUser;
  },

  getUsers: () => get().users,
}));
