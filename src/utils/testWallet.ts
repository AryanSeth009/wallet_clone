import { ethers } from 'ethers';

export async function testWalletConnection() {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const address = accounts[0];
    const balance = await provider.getBalance(address);
    
    return {
      success: true,
      address,
      balance: ethers.formatEther(balance)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

export async function testSendTransaction(recipient: string, amount: string) {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Estimate gas
    const gasEstimate = await provider.estimateGas({
      to: recipient,
      value: ethers.parseEther(amount)
    });
    
    // Get gas price
    const feeData = await provider.getFeeData();
    const gasCost = gasEstimate * (feeData.gasPrice || 0n);
    
    // Send transaction
    const tx = await signer.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amount)
    });
    
    return {
      success: true,
      txHash: tx.hash,
      estimatedGas: ethers.formatEther(gasCost)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

export async function testTransactionHistory(address: string) {
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === '1') {
      return {
        success: true,
        transactions: data.result
      };
    } else {
      throw new Error('Failed to fetch transactions');
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
} 