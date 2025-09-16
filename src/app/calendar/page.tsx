"use client";

import secrets from '../secrets.json';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import Link from "next/link";
import Image from "next/image";

interface Event {
  title: string;
  start: string;
  end?: string;
}


export default function GoogleCalendar() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/calbotany@gmail.com/events?key=${secrets.Calendar_API_Key}`
      );
      const data = await res.json();
      const parsed = data.items.map((item: any) => ({
        title: item.summary,
        start: item.start.dateTime || item.start.date,
        end: item.end?.dateTime || item.end?.date,
      }));
      setEvents(parsed);
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
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
    </div>
  );
}