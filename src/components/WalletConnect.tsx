import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { toast } from 'react-hot-toast';

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectionProps> = ({ onConnect, onDisconnect }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!web3Modal) {
        console.error('Web3Modal not initialized');
        return;
      }
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      setShowConfetti(true);
      onConnect(userAddress);
      
      // Show success message
      toast.success('Wallet connected successfully!', {
        style: {
          background: '#23252A',
          color: '#4ADE80',
          border: '1px solid #10B981'
        }
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet', {
        style: {
          background: '#23252A',
          color: '#F87171',
          border: '1px solid #EF4444'
        }
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setAddress(null);
      onDisconnect();
    }
  };

  return (
    <div className="wallet-connect">
      {address ? (
        <div className="connected-wallet">
          <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
