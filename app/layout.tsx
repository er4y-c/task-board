import React from 'react';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const font = Jost({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Board',
  description: 'Task Board is a simple task management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
