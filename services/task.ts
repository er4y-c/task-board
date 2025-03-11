import { api } from './api';
import { Task } from '@/types/task';

export const taskServices = {
  getTasks: async () => {
    return await api.get('/tasks');
  },
  createTask: async (task: Task) => {
    return await api.post('/tasks', task);
  },
  updateTask: async (id: string, task: Task) => {
    return await api.put(`/tasks/${id}`, task);
  },
  deleteTask: async (id: string) => {
    return await api.delete(`/tasks/${id}`);
  },
};
