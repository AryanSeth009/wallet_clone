import React, { useState } from 'react';
import { connectWallet, getContract } from '../utils/contractUtils';
import { ethers } from 'ethers';

export default function WalletTest() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [nftContract, setNFTContract] = useState<ethers.Contract | null>(null);

  const handleConnectWallet = async () => {
    try {
      const { address, provider, signer } = await connectWallet();
      setWalletAddress(address);

      // Get wallet balance
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);

      // Initialize NFT Contract
      const contract = getContract('WalletNFT', signer);
      setNFTContract(contract);

    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet');
    }
  };

  const testNFTMint = async () => {
    if (!nftContract) {
      alert('Please connect wallet first');
      return;
    }

    try {
      // Example: Minting an NFT (adjust based on your contract's mint function)
      const tx = await nftContract.mintNFT('https://example.com/metadata.json');
      const receipt = await tx.wait();
      console.log('NFT Minted! Transaction:', receipt.transactionHash);
      alert('NFT Minted Successfully');
    } catch (error) {
      console.error('NFT Minting failed:', error);
      alert('NFT Minting Failed');
    }
  };

  return (
    <div className="wallet-test-container">
      <h2>Wallet Connection Test</h2>
      <button onClick={handleConnectWallet}>
        {walletAddress ? 'Connected' : 'Connect Wallet'}
      </button>
      
      {walletAddress && (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={testNFTMint}>Mint Test NFT</button>
        </div>
      )}
    </div>
  );
}
