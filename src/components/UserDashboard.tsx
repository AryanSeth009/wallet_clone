
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';

// Contract Addresses and ABIs (replace with actual values)
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';
const NFT_CONTRACT_ABI = []; // Add your NFT contract ABI
const MARKETPLACE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || '';
const MARKETPLACE_CONTRACT_ABI = []; // Add your marketplace contract ABI

interface UserNFT {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  listingPrice?: string;
}

interface Transaction {
  type: 'buy' | 'sell' | 'mint';
  nftName: string;
  price: string;
  date: Date;
}

const UserDashboard: React.FC = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [ownedNFTs, setOwnedNFTs] = useState<UserNFT[]>([]);
  const [listedNFTs, setListedNFTs] = useState<UserNFT[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setUserAddress(accounts[0]);
      fetchUserData(accounts[0]);
    } catch (error) {
      console.error('Wallet connection failed', error);
    }
  };

  const fetchUserData = async (address: string) => {
    try {
      // Create provider and signer
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      // Create contract instances
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS, 
        NFT_CONTRACT_ABI, 
        signer
      );

      const marketplaceContract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS, 
        MARKETPLACE_CONTRACT_ABI, 
        signer
      );

      // Fetch owned NFTs
      const balance = await nftContract.balanceOf(address);
      const ownedTokens = await Promise.all(
        Array.from({ length: balance.toNumber() }, (_, i) => 
          nftContract.tokenOfOwnerByIndex(address, i)
        )
      );

      const ownedNFTDetails = await Promise.all(
        ownedTokens.map(async (tokenId) => {
          const tokenUri = await nftContract.tokenURI(tokenId);
          const metadata = await fetch(tokenUri).then(res => res.json());

          return {
            tokenId: tokenId.toNumber(),
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          };
        })
      );

      // Fetch listed NFTs
      const listedTokens = await marketplaceContract.getListedNFTsByOwner(address);
      const listedNFTDetails = await Promise.all(
        listedTokens.map(async (listing: any) => {
          const tokenUri = await nftContract.tokenURI(listing.tokenId);
          const metadata = await fetch(tokenUri).then(res => res.json());

          return {
            tokenId: listing.tokenId.toNumber(),
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            listingPrice: ethers.utils.formatEther(listing.price)
          };
        })
      );

      // Fetch transaction history
      const pastTransactions = await marketplaceContract.getTransactionHistory(address);
      const formattedTransactions = pastTransactions.map((tx: any) => ({
        type: tx.type,
        nftName: tx.nftName,
        price: ethers.utils.formatEther(tx.price),
        date: new Date(tx.timestamp.toNumber() * 1000)
      }));

      setOwnedNFTs(ownedNFTDetails);
      setListedNFTs(listedNFTDetails);
      setTransactions(formattedTransactions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const listNFTForSale = async (tokenId: number, price: string) => {
    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS, 
        MARKETPLACE_CONTRACT_ABI, 
        signer
      );

      const transaction = await marketplaceContract.listNFT(
        NFT_CONTRACT_ADDRESS, 
        tokenId, 
        ethers.utils.parseEther(price)
      );

      await transaction.wait();
      
      // Refresh user data
      fetchUserData(userAddress);
    } catch (error) {
      console.error('Error listing NFT:', error);
    }
  };

  const cancelListing = async (tokenId: number) => {
    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS, 
        MARKETPLACE_CONTRACT_ABI, 
        signer
      );

      const transaction = await marketplaceContract.cancelListing(
        NFT_CONTRACT_ADDRESS, 
        tokenId
      );

      await transaction.wait();
      
      // Refresh user data
      fetchUserData(userAddress);
    } catch (error) {
      console.error('Error cancelling listing:', error);
    }
  };

  if (loading) {
    return <div>Loading user dashboard...</div>;
  }

  return (
    <div className="user-dashboard">
      <div className="user-info mb-8">
        <h2 className="text-2xl font-bold">My Wallet</h2>
        <p className="text-gray-600">{userAddress}</p>
      </div>

      <section className="owned-nfts mb-8">
        <h3 className="text-xl font-semibold mb-4">My NFTs</h3>
        {ownedNFTs.length === 0 ? (
          <p className="text-gray-500">You don't own any NFTs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ownedNFTs.map((nft) => (
              <div key={nft.tokenId} className="border rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-64">
                  <Image 
                    src={nft.image} 
                    alt={nft.name} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{nft.name}</h4>
                  <p className="text-gray-600 mb-4">{nft.description}</p>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      placeholder="Price (ETH)" 
                      className="p-2 border rounded flex-grow"
                    />
                    <button 
                      onClick={() => {
                        const priceInput = document.querySelector('input') as HTMLInputElement;
                        listNFTForSale(nft.tokenId, priceInput.value);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      List for Sale
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="listed-nfts mb-8">
        <h3 className="text-xl font-semibold mb-4">Listed NFTs</h3>
        {listedNFTs.length === 0 ? (
          <p className="text-gray-500">You have no NFTs listed for sale.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listedNFTs.map((nft) => (
              <div key={nft.tokenId} className="border rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-64">
                  <Image 
                    src={nft.image} 
                    alt={nft.name} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{nft.name}</h4>
                  <p className="text-gray-600 mb-2">{nft.description}</p>
                  <p className="text-lg font-semibold mb-4">
                    Listed Price: {nft.listingPrice} ETH
                  </p>
                  <button 
                    onClick={() => cancelListing(nft.tokenId)}
                    className="bg-red-600 text-white w-full px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="transaction-history">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">NFT</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2 capitalize">{tx.type}</td>
                  <td className="border p-2">{tx.nftName}</td>
                  <td className="border p-2">{tx.price} ETH</td>
                  <td className="border p-2">
                    {tx.date.toLocaleDateString()} {tx.date.toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
