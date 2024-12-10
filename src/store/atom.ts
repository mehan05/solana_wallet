import { Wallet } from "@solana/wallet-adapter-react";
import { atom } from "jotai";

export const CoreDetails = atom<{publicKey:string|null}>(
    {
        publicKey:null,
    }
);
