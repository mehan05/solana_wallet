import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
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
          <CreateWallet/>
      </div>
  );
}


