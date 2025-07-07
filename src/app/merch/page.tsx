"use client";

import React from "react";
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

export default function MerchPage() {
  return (
    <main className={`${roboto.className} min-h-screen bg-white text-gray-900`}>
      <section className="text-center py-20">
        <h1 className={`${merriweather.className} text-5xl font-thin mb-4`}>
          Merch Coming Soon :)
        </h1>
      </section>
    </main>
  );
}