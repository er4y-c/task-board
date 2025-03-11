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
  setTasks: (tasks: Task[]) => void;

  addUser: (user: Omit<User, 'id'>) => User;
  setUsers: (users: User[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  users: [],

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

  setTasks: (tasks) => set({ tasks }),

  addUser: (user) => {
    const newUser = { ...user, id: uuidv4() };
    set((state) => ({
      users: [...state.users, newUser],
    }));
    return newUser;
  },
  setUsers: (users) => set({ users }),
}));
