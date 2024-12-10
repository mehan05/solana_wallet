"use client";
import { CoreDetails, isConnected } from '@/store/atom';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil';
import '@solana/wallet-adapter-react-ui/styles.css';

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
    const {publicKey,connected,signTransaction,disconnect,wallet} = useWallet();
    const [isClient, setIsClient] = useState(false);
    const[isconnected,setIsConnected] = useAtom(isConnected);
    const [coreDetails,setCoreDetails] =  useAtom(CoreDetails);
    useEffect(() => {
      if(wallet)
      {

        setCoreDetails(wallet);
      }
      else{
        setCoreDetails(null);
      }
      connected&& setIsConnected(true);
    },[wallet,setCoreDetails])
    
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