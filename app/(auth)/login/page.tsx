'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

import { LoginForm } from '@/components/login-form';

const LoginPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <ChefHat className="w-4 h-4" />
          </div>
          Task Board App.
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
