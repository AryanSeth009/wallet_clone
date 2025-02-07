import { ethers } from 'ethers';

// Import contract ABIs
import WalletNFTABI from './abis/WalletNFT.json';
import WalletMultiTokenABI from './abis/WalletMultiToken.json';
import WalletNFTMarketplaceABI from './abis/WalletNFTMarketplace.json';

// Import contract addresses
import contractAddresses from './contract-addresses.json';

export const CONTRACT_ADDRESSES = {
  WalletNFT: contractAddresses.WalletNFT,
  WalletMultiToken: contractAddresses.WalletMultiToken,
  WalletNFTMarketplace: contractAddresses.WalletNFTMarketplace
};

export const CONTRACT_ABIS = {
  WalletNFT: WalletNFTABI,
  WalletMultiToken: WalletMultiTokenABI,
  WalletNFTMarketplace: WalletNFTMarketplaceABI
};

export function getContract(
  contractName: keyof typeof CONTRACT_ADDRESSES, 
  providerOrSigner: ethers.providers.Provider | ethers.Signer
) {
  const address = CONTRACT_ADDRESSES[contractName];
  const abi = CONTRACT_ABIS[contractName];
  
  if (!address) {
    throw new Error(`Contract address for ${contractName} not found`);
  }
  
  if (!abi) {
    throw new Error(`Contract ABI for ${contractName} not found`);
  }

  // Validate address format
  if (!ethers.utils.isAddress(address)) {
    throw new Error(`Invalid contract address for ${contractName}: ${address}`);
  }

  return new ethers.Contract(address, abi, providerOrSigner);
}

export async function connectWallet() {
  if (!(window as any).ethereum) {
    throw new Error('MetaMask not found');
  }

  // Request account access
  await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

  // Create Web3 provider
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}

export const updateNFTListingPrice = async (
  nftContract: string, 
  tokenId: string, 
  newPrice: string
) => {
  try {
    const marketplaceContract = getContract('WalletNFTMarketplace', (await connectWallet()).signer);
    
    // Convert price to Wei
    const priceInWei = ethers.utils.parseEther(newPrice);
    
    // Call the update price method
    const tx = await marketplaceContract.updateListingPrice(
      nftContract, 
      tokenId, 
      priceInWei
    );
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: receipt.transactionHash
    };
  } catch (error) {
    console.error('Failed to update NFT listing price:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
