"use client";
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import '@solana/wallet-adapter-react-ui/styles.css';
import { toast } from 'sonner';
import axios from "axios";

const Wallet = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
            <WalletProvider wallets={[]}>
                <WalletModalProvider>
                        <WalletConnector>
                            {children}
                          </WalletConnector>
                </WalletModalProvider>              
            </WalletProvider>
        </ConnectionProvider>
    </div>
  )
}

export default Wallet;

const DynamicWalletButton = dynamic(
    async()=>(
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton
    ),{ssr:false}
)

export const WalletConnector = ({children}:{children:React.ReactNode})=>{
    const {publicKey,connected,wallet} = useWallet();
    const [isClient, setIsClient] = useState(false);
   
    // useEffect(() => {
    //       const sendPubKey = async()=>{
    //         try {
              
    //           if(publicKey)
    //           {
    //             await axios.post("http://localhost:3000/api",{publicKey:publicKey})
    //             console.log("request sent");
    //           }
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("Something went wrong cant send public key. Try again");
    //         }
    //       }
    //       sendPubKey();
    // },[wallet])

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
    },[connected])

    useEffect(() => {
      setIsClient(true); 
    },[])
    if (!isClient) return null; 

    return(
      <div className="flex w-full justify-center items-center h-screen">
        {connected?(
                children

        ):
        (

        <DynamicWalletButton>
        {publicKey
            ? `${publicKey.toBase58().substring(0, 7)}...`
            : 'Connect Wallet'}
        </DynamicWalletButton>
        )

        }
      </div>
    )
}