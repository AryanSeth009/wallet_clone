"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  connectWallet,
  getContract,
  updateNFTListingPrice,
 
} from "../utils/contractUtils";
import toast from "react-hot-toast";

interface NFT {
  tokenId: string;
  uri: string;
  owner: string;
  price?: string;
}

export default function NFTMarketplace() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nftContract, setNFTContract] = useState<ethers.Contract | null>(null);
  const [marketplaceContract, setMarketplaceContract] =
    useState<ethers.Contract | null>(null);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPrices, setEditingPrices] = useState<{ [key: string]: string }>(
    {}
  );

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      const { address, signer } = await connectWallet();
      setWalletAddress(address);

      // Initialize Contracts
      const nftContractInstance = getContract("WalletNFT", signer);
      const marketplaceContractInstance = getContract(
        "WalletNFTMarketplace",
        signer
      );

      setNFTContract(nftContractInstance);
      setMarketplaceContract(marketplaceContractInstance);

      toast.success("Wallet Connected Successfully!");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const mintTestNFT = async () => {
    if (!nftContract) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setLoading(true);
      const tx = await nftContract.mintNFT(
        "https://example.com/nft-metadata.json"
      );
      const receipt = await tx.wait();

      toast.success("NFT Minted Successfully!");
      console.log("NFT Minted:", receipt.transactionHash);

      // Refresh NFT list
      await fetchUserNFTs();
    } catch (error) {
      console.error("Minting failed:", error);
      toast.error("Failed to mint NFT");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserNFTs = async () => {
    if (!nftContract || !walletAddress) return;

    try {
      setLoading(true);
      // Assuming your contract has a method to get user's NFTs
      const userNFTs = await nftContract.getUserNFTs(walletAddress);

      const nftDetails = await Promise.all(
        userNFTs.map(async (tokenId: string) => {
          const uri = await nftContract.tokenURI(tokenId);

          // Try to get listing details from marketplace
          try {
            const listing = await marketplaceContract?.listings(
              nftContract.address,
              tokenId
            );
            return {
              tokenId,
              uri,
              owner: walletAddress,
              price: listing?.price
                ? ethers.utils.formatEther(listing.price)
                : undefined,
            };
          } catch (listingError) {
            return {
              tokenId,
              uri,
              owner: walletAddress,
            };
          }
        })
      );

      setNFTs(nftDetails);
    } catch (error) {
      console.error("Fetching NFTs failed:", error);
      toast.error("Failed to fetch NFTs");
    } finally {
      setLoading(false);
    }
  };

  const listNFTForSale = async (tokenId: string, price: string) => {
    if (!marketplaceContract) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setLoading(true);
      const priceInWei = ethers.utils.parseEther(price);
      const tx = await marketplaceContract.listNFT(
        nftContract?.address,
        tokenId,
        priceInWei
      );
      const receipt = await tx.wait();

      toast.success("NFT Listed Successfully!");
      console.log("NFT Listed:", receipt.transactionHash);

      // Refresh NFT list to get updated listing
      await fetchUserNFTs();
    } catch (error) {
      console.error("Listing failed:", error);
      toast.error("Failed to list NFT");
    } finally {
      setLoading(false);
    }
  };

  const updateNFTPrice = async (tokenId: string) => {
    const newPrice = editingPrices[tokenId];
    if (!newPrice) {
      toast.error("Please enter a new price");
      return;
    }

    try {
      setLoading(true);
      const result = await updateNFTListingPrice(
        nftContract?.address || "",
        tokenId,
        newPrice
      );

      if (result.success) {
        toast.success("Price updated successfully!");
        // Refresh NFT list
        await fetchUserNFTs();
        // Clear price editing state
        setEditingPrices((prev) => {
          const newState = { ...prev };
          delete newState[tokenId];
          return newState;
        });
      } else {
        toast.error(`Failed to update price: ${result.error}`);
      }
    } catch (error) {
      console.error("Price update failed:", error);
      toast.error("Failed to update NFT price");
    } finally {
      setLoading(false);
    }
  };

  const purchaseNFTHandler = async (tokenId: string) => {
    if (!marketplaceContract) {
      toast.error("Connect wallet first");
      return;
    }

    try {
      setLoading(true);
      const tx = await marketplaceContract.purchaseNFT(
        nftContract?.address,
        tokenId
      );
      const receipt = await tx.wait();

      toast.success("NFT Purchased Successfully!");
      console.log("NFT Purchased:", receipt.transactionHash);

      // Refresh NFT list to get updated listings
      await fetchUserNFTs();
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("Failed to purchase NFT");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchUserNFTs();
    }
  }, [walletAddress]);

  return (
    <div className="nft-marketplace p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">NFT Marketplace</h1>

      {!walletAddress ? (
        <button
          onClick={handleConnectWallet}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div>
          <div className="mb-6">
            <p className="text-white">
              Connected Wallet:
              <span className="ml-2 text-purple-400">{walletAddress}</span>
            </p>
            <button
              onClick={mintTestNFT}
              disabled={loading}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              {loading ? "Minting..." : "Mint Test NFT"}
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-white">Your NFTs</h2>
          {nfts.length === 0 ? (
            <p className="text-gray-400">No NFTs found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <div
                  key={nft.tokenId}
                  className="bg-gray-800 rounded-lg p-4 shadow-lg"
                >
                  <p className="text-white mb-2">Token ID: {nft.tokenId}</p>
                  <p className="text-gray-400 mb-4">URI: {nft.uri}</p>

                  {nft.price ? (
                    <div className="mb-4">
                      <p className="text-white">
                        Current Price: {nft.price} ETH
                      </p>
                      <button
                        onClick={() => purchaseNFTHandler(nft.tokenId)}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        Purchase
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="number"
                        placeholder="Price (ETH)"
                        className="w-full px-2 py-1 bg-gray-700 text-white rounded"
                        onChange={(e) =>
                          listNFTForSale(nft.tokenId, e.target.value)
                        }
                      />
                      <button
                        onClick={() => listNFTForSale(nft.tokenId, "0.1")}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        List
                      </button>
                    </div>
                  )}

                  {nft.price && (
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="New Price (ETH)"
                        className="w-full px-2 py-1 bg-gray-700 text-white rounded"
                        value={editingPrices[nft.tokenId] || ""}
                        onChange={(e) =>
                          setEditingPrices((prev) => ({
                            ...prev,
                            [nft.tokenId]: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={() => updateNFTPrice(nft.tokenId)}
                        disabled={loading}
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                      >
                        Update Price
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
