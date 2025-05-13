'use client';

import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};