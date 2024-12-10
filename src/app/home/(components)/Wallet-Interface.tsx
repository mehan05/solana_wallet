"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from 'lucide-react'
import { useState } from "react"
import SendTransaction from "../../send/page"
import Link from "next/link"

export function WalletInterface() {
  const [address] = useState("0x1234...5678")
  const [balance] = useState("1000 SOL")
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  
 

  return (
    <Card className="w-full max-w-md bg-black border-gray-800 shadow-lg shadow-purple-600">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-2">
          <span className="text-gray-400 text-sm">{address}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyAddress}
            className="hover:bg-gray-800"
          >
            <Copy className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <h2 className="text-xl text-center text-white">Balance</h2>
          <p className="text-center text-gray-400 mt-2">{balance}</p>
        </div>

        <div className="grid grid-cols-5 gap-2">
        <Link href="/send">
          
          <Button
              variant="outline"
              className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
          >
              Send
          </Button>
        </Link>
        <Link href="/qr_send">
          
          <Button
              variant="outline"
              className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
          >
              Receive
          </Button>
        </Link>
         
        <Link href="/swap" className="ml-2">
          
          <Button
              variant="outline"
              className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
          >
              Swap
          </Button>
        </Link>
        <Link href="/buy">
          
          <Button
              variant="outline"
              className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
          >
              Buy
          </Button>
        </Link> 
        <Link href="/history">
          
          <Button
              variant="outline"
              className="bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800"
          >
              History
          </Button>
        </Link> 
        </div>

        <Button
          className="w-full bg-gray-900 text-gray-400 hover:bg-gray-800"
          variant="outline"
        >
          Add Account
        </Button>
      </CardContent>
    </Card>
  )
}

