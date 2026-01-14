"use client";

import "../globals.css";
import { useEffect, useState, useMemo } from "react";
import { Merriweather, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import secrets from '../secrets.json';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";



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

// end of INat widget stuff
const PROJECT_ID = 249905;
const API_BASE = "https://api.inaturalist.org/v1/observations";


type INatPhoto = { attribution?: string; url?: string };
type INatTaxon = { name?: string; preferred_common_name?: string };
type INatUser = { icon?: string; login?: string };
type INatResult = { photos?: INatPhoto[]; taxon?: INatTaxon; user?: INatUser };
type INatResponse = { results?: INatResult[] };


function mountINatWidgetFallback(projectID: number) {
  const container = document.querySelector<HTMLDivElement>(`.widget-${projectID}`);
  if (!container) return;

  container.innerHTML = "";

  const s = document.createElement("script");
  s.async = true;
  s.src =
    `https://www.inaturalist.org/observations.widget?` +
    `project_id=${projectID}&layout=grid&limit=12&order=desc&order_by=observed_on`;

  const heading = document.createElement("div");
  heading.className = "text-white mb-2";
  heading.textContent = "Loading observations (via iNaturalist widget)…";

  container.appendChild(heading);
  container.appendChild(s);
}
// end of INat widget stuff


// start of GCal stuff
type GCalDate = { date?: string; dateTime?: string; timeZone?: string };
type GCalEvent = {
  id: string;
  htmlLink?: string;
  summary?: string;
  location?: string;
  start: GCalDate;
  end: GCalDate;
};

function nowISO() {
  return new Date().toISOString();
}

function formatRange(start: GCalDate, end: GCalDate, locale = "en-US", tz?: string) {
  const isAllDay = !!start.date && !start.dateTime;
  if (isAllDay) {
    const s = new Date(start.date!);
    const e = new Date(new Date(end.date!).getTime() - 24 * 60 * 60 * 1000); // end is exclusive
    const df = new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", timeZone: tz });
    if (s.toDateString() === e.toDateString()) return df.format(s);
    return `${df.format(s)} – ${df.format(e)}`;
  }
  const s = new Date(start.dateTime!);
  const e = new Date(end.dateTime!);
  const sameDay = s.toDateString() === e.toDateString();

  const dfDate = new Intl.DateTimeFormat(locale, { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: tz });
  const dfTime = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: tz });

  return sameDay
    ? `${dfDate.format(s)} • ${dfTime.format(s)}–${dfTime.format(e)}`
    : `${dfDate.format(s)} ${dfTime.format(s)} – ${dfDate.format(e)} ${dfTime.format(e)}`;
}

