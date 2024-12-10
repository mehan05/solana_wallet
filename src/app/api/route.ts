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
    const {publicKey} = useWallet();
    const accountField = req.body?.account;
    // const amount = req.body?.amount;
    if (!accountField) throw new Error('missing account');

    
    const sender = new PublicKey(accountField);
    const ix = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey("APaynxjiBJBrEX5rqYBTbmSFN4NhPg6TKzkTmhG7URoX"),
        lamports: 133700000
      })
      
    let transaction = new Transaction();
    transaction.add(ix);

    const serializedTransaction = transaction.serialize()

    const base64Transaction = Buffer.from(serializedTransaction).toString('base64');
    const message = 'Thank you for your purchase of ExiledApe #518';

    NextResponse.json({ transaction: base64Transaction, message });
}