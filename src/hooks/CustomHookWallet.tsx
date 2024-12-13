import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { findReference,validateTransfer } from "@solana/pay";
const CustomHookWallet = () => {

    const {signTransaction,signMessage,publicKey,sendTransaction} = useWallet();
    const connection = useConnection();

    return {signTransaction,signMessage,connection,findReference,validateTransfer,publicKey,sendTransaction} 
}

export default CustomHookWallet