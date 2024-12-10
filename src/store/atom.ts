import { Wallet } from "@solana/wallet-adapter-react";
import { atom } from "jotai";

export const CoreDetails = atom<Wallet | null>(null);
export const isConnected = atom<boolean>(false);