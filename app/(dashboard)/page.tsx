'use client';

import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { useTaskStore } from '@/stores/taskStore';
import { userServices } from '@/services/user';
import Breadcrumbs from '@/components/breadcrumbs';
import Board from '@/components/board';

const Dashboard = () => {
  const setUsers = useTaskStore((state) => state.setUsers);

  const userTaskMutation = useMutation({
    mutationFn: () => userServices.getUsers(),
    onSuccess: (res) => {
      const users = res.data;
      setUsers(users);
    },
  });

  useEffect(() => {
    userTaskMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ text: 'Dashboard', href: '/' }]} />
      <div>
        <Board />
      </div>
    </div>
  );
};

export default Dashboard;
