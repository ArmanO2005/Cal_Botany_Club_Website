"use client"

import { Merriweather, Roboto } from "next/font/google";
import Link from "next/link";
import Image from "next/image";



const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function Navbar() {
    return (
      <nav className="bg-white text-black flex justify-between">
        <div className="bg-white text-black flex">
          <Link className="text-1xl font-bold p-3" href="/home">
            Home
          </Link>
          <Link className="text-1xl font-bold p-3" href="/board">
            People
          </Link>
          <Link className="text-1xl font-bold p-3" href="/calendar">
            Calendar
          </Link>
          <Link className="text-1xl font-bold p-3" href="https://ucjeps.berkeley.edu/news/botanylunch/">
            Botany Lunch
          </Link>
          <Link className="text-1xl font-bold p-3" href="/merch">
            Merch
          </Link>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <h1 className={`${merriweather.className} text-1xl mr-2`}>
            In Collaboration With
          </h1>
          <Link href="https://botanicalgarden.berkeley.edu/">
            <Image
              src="/botanicGardenLogo.svg"
              alt="Botanic Garden Logo"
              className="w-25 h-7"
              width={100}
              height={28}
            />
          </Link>
          <Link href="https://ucjeps.berkeley.edu/">
            <Image
              src="/herbariumLogo.png"
              alt="Herbarium Logo"
              className="w-8 h-8 mr-3"
              width={100}
              height={28}
            />
          </Link>
        </div>
      </nav>
    );
}