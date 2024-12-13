import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { findReference,validateTransfer } from "@solana/pay";
export const WalletHook = () => {
 
    const {signTransaction,signMessage,publicKey,sendTransaction} = useWallet();
    const connection = useConnection();

    return {signTransaction,signMessage,connection,findReference,validateTransfer,publicKey,sendTransaction} 
}

export default WalletHook