import Wallet from "@/app/(walletConnect)/Wallet";
import { CoreDetails } from "@/store/atom";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { serialize } from "v8";

export const send =async (address:string, amount:number)=>{
    try {
        
        const recipentAddress = new PublicKey(address);
        const Lamports = amount*LAMPORTS_PER_SOL;
        const WalletDetails = useRecoilValue(CoreDetails);
        const connection = new Connection(clusterApiUrl("devnet"));
        if(!WalletDetails) return toast.error("Wallet Not connected");
        const transaction = new Transaction();
        transaction.feePayer = WalletDetails.publicKey;
        const {blockhash} = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: WalletDetails.publicKey,
                toPubkey:recipentAddress,
                lamports:Lamports}
            )
        )

        const signedTransaction = await Wallet.signTransaction(transaction);

        const signature = await connection.sendRawTransaction(serialize(signedTransaction));

        await connection.confirmTransaction(signature);
    } catch (error) {
        console.log(error);
        toast.error("Error While sending money");
    }
        


}