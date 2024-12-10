import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {  NextRequest, NextResponse } from "next/server";

export const GET = async()=>
{
    const label = 'MEHAN Pay';
  const icon = 'https://avatars.githubusercontent.com/u/115608700?s=400&u=bf831a92813772fb388568f5227f3dc68debead7&v=4';

 return NextResponse.json({
      label,
      icon,
  });
}


export const POST = async(req:NextRequest)=>{
    const accountField = req.body?.account;
    if (!accountField) throw new Error('missing account');

    
    const sender = new PublicKey(accountField);
    const ix = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey("Ed59fPEf2dBjfwKHEJJWZBoWvzi8ieGJ9Rm1xcf1beSC"),
        lamports: 133700000
      })
      
    let transaction = new Transaction();
    transaction.add(ix);

    const serializedTransaction = transaction.serialize()

    const base64Transaction = Buffer.from(serializedTransaction).toString('base64');
    const message = 'Thank you for your purchase of ExiledApe #518';

   return  NextResponse.json({ transaction: base64Transaction, message });
}