"use client";

import React from "react";
import Image from "next/image";
import { Merriweather, Roboto } from "next/font/google";
import Link from "next/link";


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

// TypeScript interface
interface BoardMember {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
}

// Reusable card component (inline)
function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm text-center">
      <Image
        src={member.imageSrc}
        alt={`${member.name} photo`}
        className="w-50 h-50 mx-auto object-cover mb-4"
        width={200}
        height={200}
      />
      <h3 className="text-xl font-bold">{member.name}</h3>
      <p className="text-sm text-gray-600">{member.title}</p>
      <p className="text-sm mt-2 text-gray-700">{member.bio}</p>
    </div>
  );
}

export default function BoardPage() {
  const studentBoardMembers: BoardMember[] = [
    {
      name: "Arman Omidvar",
      title: "President",
      bio: "Arman is a Statistics and Data Science major in the c/o '27. He currently works in curation at the UC Botanical Garden and is passionate about plant systematics and taxonomy",
      imageSrc: "/board/Arman.jpg",
    },
    {
      name: "Kelvin Snell",
      title: "Vice President",
      bio: "Kelvin is a Genetics and Plant Biology major in the c/o '26. He enjoys hiking and finding cool little things. Don't ask him to ID mushrooms, but he'll gladly be impressed by anything you find. He is also currently interning at a lab studying cold tolerance in sorghum, so ask him questions about cold tolerance and circadian rhythms!",
      imageSrc: "/board/Kelvin.jpg",
    },
    {
      name: "Yaeko Long",
      title: "Treasurer",
      bio: "Yaeko is a Genetics and Plant Biology major and minoring in Food Systems in the c/o '26. They enjoy photography and nature walks and play piccolo in Cal Band",
      imageSrc: "/board/Yaeko.jpg",
    },
    {
      name: "Sasha Bergseid",
      title: "Secretary",
      bio: "Sasha is a sophomore EECS major with a Russian language and literature minor. In her free time, she likes to defend spiders in verbal debate, participate in all things music, swim, and hide in the shade while being outside.",
      imageSrc: "/board/Sasha.jpg",
    },
  ];


  const staffBoardMembers: BoardMember[] = [
    {
      name: "Clare Loughran",
      title: "Advisor",
      bio: "Clare’s love of plants began during her time at UC Davis, where she earned a B.S. in Environmental Horticulture with an emphasis in Biodiversity and Restoration in 2011. During her career she has worked at the UC and Jepson Herbaria, the California Natural Diversity Database, the UC Davis Center for Plant Diversity, and as a Botanist for an ecological consulting firm. In her current role as Curator at the UC Botanical Garden, is eager to foster connections between students, staff, faculty, and the Garden. ",
      imageSrc: "/board/Clare.jpg",
    },
    {
      name: "Nina House",
      title: "Advisor",
      bio: "Nina House is the Managing Editor of the Jepson eFlora and a Co-Coordinator for the Jepson Public Programs at the University & Jepson Herbaria. She received her Botany M.S. from the California Botanic Garden (Claremont Graduate University) in 2022. For her thesis, she completed a floristic inventory of the Manter & Salmon Creek watersheds in Tulare County, California. Nina is passionate about plant conservation and science communication.",
      imageSrc: "/board/Nina.jpg",
    },
    {
      name: "Raphaela Floreani Buzbee",
      title: "Advisor",
      bio: "",
      imageSrc: "/board/Raphaela.jpg",
    },
    {
      name: "Keith Gilless",
      title: "Faculty Sponsor",
      bio: "J. Keith Gilless is the Interim Director of the University and Jepson Herbaria, a Professor Emeritus of Forest Economics, and the former Dean of the Rausser College of Natural Resources. He is a member of the faculty of both the Department of Environmental Science, Policy, and Management and its Department of Agricultural and Resource Economics. He is the former faculty director for Berkeley's research forests and the Summer Session Forestry Field Camp taught on the Plumas National Forest.",
      imageSrc: "/board/Keith.jpg",
    },
  ];

  return (
    <main className={`${roboto.className} min-h-screen bg-white`}>
      <section className="bg-foreground py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`${merriweather.className} text-4xl font-bold text-center text-white mb-10`}>
            Student Board Members
          </h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {studentBoardMembers.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className={`${merriweather.className} text-4xl font-bold text-center text-gray-900 mb-10`}>
            Departmental Advisors
          </h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {staffBoardMembers.map((member) => (
              <BoardMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-between mt-6">
        <h2 className="text-sm text-black">
            We are a student group acting independently of the University of California. We take full responsibility for our organization and this web site.
        </h2>

        <Link href="https://www.ocf.berkeley.edu">
            <Image 
                src="/ocf-hosted-penguin-dark.svg" 
                alt="Hosted by the OCF" 
                width={100}
                height={100}
            />
        </Link>
      </section>
    </main>
  );
}