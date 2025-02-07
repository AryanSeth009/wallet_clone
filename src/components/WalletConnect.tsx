import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectionProps> = ({ onConnect, onDisconnect }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [address, setAddress] = useState<string | null>(null);

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
    if (!web3Modal) return;

    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      onConnect(userAddress);
    } catch (error) {
      console.error('Wallet connection failed', error);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      await web3Modal.clearCachedProvider();
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
