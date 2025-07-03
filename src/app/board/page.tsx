"use client";

import React from "react";

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
  const boardMembers: BoardMember[] = [
    {
      name: "Arman Omidvar",
      title: "President",
      bio: "I work in curation at the UC Botanic Garden. I'm studying Statistics and Data Science in the c/o '27",
      imageSrc: "/members/alice.jpg",
    },
    {
      name: "Bob Smith",
      title: "Vice President",
      bio: "Junior in Environmental Science who loves hiking and ecosystem restoration.",
      imageSrc: "/members/bob.jpg",
    },
    {
      name: "Carol Lee",
      title: "Treasurer",
      bio: "Finance major helping the club stay on budget while organizing fun events.",
      imageSrc: "/members/carol.jpg",
    },
    {
      name: "David Nguyen",
      title: "Secretary",
      bio: "Note-taker and meeting organizer, also runs the club newsletter.",
      imageSrc: "/members/david.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Student Board Members
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {boardMembers.map((member) => (
            <BoardMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}