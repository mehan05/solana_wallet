"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import Main from "./home/Main";
import { ConnectionProvider, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletInterface } from "./home/(components)/Wallet-Interface";
import CreateWallet from "./create_pharse/page";
import { RecoilRoot } from "recoil";

export default function Home() {
  
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
      <div>
        <RecoilRoot>
          <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={[]}>
                  <WalletModalProvider>
                      <WalletConnector/>
                  </WalletModalProvider>
              </WalletProvider>
          </ConnectionProvider>
        </RecoilRoot>
      </div>
  );
}

const WalletConnector = ()=>{
    const {publicKey,connected,signTransaction,disconnect,wallet} = useWallet();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      if(localStorage.getItem("WalletConnected") === "true"){
          wallet?.adapter?.connect();
      }
        
    }, [connected,wallet]);
  

    useEffect(() => {
      if(connected){
        localStorage.setItem("WalletConnected","true");
      }
      else{
        localStorage.setItem("WalletConnected","false");
      }
    })

    useEffect(() => {
      setIsClient(true); 
    })
    if (!isClient) return null; 

    return(
      <div className="flex justify-center items-center h-screen">
        {
          connected?(
            <CreateWallet/>
          ):(
            <WalletMultiButton/>
          )
        }
      </div>
    )
}
