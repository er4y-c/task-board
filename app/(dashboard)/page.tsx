'use client';

import React from 'react';

import Breadcrumbs from '@/components/breadcrumbs';
import Board from '@/components/board';

const Dashboard = () => {
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
