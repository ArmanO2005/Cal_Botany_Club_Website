"use client";

import "../globals.css";
import { useEffect } from "react";
import { Merriweather, Roboto } from "next/font/google";
import Image from "next/image";
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

const PROJECT_ID = 249905;
const API_BASE = "https://api.inaturalist.org/v1/observations";

// ---- Types ----
type INatPhoto = { attribution?: string; url?: string };
type INatTaxon = { name?: string; preferred_common_name?: string };
type INatUser = { icon?: string; login?: string };
type INatResult = { photos?: INatPhoto[]; taxon?: INatTaxon; user?: INatUser };
type INatResponse = { results?: INatResult[] };

// If fetch fails (CORS/CSP), we inject iNaturalist's widget <script> as a fallback:
function mountINatWidgetFallback(projectID: number) {
  const container = document.querySelector<HTMLDivElement>(`.widget-${projectID}`);
  if (!container) return;

  // Clear any partial content
  container.innerHTML = "";

  // iNaturalist observations widget (grid, 12 items)
  // Docs: iNaturalist supports an embeddable observations.widget script.
  const s = document.createElement("script");
  s.async = true;
  s.src =
    `https://www.inaturalist.org/observations.widget?` +
    `project_id=${projectID}&layout=grid&limit=12&order=desc&order_by=observed_on`;

  // Provide a minimal heading so users know this is live content
  const heading = document.createElement("div");
  heading.className = "text-white mb-2";
  heading.textContent = "Loading observations (via iNaturalist widget)…";

  container.appendChild(heading);
  container.appendChild(s);
}

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
    <main className={`${roboto.className} min-h-screen bg-white text-gray-900`}>
      <section
        className="text-white py-30 text-center"
        style={{
          backgroundImage: "url('/superBloom.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className={`${merriweather.className} text-7xl font-thin mb-4`}>
          Botany at Berkeley
        </h1>
      </section>

      {/* Events Section */}
      <section className="flex justify-center">
        <div className="m-12">
          <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>📅 Meetings occur during the second Tuesday of every month at 5:30 pm</li>
            <li>📍 Meetings will be held in the Herbarium Conference Room, 1002 VLSB</li>
            <li>🎤 Speakers will be posted on our calendar prior to each meeting</li>
            <li>⛺ Club trips will be posted on Instagram and on the calendar</li>
          </ul>
        </div>
        <div className="m-12">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">
            Email us at{" "}
            <a href="mailto:calbotany@gmail.com" className="text-blue-600 underline">
              calbotany@gmail.com
            </a>
          </p>
          <p className="text-lg">
            Follow us on Instagram:{" "}
            <a href="#" className="text-blue-600 underline">
              @calbotany
            </a>
          </p>
        </div>
      </section>

      <section className="bg-foreground py-12 px-6">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Recent Observations Made by Our Members
        </h2>
        <h2 className="text-2xl font-thin mb-4 text-white">
          Join Our{" "}
          <Link
            href="https://www.inaturalist.org/projects/uc-berkeley-botany-club"
            className="text-blue-200 underline"
          >
            INaturalist Project{" "}
          </Link>
        </h2>

        {/* This is where we render cards or mount the widget fallback */}
        <div
          className={`widget-${PROJECT_ID} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}
          aria-live="polite"
        />

        <Link
          href="https://www.inaturalist.org/projects/uc-berkeley-botany-club?tab=observations"
          className="text-2xl text-blue-200"
        >
          See More{" "}
        </Link>

        <section className="flex justify-between mt-6">
            <h2 className="text-sm text-white">
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