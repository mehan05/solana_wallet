"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import Main from "./(main)/Main";
import { ConnectionProvider, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
      <div>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]}>
                <WalletModalProvider>
                    <WalletConnector/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
      </div>
  );
}

const WalletConnector = ()=>{
    const {publicKey,connected,signTransaction,disconnect} = useWallet();
    return(
      <div className="flex justify-center items-center h-screen">
        {
          connected?(
            <Main/>
          ):(
            <WalletMultiButton/>
          )
        }
      </div>
    )
}
