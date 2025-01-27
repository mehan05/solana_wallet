"use client"
import {  SendSOl } from "@/components/core/send"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useWallet } from "@solana/wallet-adapter-react"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"


export default  function SendTransaction() {
  const[recepientAddress,setRecepientAddress] = useState<string>("");
  const[amount,setAmount] = useState<number>(0);
  const {publicKey,signTransaction} = useWallet();
  const handleSend = async ()=>{
    try {
            if (!publicKey ||  !signTransaction) {
              toast.error("Wallet not connected");
              return;
            }
      const response = await SendSOl(publicKey,signTransaction,recepientAddress,amount);
      if(response) toast.success("SOL Sent");
      else toast.warning("Problem in Sending SOL")

    
  }catch (error) {
    console.log(error);
        toast.error("Error in Sending SOL");
  }
}
  return (
    <div className="flex items-center justify-center min-h-screen shadow-lg shadow-purple-600 w-full">

      <Card className="w-full max-w-md bg-black border-gray-800 ">
        <CardHeader className="flex flex-row items-center space-x-4 p-6">
          <Link href="/home">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 text-gray-400" />
            </Button>
          </Link>
          <h2 className="text-xl font-semibold text-white">Send SOL</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-900" />

          <div className="space-y-2">
            <Input
            type="text"
            onChange={(e)=>setRecepientAddress(e.target.value)}
              placeholder="Address"
              className="bg-gray-900 border-gray-700 text-gray-400 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder="Amount"
              type="number"
              onChange={(e)=>setAmount(Number(e.target.value))}
              className="bg-gray-900 border-gray-700 text-gray-400 placeholder:text-gray-500"
            />
          </div>

          <Button onClick={handleSend} className="w-full bg-gray-900 text-gray-400 hover:bg-gray-800">
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  )


}