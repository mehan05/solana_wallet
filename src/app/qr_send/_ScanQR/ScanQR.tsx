"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { createQR } from "@solana/pay";
import { useWallet } from '@solana/wallet-adapter-react'

const ScanQR = () => {
  const SOLANA_PAY_URL  = "https://sol-wallet-seven.vercel.app/api"
  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const qr = createQR(SOLANA_PAY_URL, 260, 'white', 'black');

    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
      
    } 
  }, [])



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
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </CardHeader>
          <div className='flex flex-col  space-y-9 items-center justify-center p-10'>

          <CardContent className="p-0 w-[260px] h-[260px] flex justify-center items-center border-4 border-purple-600 rounded-xl">
                    <div  className=' h-full w-full rounded-xl   ' ref={qrRef}>

                    </div>
            </CardContent>
            <h2 className='text-xl font-semibold text-white'>Scan To Receive SOL</h2>
            {/* <button onClick={sendPubKey} className='text-white'>Set public key</button> */}
          </div>
        </Card>
  </div>
  )
}

export default ScanQR