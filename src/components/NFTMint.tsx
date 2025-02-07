import React, { useState } from 'react';
import { ethers } from 'ethers';

// IPFS Configuration
const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

// Contract ABI and Address (you'll replace these with actual values)
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

const NFTMint: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    name: '',
    description: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [mintStatus, setMintStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToIPFS = async (): Promise<string | null> => {
    if (!file) return null;

    try {
      // Upload file to IPFS
      const fileAdded = await ipfsClient.add(file);
      const imageUrl = `https://ipfs.io/ipfs/${fileAdded.path}`;

      // Create metadata
      const metadata: NFTMetadata = {
        name: metadata.name,
        description: metadata.description,
        image: imageUrl
      };

      // Upload metadata to IPFS
      const metadataAdded = await ipfsClient.add(JSON.stringify(metadata));
      return `https://ipfs.io/ipfs/${metadataAdded.path}`;
    } catch (error) {
      console.error('IPFS upload error:', error);
      return null;
    }
  };

  const mintNFT = async () => {
    setIsUploading(true);
    setMintStatus('');

    try {
      // Check if Web3 provider is available
      if (!(window as any).ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Request account access
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

      // Create provider and signer
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      // Upload to IPFS
      const metadataUri = await uploadToIPFS();
      if (!metadataUri) {
        throw new Error('Failed to upload metadata');
      }

      // Create contract instance
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS, 
        NFT_CONTRACT_ABI, 
        signer
      );

      // Mint NFT
      const transaction = await contract.mintNFT(metadataUri);
      await transaction.wait();

      setMintStatus('NFT Minted Successfully!');
    } catch (error) {
      console.error('Minting error:', error);
      setMintStatus(`Minting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="nft-mint-container">
      <h2 className="text-2xl font-bold mb-4">Mint Your NFT</h2>
      
      <div className="mb-4">
        <label className="block mb-2">NFT Name</label>
        <input 
          type="text"
          value={metadata.name}
          onChange={(e) => setMetadata({...metadata, name: e.target.value})}
          className="w-full p-2 border rounded"
          placeholder="Enter NFT name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea 
          value={metadata.description}
          onChange={(e) => setMetadata({...metadata, description: e.target.value})}
          className="w-full p-2 border rounded"
          placeholder="Describe your NFT"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Upload Image</label>
        <input 
          type="file" 
          onChange={handleFileChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
      </div>

      <button 
        onClick={mintNFT}
        disabled={isUploading || !file || !metadata.name}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isUploading ? 'Minting...' : 'Mint NFT'}
      </button>

      {mintStatus && (
        <div className={`mt-4 p-2 rounded ${mintStatus.includes('Successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {mintStatus}
        </div>
      )}
    </div>
  );
};

export default NFTMint;
