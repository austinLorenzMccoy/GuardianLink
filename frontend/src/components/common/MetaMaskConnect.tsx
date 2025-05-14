'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

// Define the Ethereum provider interface
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, listener: (...args: unknown[]) => void) => void;
  removeListener: (eventName: string, listener: (...args: unknown[]) => void) => void;
}

// Extend the Window interface
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const MetaMaskConnect = () => {
  const { toast } = useToast();
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = (): boolean => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  };

  // Handle connecting to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this feature",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          toast({
            title: "Wallet connected",
            description: "Your MetaMask wallet has been connected successfully",
          });
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect to MetaMask";
      toast({
        title: "Connection failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnecting
  const disconnectWallet = () => {
    setAccount(null);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (...args: unknown[]) => {
        const accounts = args[0] as unknown[];
        if (accounts && accounts.length > 0 && typeof accounts[0] === 'string') {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  // Format the account address for display
  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      {!account ? (
        <Button 
          variant="secondary" 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                onClick={disconnectWallet}
                className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
              >
                {formatAddress(account)}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to disconnect wallet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};