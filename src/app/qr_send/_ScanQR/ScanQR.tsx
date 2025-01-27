"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { createQR, encodeURL, findReference, FindReferenceError, validateTransfer, ValidateTransferError } from "@solana/pay";
import CustomHookWallet from '@/hooks/CustomHookWallet'
import { Keypair, PublicKey } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { useConnection } from '@solana/wallet-adapter-react'
const ScanQR = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const { connection } = useConnection()
  const{publicKey} = CustomHookWallet();
  useEffect(() => {
   const userAddress = publicKey
   if(!userAddress) return;
    const recipient = new PublicKey(userAddress)
    const reference = Keypair.generate().publicKey
    const label = "Sending Money"
    const message = "Thanks for your amount"

    const urlParams = {
        recipient,
        reference,
        label,
        message,
    }
    const url = encodeURL(urlParams)
    const qr = createQR(url, 260, 'white', 'black')
    if (qrRef.current) {
        qrRef.current.innerHTML = ''
        qr.append(qrRef.current)
    }

    const interval = setInterval(async () => {
      console.log("waiting for transaction confirmation")
      try {
          const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
          console.log("validating")
          await validateTransfer(
              connection,
              signatureInfo.signature,
              {
                  recipient,
                  amount: new BigNumber(0),
                  reference,
              },
              { commitment: 'confirmed' }
          )

          console.log("confirmed, proceed with evil deeds")


          clearInterval(interval)
      } catch (e) {
          if (e instanceof FindReferenceError) {
              return;
          }
          if (e instanceof ValidateTransferError) {
              console.error('Transaction is invalid', e)
              return;
          }
          console.error('Unknown error', e)
      }
  }, 500)

  return () => clearInterval(interval)

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

          <CardContent className="p-0 w-[260px] h-[260px] flex justify-center items-center">
                    <div  className=' h-full w-full rounded-xl    ' ref={qrRef}>

                    </div>
            </CardContent>
            <h2 className='text-xl font-semibold text-white'>Scan To Send SOL</h2>
          </div>
        </Card>
  </div>
  )
}

export default ScanQR