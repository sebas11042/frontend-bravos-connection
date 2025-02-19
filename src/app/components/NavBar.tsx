"use client";

import { Kanit, Open_Sans } from "next/font/google";
import { useState } from "react";

const pages = ["Home", "About", "Tournaments", "Rules", "Support"];
const pages2 = [
  "Help",
  "Starkfantasy League",
  "Market",
  "About",
  "Tournaments",
];
const openSans = Open_Sans({ subsets: ["latin"] });
const kanit = Kanit({ weight: "800" });

export default function NavBar({ active }: { active?: boolean }) {
  const [currentPage, setCurrentPage] = useState("Home");

  if (active) {
    return (
      <nav className="bg-[#232323] rounded-[60px] w-[855px] mx-auto h-[79px] flex justify-center items-center">
        <ul className="flex w-[595px] h-[22px] justify-between">
          {pages2.map((page, i) => (
            <li key={page}>
              <a
                tabIndex={i + 1}
                className={`[font-size: 20px] [line-height: 20px] max-h-[20px] font-extrabold hover:cursor-pointer text-center ${
                  kanit.className
                } ${
                  page === "Starkfantasy League"
                    ? "text-[#FFB200] underline"
                    : "text-[#FF9500]"
                }`}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="bg-neutral-900 rounded-[40px] w-[700px] mx-auto h-[70px] flex justify-center items-center">
        <ul className="flex w-[595px] h-[22px] justify-between">
          {pages.map((page, i) => (
            <li
              tabIndex={i + 1}
              className={`[font-size: 20px] [line-height: 20px] max-h-[20px] font-bold hover:cursor-pointer hover:text-orange-600 hover:underline focus:text-orange-600 focus:underline text-center ${
                openSans.className
              } ${currentPage === page ? "text-amber-500" : "text-white"}`}
              key={page}
            >
              {page}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
