import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ScanQR = () => {
  return (
    <div className="flex items-center justify-center min-h-screen shadow-lg shadow-purple-600">

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

            <CardContent className="p-6 space-y-6 w-[214px] h-[214px] border-2 border-purple-600 rounded-xl ">

            </CardContent>
            <h2 className='text-xl font-semibold text-white'>Scan To Send SOL</h2>
          </div>
        </Card>
  </div>
  )
}

export default ScanQR