import Wallet from "@/app/(walletConnect)/Wallet";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { toast } from "sonner";

export const SendSOl =async (publicKey:PublicKey|null,signTransaction:typeof Wallet["signTransaction"],address:string, amount:number)=>{

    try {
        const recipentAddress = new PublicKey(address);
        const Lamports = amount*LAMPORTS_PER_SOL;
     
        const connection = new Connection(clusterApiUrl("devnet"));
      

        const SendersPublicKey =publicKey;
        
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

        return true;
    } catch (error) {
        console.log(error);
        toast.error("Error While sending money");
    }
        


}