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
      <img
        src={member.imageSrc}
        alt={`${member.name} photo`}
        className="w-50 h-50 mx-auto object-cover mb-4"
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
      bio: "Junior in Environmental Science who loves hiking and ecosystem restoration.",
      imageSrc: "/members/bob.jpg",
    },
    {
      name: "Yaeko Long",
      title: "Treasurer",
      bio: "Yaeko is a Plant Biology major in the c/o '26. They are interested in plant ecology and conservation.",
      imageSrc: "/members/carol.jpg",
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
      imageSrc: "/members/alice.jpg",
    },
    {
      name: "Nina House",
      title: "Advisor",
      bio: "description",
      imageSrc: "/members/bob.jpg",
    },
    {
      name: "Raphaela Floreani Buzbee",
      title: "Advisor",
      bio: "description",
      imageSrc: "/members/carol.jpg",
    },
    {
      name: "Keith Gilless",
      title: "Faculty Sponsor",
      bio: "description",
      imageSrc: "/members/david.jpg",
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
    </main>
  );
}