"use client"
import { getHistory } from "@/components/core/histroy"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner"

interface Transaction {
  blockTime: number | null;
  meta: {
    computeUnitsConsumed: number;
    err: any | null;
    fee: number;
    innerInstructions: any[];
    loadedAddresses: {
      readonly: PublicKey[];
      writable: PublicKey[];
    };
    logMessages: string[];
    postBalances: number[];
    postTokenBalances: any[];
    preBalances: number[];
    preTokenBalances: any[];
    rewards: any[];
    status: { Ok: null } | { Err: any };
  };
  slot: number;
  transaction: {
    message: {
      accountKeys: PublicKey[];
      header: {
        numReadonlySignedAccounts: number;
        numReadonlyUnsignedAccounts: number;
        numRequiredSignatures: number;
      };
      indexToProgramIds: Map<number, PublicKey>;
      instructions: {
        accounts: number[];
        data: string;
        programIdIndex: number;
        stackHeight: number | null;
      }[];
      recentBlockhash: string;
    };
    signatures: string[];
  };
}

const TransactionHistory: Transaction[] = [];

export default function RecentActivity() {
  const { publicKey } = useWallet();
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  const getTransaction = async (): Promise<void> => {
    const toastId = toast.loading("Fetching transaction history...");
    if (publicKey) {
      const fetchedTransactionHistory = await getHistory(publicKey.toString());
      if (fetchedTransactionHistory !== undefined) {
        setTransactionHistory(fetchedTransactionHistory);
        toast.success("Transaction history fetched", { id: toastId });
        console.log("Transaction history.", fetchedTransactionHistory);
      } else {
        console.log("Can't get the transaction history");
        toast.error("Can't get the transaction history", { id: toastId });
      }
    }
  };

  useEffect(() => {
    getTransaction();
  }, [publicKey]);

  const getTransactionType = (perBalance: number[], postBalance: number[]): string => {
    if (perBalance[0] > postBalance[0]) {
      return "sent";
    } else {
      for (let i = 1; i < perBalance.length; i++) {
        if (postBalance[i] > perBalance[i]) {
          return "Receive";
        }
      }
    }
    return "unknown";
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md bg-black border-gray-800 shadow-lg shadow-purple-600">
        <CardHeader className="flex flex-row items-center space-x-4 p-6">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 text-gray-400" />
            </Button>
          </Link>
          <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[600px] overflow-y-scroll">
          {transactionHistory.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-900 rounded-lg p-4"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400">
                  {getTransactionType(transaction.meta.preBalances, transaction.meta.postBalances)}
                </p>
                <div>
                  <p className="text-xs text-gray-500 truncate">
                    {transaction.transaction.signatures[0].slice(0, 6)}...
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={`text-xs ${
                    transaction.meta.status === "Ok" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {transaction.meta.status === "Ok" ? "Confirmed" : "Failed"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
