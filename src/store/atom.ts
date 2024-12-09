import { Wallet } from "@solana/wallet-adapter-react";
import { atom } from "recoil";

export const CoreDetails = atom<Wallet|null>({
    key: "CoreDetails",
    default: null
})