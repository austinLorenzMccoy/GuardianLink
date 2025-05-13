'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

export const MetaMaskConnect = () => {
  const { toast } = useToast();
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
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
      const { ethereum } = window as any;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        toast({
          title: "Wallet connected",
          description: "Your MetaMask wallet has been connected successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to MetaMask",
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
    const { ethereum } = window as any;
    
    if (ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  // Format the account address for display
  const formatAddress = (address: string) => {
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