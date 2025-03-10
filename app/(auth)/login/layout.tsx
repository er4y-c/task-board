import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Task Board',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
