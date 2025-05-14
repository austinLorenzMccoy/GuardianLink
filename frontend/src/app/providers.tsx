'use client';

import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { MetaMaskProvider } from '@/lib/metamask/MetaMaskProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <MetaMaskProvider>
      {children}
      <Toaster />
    </MetaMaskProvider>
  );
};