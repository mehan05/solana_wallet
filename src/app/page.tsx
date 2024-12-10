"use client";
import { useEffect } from "react";
import CreateWallet from "./create_pharse/page";
import { CoreDetails } from "@/store/atom";
export default function Home() {
  useEffect(() => {
    console.log("wallet instance: ",CoreDetails); 
  },[])
  return (
      <div className="w-full">
          <CreateWallet/>
      </div>
  );
}


