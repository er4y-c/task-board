'use client';

import React from 'react';

import Breadcrumbs from '@/components/breadcrumbs';
import { useAuthStore } from '@/stores/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <Breadcrumbs items={[{ text: 'Dashboard', href: '/' }]} />
      <h1>Welcome! {user?.email || 'Guest'}</h1>
    </div>
  );
};

export default Dashboard;
