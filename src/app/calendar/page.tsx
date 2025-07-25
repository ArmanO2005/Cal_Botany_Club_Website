"use client";

import secrets from '../secrets.json';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";

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
    </div>
  );
}