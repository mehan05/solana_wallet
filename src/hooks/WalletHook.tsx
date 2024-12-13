import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export const walletHook = () => {
 
    const {signTransaction,signMessage} = useWallet();
    const connection = useConnection();

    return {signTransaction,signMessage,connection} 
}

export default walletHook