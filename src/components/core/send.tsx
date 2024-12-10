import Wallet from "@/app/(walletConnect)/Wallet";
import { CoreDetails } from "@/store/atom";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useAtom } from "jotai";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

export const SendSOl =async (address:string, amount:number)=>{
    const {signTransaction} = useWallet();

    try {
        
        const recipentAddress = new PublicKey(address);
        const Lamports = amount*LAMPORTS_PER_SOL;
        const [WalletDetails] = useAtom(CoreDetails);
     
        const connection = new Connection(clusterApiUrl("devnet"));
        if(!WalletDetails || !WalletDetails.publicKey) return toast.error("Wallet Not connected");

        const SendersPublicKey = new PublicKey(WalletDetails.publicKey);
        
        const transaction = new Transaction();
        transaction.feePayer = SendersPublicKey;
        const {blockhash} = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: SendersPublicKey,
                toPubkey:recipentAddress,
                lamports:Lamports}
            )
        )


        if (!signTransaction) {
            toast.error("Wallet not available for signing");
            return;
        }

        const signedTransaction = await signTransaction(transaction);

        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        await connection.confirmTransaction(signature);
    } catch (error) {
        console.log(error);
        toast.error("Error While sending money");
    }
        


}