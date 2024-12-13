import CustomHookWallet from "@/hooks/CustomHookWallet";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {  NextRequest, NextResponse } from "next/server";

export const GET = async()=>
{
    const label = 'MEHAN Pay';
  const icon = 'https://avatars.githubusercontent.com/u/115608700?s=400&u=bf831a92813772fb388568f5227f3dc68debead7&v=4';
  console.log("incomming request");


 return NextResponse.json({
      label,
      icon,
  });
}
export const POST = async(req:NextRequest)=>{
    const body = await req.json();
    const accountField = body?.account; 

    if (!accountField) throw new Error('missing account');
    
    
    const sender = new PublicKey(accountField);
    const ix = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: publicKey,
        lamports: 133700000 
      })
      
    let transaction = new Transaction();
  
    const connection = new Connection("https://api.devnet.solana.com")
    const bh = await connection.getLatestBlockhash();
    transaction.recentBlockhash = bh.blockhash;
    transaction.feePayer = sender;

    transaction.add(ix);


    transaction = Transaction.from(transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    }));

    transaction.sign(merchant);

    const serializedTransaction = transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });

    const base64Transaction = serializedTransaction.toString('base64');
    const message = 'Thank you for using AndyPay';


   return  NextResponse.json({ transaction: base64Transaction, message });
}