"use client";
import { generateMnemonic } from 'bip39';
import React, { useState } from 'react'
import Input from './(components)/Input';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CreateWallet = () => {
  const[mnemonic, setMnemonic] = useState(new Array(12).fill(' '));
  const handleMnemonic = async () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic.split(' '));
    
  }
  console.log(mnemonic);

  const isMnemonicFilled = mnemonic.every((val) => val !== ' ');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-xl min-w-lg bg-black border-gray-800 shadow-lg shadow-purple-600">
        <CardContent className="p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Create Solana Wallet</h2>
            <p className="text-sm text-gray-400">Click the button to create a new wallet using a mnemonic phrase</p>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 flex-1 ">
            <div className='relative grid grid-cols-4 gap-2'>
              {
                mnemonic.map((vals, index) => (
                  <Input key={index} vals={vals} index={index} />
                ))
              }
            </div>
          </div>

          <div className="flex justify-center">
            {isMnemonicFilled ? (
              <Link href="/home">
                <Button className="px-6 py-3 bg-violet-500 text-white rounded-md font-semibold hover:bg-violet-600 transition duration-200">
                  Continue
                </Button>
              </Link>
            ) : (
              <Button onClick={handleMnemonic} className="px-6 py-3 bg-violet-500 text-white rounded-md font-semibold hover:bg-violet-600 transition duration-200">
                Create Seed Phrase
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateWallet;
