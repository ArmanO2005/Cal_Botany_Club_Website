"use client"

import { Merriweather, Roboto } from "@next/font/google";


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
          <a className="text-1xl font-bold p-3" href="/home">
            Home
          </a>
          <a className="text-1xl font-bold p-3" href="/board">
            People
          </a>
          <h1 className="text-1xl font-bold p-3">
            Botany Lunch
          </h1>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <h1 className={`${merriweather.className} text-1xl mr-2`}>
            In Collaboration With
          </h1>
          <a href="https://botanicalgarden.berkeley.edu/">
            <img
              src="/botanicGardenLogo.svg"
              alt="Botanic Garden Logo"
              className="w-25 h-7"
            />
          </a>
          <a href="https://ucjeps.berkeley.edu/">
            <img
              src="/herbariumLogo.png"
              alt="Herbarium Logo"
              className="w-8 h-8 mr-3"
            />
          </a>
        </div>
      </nav>
    );
}