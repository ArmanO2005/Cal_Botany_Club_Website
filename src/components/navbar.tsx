"use client"

import { Merriweather, Roboto } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";



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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <nav className="bg-white text-black border-b border-gray-200">
        <div className="w-full px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-between items-start py-3">
            {/* Left corner - Navigation links */}
            <div className="flex gap-2">
              <Link className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} href="/home">
                Home
              </Link>
              <Link className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} href="/board">
                People
              </Link>
              <Link className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} href="/calendar">
                Calendar
              </Link>
              <Link className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} href="https://ucjeps.berkeley.edu/news/botanylunch/">
                Botany Lunch
              </Link>
              <Link className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} href="/merch">
                Merch
              </Link>
            </div>
            {/* Right corner - Collaboration section */}
            <div className="flex items-center gap-3">
              <h1 className={`${merriweather.className} text-sm mr-2 hidden xl:block`}>
                In Collaboration With
              </h1>
              <Link href="https://botanicalgarden.berkeley.edu/">
                <Image
                  src="/botanicGardenLogo.svg"
                  alt="Botanic Garden Logo"
                  className="h-7 w-auto"
                  width={100}
                  height={28}
                />
              </Link>
              <Link href="https://ucjeps.berkeley.edu/">
                <Image
                  src="/herbariumLogo.png"
                  alt="Herbarium Logo"
                  className="h-8 w-auto"
                  width={200}
                  height={28}
                />
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-between items-center py-3">
            <h1 className={`${merriweather.className} text-lg font-bold`}>Botany at Berkeley</h1>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="lg:hidden pb-3 border-t border-gray-200">
              <div className="flex flex-col gap-1 pt-2">
                <Link 
                  className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} 
                  href="/home"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} 
                  href="/board"
                  onClick={() => setIsMenuOpen(false)}
                >
                  People
                </Link>
                <Link 
                  className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} 
                  href="/calendar"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calendar
                </Link>
                <Link 
                  className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} 
                  href="https://ucjeps.berkeley.edu/news/botanylunch/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Botany Lunch
                </Link>
                <Link 
                  className={`${roboto.className} text-base font-bold px-3 py-2 hover:bg-gray-100 rounded`} 
                  href="/merch"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Merch
                </Link>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                <p className={`${merriweather.className} text-xs text-gray-600`}>
                  In Collaboration With:
                </p>
                <Link href="https://botanicalgarden.berkeley.edu/">
                  <Image
                    src="/botanicGardenLogo.svg"
                    alt="Botanic Garden Logo"
                    className="h-6 w-auto"
                    width={100}
                    height={28}
                  />
                </Link>
                <Link href="https://ucjeps.berkeley.edu/">
                  <Image
                    src="/herbariumLogo.png"
                    alt="Herbarium Logo"
                    className="h-7 w-auto"
                    width={200}
                    height={28}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
}