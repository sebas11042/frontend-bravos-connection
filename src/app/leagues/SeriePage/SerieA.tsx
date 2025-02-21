"use client";

import Image from "next/image";
import { useState } from "react";

export default function PremierLeague() {
  const [user, setUser] = useState({
    isConnected: true,
    walletAddress: "0x1234abcd5678efgh",
  });

  return (
    
    <div className="w-full h-[40rem] flex items-center bg-white  -mt-[5rem] relative">
    
      <div>
        <Image src="/serieimage.png" alt="premier league" fill className="object-cover"/>
      </div>

      <div className=" absolute w-full h-full bg-gradient-to-b from-[rgba(34,29,47,0.82)] via-[rgba(31,27,44,0.31)] to-[rgba(29,24,41,0)]"></div>

      
      {user.isConnected ? (
        <div className=" flex z-90 w-full h-full md:leading-[80px] relative flex-col items-center justify-center text-[#FFFFFF] mt-[9rem]">
          <span className="font-medium text-[24px] sm:text-[28px] tracking-[0.1em] md:tracking-[0.2em] md:text-[32px]">
            Welcome to
          </span>
          <span className="md:text-[80px] lg:text-[75px] sm:text-[70px] text-[50px]">
            Serie A
          </span>
          <span className="md:text-[48px] text-[30px] sm:text-[35px] sm:tracking-[1.2em] tracking-[0.7em] text-center lg:tracking-[1.4em] md:tracking-[1em]">
            Tournament
          </span>
        </div>
      ) : (
        <div className="text-white text-3xl relative mx-auto  bg-black/70 rounded-full w-fit p-5">
          {" "}
          Please Connect wallet
        </div>
      )}
    </div>
  );
}
  
