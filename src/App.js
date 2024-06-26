import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89', // Chain ID untuk Polygon Mainnet
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
              blockExplorerUrls: ['https://polygonscan.com/']
            }
          ]
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        await switchNetwork(); // Panggil switchNetwork setelah wallet terhubung
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <h1>My DApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected as: {account}</p>}
    </div>
  );
}

export default App;
