import { clusterApiUrl, Connection, PublicKey, TransactionResponse } from "@solana/web3.js";
const delay = (ms:number) => new Promise(res=> setTimeout(res, ms));
export async function getHistory(address:string)
{
            const TransactionHistory = []
            await delay(4000);
            try {
                    const publicKey = new PublicKey(address);
                    const connection = new Connection(clusterApiUrl('devnet'),"confirmed");
                    const transactionSignature = await connection.getSignaturesForAddress(publicKey,{limit:10});

                    if(!transactionSignature) return [];

                    const rateLimiterSize  = 2;
                    for(let counter = 0; counter < transactionSignature.length; counter += rateLimiterSize)
                    {
                        const signatureBatch = transactionSignature.slice(counter, counter + rateLimiterSize);

                        const signatures = signatureBatch.map((signature)=> connection.getTransaction(signature.signature,{commitment:"confirmed"}));

                        const rateLimitResult = await Promise.all(signatures);
                        TransactionHistory.push(...rateLimitResult.filter(Boolean));

                        
                    }

                    if(!TransactionHistory) return [];
                    
                    return TransactionHistory;
            } catch (error) {
                        if(error instanceof Error)
                        {
                            console.log(error);
                            await delay(4000);

                        }   
            }
}

