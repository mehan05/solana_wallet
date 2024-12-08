import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  type: "Send" | "Receive"
  hash: string
  status: "confirmed" | "rejected"
}

const TransactionHistory: Transaction[] = [
  {
    id: "1",
    type: "Send",
    hash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    status: "confirmed"
  },
  {
    id: "2",
    type: "Receive",
    hash: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    status: "rejected"
  },
  {
    id: "3",
    type: "Send",
    hash: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    status: "confirmed"
  }
]

export default function RecentActivity() {
  return (
    <div className="flex items-center justify-center min-h-screen ">

      <Card className="w-full max-w-md bg-black border-gray-800  shadow-lg shadow-purple-600">
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
          <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {TransactionHistory.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center space-x-4 bg-gray-900 rounded-lg p-4"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400">
                  {transaction.type === "Send" ? "Send/Receive" : "Send/Receive"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {transaction.hash.slice(0, 6)}...
                </p>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={`text-xs ${
                    transaction.status === "confirmed"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

