import { api } from './api';

export const userServices = {
  getUsers: async () => {
    return await api.get('/users');
  },
};
