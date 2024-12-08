"use client"
import Link from 'next/link'
import React from 'react'

const Main = () => {
  return (
    <div>
                    <div className="mt-[100px] flex justify-center">

            <div className=" border-2 border-black rounded-lg  w-[900px] pb-10">

                <div className="flex justify-center m-5 ">
                        <div>
                            <h1 className="text-5xl font-bold mb-8">Solana wallet</h1>
                        </div>
                </div>

                <div className="flex justify-center items-center gap-5 flex-col">
                    <Link href="/send" className="p-5 border-4 bg-gray-500 font-semibold rounded-xl min-w-[400px] hover:bg-white border-black ">Send</Link>
                    <Link href="/swap" className="p-5 border-4 bg-gray-500 font-semibold rounded-xl min-w-[400px] hover:bg-white border-black ">Swap</Link>
                    <Link href="/create_pharse" className="p-5 border-4 bg-gray-500 font-semibold rounded-xl min-w-[400px] hover:bg-white border-black ">Create mnemonic</Link>
                    <Link href="/qr_send" className="p-5 border-4 bg-gray-500 font-semibold rounded-xl min-w-[400px] hover:bg-white border-black ">Send SOL using qr and receive</Link>
                    <Link href="/history" className="p-5 border-4 bg-gray-500 font-semibold rounded-xl min-w-[400px] hover:bg-white border-black ">View transaction history</Link>
                </div>
            </div>

            </div>
    </div>
  )
}

export default Main