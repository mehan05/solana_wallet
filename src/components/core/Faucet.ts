import { CoreDetails } from "@/store/atom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

export const Faucet = async(address:string,amount:number)=>{
    
    try {

            const pubKey = new PublicKey(address);
            const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
            const  lamports = amount*LAMPORTS_PER_SOL;
            toast.message(`Requesting ${amount} SOL`);
             const signature = await connection.requestAirdrop(pubKey,lamports);
             await connection.confirmTransaction(signature);
             toast.success(`${lamports} Air Dropped`);
        
    } catch (error:any) {
        console.log(error);
        if(error.statusCode === 429){
            toast.warning("Limit reached try after some time");
        }
        toast.error("Error in Air Dropping");
        return;
    }
}   