function NextFourGCalEvents({
  calendarId,
  apiKey,
  timeZone = "America/Los_Angeles",
  maxResults = 5,
  className,
}: {
  calendarId: string;
  apiKey: string;
  timeZone?: string;
  maxResults?: number;
  className?: string;
}) {
  const [events, setEvents] = useState<GCalEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const url = useMemo(() => {
    const base = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
    );
    base.searchParams.set("key", apiKey);
    base.searchParams.set("orderBy", "startTime");
    base.searchParams.set("singleEvents", "true");
    base.searchParams.set("maxResults", String(maxResults));
    base.searchParams.set("timeMin", nowISO());
    if (timeZone) base.searchParams.set("timeZone", timeZone);
    return base.toString();
  }, [apiKey, calendarId, maxResults, timeZone]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setError(null);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        const items: GCalEvent[] = (json.items ?? []).filter(
          (e: any) => e.start && (e.start.date || e.start.dateTime)
        );
        if (alive) setEvents(items);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Failed to load events.");
      }
    })();
    return () => {
      alive = false;
    };
  }, [url]);

  if (error) {
    return <div className={className}><p className="text-red-600">Couldn’t load events: {error}</p></div>;
  }
  if (!events) return <div className={className}><p>Loading events…</p></div>;
  if (events.length === 0) return <div className={className}><p>No upcoming events.</p></div>;

  return (
    <div className={className}>
      <h2 className={`${merriweather.className} text-2xl md:text-3xl font-semibold mb-4 text-center md:text-left`}>Upcoming Events</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-4">
        {events.slice(0, maxResults).map((ev) => (
          <li key={ev.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition">
            <Link
              href={ev.htmlLink ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="text-black font-medium underline decoration-transparent hover:decoration-inherit"
            >
              {ev.summary ?? "Untitled event"}
            </Link>
            <div className="mt-1 text-sm text-gray-600">
              {formatRange(ev.start, ev.end, typeof navigator !== "undefined" ? navigator.language : "en-US", timeZone)}
            </div>
            {ev.location && <div className="mt-1 text-sm text-gray-500">{ev.location}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
//end of GCal stuff


export default function Page() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.querySelector(`.widget-${PROJECT_ID}`);
    if (!container) return;

    fetchWidget(API_BASE, PROJECT_ID).catch((err) => {
      console.error("[iNat] fetch failed; mounting widget fallback.", err);
      mountINatWidgetFallback(PROJECT_ID);
    });
  }, []);

  return (
    <main className={`${roboto.className} min-h-screen w-full bg-white text-gray-900`}>
      <section
        className="text-white py-12 md:py-20 px-4"
        style={{
          backgroundImage: "url('/superBloom.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className={`${merriweather.className} text-4xl md:text-6xl lg:text-7xl font-thin mb-8 md:mb-4 text-center`}>
          Botany at Berkeley
        </h1>

        <div className="px-2 md:px-4 mt-8 md:mt-12">
            <NextFourGCalEvents
                calendarId="calbotany@gmail.com"
                apiKey={secrets.Calendar_API_Key}
                timeZone="America/Los_Angeles"
                maxResults={5}
                className="center"
            />
        </div>
      </section>

      {/* Events Section */}
      <section className="flex flex-col lg:flex-row justify-center gap-6 px-4 py-8 max-w-6xl mx-auto">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Us</h2>
          <ul className="list-disc pl-6 text-base md:text-lg space-y-2">
            <li>📅 Regular Meetings occur during the first Wednesday of every month at 5:30 pm</li>
            <li>📍 Meetings will be held in the Herbarium Conference Room, 1002 VLSB</li>
            <li>🎤 Speakers will be posted on our calendar prior to each meeting</li>
            <li>⛺ Club trips will be posted on Instagram and on the calendar</li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-base md:text-lg mb-4">
            Join the club's {" "}
            <Link href="https://discord.gg/pFawnGxbmQ" className="text-blue-600 underline">
              Discord Server
            </Link>
          </p>
          <p className="text-base md:text-lg mb-4">
            Email us at{" "}
            <Link href="mailto:calbotany@gmail.com" className="text-blue-600 underline">
              calbotany@gmail.com
            </Link>
          </p>
          <p className="text-base md:text-lg mb-4">
            Follow us on Instagram:{" "}
            <Link href="https://www.instagram.com/calbotany/" className="text-blue-600 underline">
              @calbotany
            </Link>
          </p>
          <p className="text-base md:text-lg">
            Check out this neat {" "}
            <Link href="https://armano2005.github.io/Plant_Guessing_Game/" className="text-blue-600 underline">
              plant/fungi identification game
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-green-800 px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white text-center md:text-left">
          Recent Observations Made by Our Members
        </h2>
        <h2 className="text-xl md:text-2xl font-thin mb-4 text-white text-center md:text-left">
          Join Our{" "}
          <Link
            href="https://www.inaturalist.org/projects/uc-berkeley-botany-club"
            className="text-blue-200 underline"
          >
            INaturalist Project{" "}
          </Link>
        </h2>

        <div
          className={`widget-${PROJECT_ID} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}
          aria-live="polite"
        />

        <Link
          href="https://www.inaturalist.org/projects/uc-berkeley-botany-club?tab=observations"
          className="text-xl md:text-2xl text-blue-200 block mt-4"
        >
          See More{" "}
        </Link>

        <section className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-green-700">
            <h2 className="text-xs sm:text-sm text-white text-center sm:text-left">
                We are a student group acting independently of the University of California. We take full responsibility for our organization and this web site.
            </h2>

            <Link href="https://www.ocf.berkeley.edu" className="flex-shrink-0">
                <Image 
                    src="/ocf-hosted-penguin-dark.svg" 
                    alt="Hosted by the OCF" 
                    width={80}
                    height={80}
                    className="w-20 h-20"
                />
            </Link>
        </section>

      </section>
    </main>
  );
}

async function fetchWidget(apiBase: string, projectID: number) {
  const apiURL = `${apiBase}?project_id=${projectID}&page=1&per_page=12&photos=true`;

  const res = await fetch(apiURL, {
    // These hints help avoid stale caches and make CORS intent explicit
    method: "GET",
    mode: "cors",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`${res.status} (${res.statusText}) from ${res.url}`);
  }

  const data = (await res.json()) as INatResponse;
  handleWidgetData(data, projectID);
}

function handleWidgetData(data: INatResponse, projectID: number) {
  const results = data.results ?? [];
  const photos = results
    .map((result) => {
      const photo = result.photos?.[0];
      return {
        attribution: photo?.attribution || "No attribution",
        src: photo?.url ? photo.url.replace("square", "medium") : "",
        taxon: {
          latinName: result.taxon?.name || "Unknown",
          commonName: result.taxon?.preferred_common_name || "",
        },
        user: {
          icon: result.user?.icon || "",
          profile: `https://www.inaturalist.org/people/${result.user?.login ?? ""}`,
        },
      };
    })
    .filter((p) => p.src);

  buildWidget(photos, projectID);
}

type PhotoCard = {
  attribution: string;
  src: string;
  taxon: { latinName: string; commonName: string };
  user: { icon: string; profile: string };
};

function buildWidget(photos: PhotoCard[], projectID: number) {
  const grid = document.querySelector(`.widget-${projectID}`);
  if (!grid) return;

  // If we have no photos (e.g., API up but empty result), show a friendly note
  if (!photos.length) {
    const note = document.createElement("div");
    note.className = "text-white/80";
    note.textContent = "No recent observations found.";
    grid.appendChild(note);
    return;
  }

  photos.forEach((photo) => {
    const fig = document.createElement("figure");
    fig.className = "observation__fig border rounded shadow overflow-hidden";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.taxon.latinName;
    img.className = "observation__fig--image w-full h-120 object-cover";
    fig.appendChild(img);

    const figCap = document.createElement("figcaption");
    figCap.className = "observation__fig--caption p-2 bg-gray-100 text-sm";

    const profile = document.createElement("a");
    profile.href = photo.user.profile;
    profile.target = "_blank";
    profile.rel = "noopener noreferrer";
    profile.className =
      "observer__profile--link flex items-center space-x-2 mb-1";

    if (photo.user.icon) {
      const avatar = document.createElement("img");
      avatar.src = photo.user.icon;
      avatar.alt = "User icon";
      avatar.className = "w-5 h-5 rounded-full";
      profile.appendChild(avatar);
    }

    const nameSpan = document.createElement("span");
    nameSpan.innerHTML = `
      <span class="font-semibold">${photo.taxon.latinName}</span>
      <span class="text-gray-600"> ${
        photo.taxon.commonName ? `(${photo.taxon.commonName})` : ""
      }</span>
    `;

    const attribution = document.createElement("footer");
    attribution.className = "observation__fig--footer text-gray-500 mt-1";
    attribution.textContent = photo.attribution;

    figCap.appendChild(profile);
    figCap.appendChild(nameSpan);
    figCap.appendChild(attribution);

    fig.appendChild(figCap);
    grid.appendChild(fig);
  });
}