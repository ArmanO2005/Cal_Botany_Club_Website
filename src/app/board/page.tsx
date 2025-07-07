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
        className="w-32 h-32 mx-auto object-cover mb-4"
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
      bio: "I work in curation at the UC Botanic Garden. I'm studying Statistics and Data Science in the c/o '27",
      imageSrc: "/members/alice.jpg",
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
      bio: "Description",
      imageSrc: "/members/carol.jpg",
    },
    {
      name: "TBD",
      title: "Secretary",
      bio: "Description",
      imageSrc: "/members/david.jpg",
    },
  ];


  const staffBoardMembers: BoardMember[] = [
    {
      name: "Clare Loughran",
      title: "Advisor",
      bio: "Curator of the UC Botanical Garden",
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