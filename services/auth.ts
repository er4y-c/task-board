import { api } from './api';

export const authServices = {
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  register: async (fullName: string, email: string, password: string) => {
    return api.post('/auth/register', { fullName, email, password });
  },
  me: async () => {
    return api.get('/auth/me');
  },
};
