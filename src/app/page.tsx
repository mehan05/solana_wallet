"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletInterface } from "./home/(components)/Wallet-Interface";
import CreateWallet from "./create_pharse/page";
import { RecoilRoot } from "recoil";
import { useAtom } from "jotai";
import { WalletConnector } from "./(walletConnect)/Wallet";
import { isConnected } from "@/store/atom";

export default function Home() {
  
  return (
      <div>
          <CreateWallet/>
      </div>
  );
}


