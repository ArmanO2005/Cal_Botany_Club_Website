"use client"

import Image from "next/image";
import { useEffect } from "react";


const PROJECT_ID = 249905;
const API_BASE = "https://api.inaturalist.org/v1/observations";


export default function Page() {

  useEffect(() => {
    fetchWidget(API_BASE, PROJECT_ID);
  }, []);

  return (
    <main className="min-h-screen font-sans bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          The Botany Club at UC Berkeley
        </h1>
        <div className="flex justify-center items-center space-x-4">
          <h1 className="text-3xl font-thin">
            In collaboration with
          </h1>
          <img
            src="/botanicGardenLogo.svg"
            alt="Botanic Garden Logo"
            className="w-50 h-14"
          />
          <img
            src="/herbariumLogo.png"
            alt="Herbarium Logo"
            className="w-16 h-16"
          />
        </div>
      </section>

      {/* Events Section */}
      <section className="flex justify-center">
        <div className="m-12">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>📅 October 10 — tbd</li>
            <li>📅 October 20 — tbd</li>
            <li>📅 November 5 — tbd</li>
          </ul>
        </div>
        <div className="m-12">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">Email us at <a href="mailto:calbotany@gmail.com" className="text-blue-600 underline">calbotany@gmail.com</a></p>
          <p className="text-lg">Follow us on Instagram: <a href="#" className="text-blue-600 underline">@calbotany</a></p>
        </div>
      </section>

      <section className="bg-emerald-700 py-12 px-6">
        <h2 className="text-3xl font-bold mb-4 text-white">Join Our INaturalist Project</h2>
        <div className={`widget-${PROJECT_ID} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}></div>
      </section>

    </main>
  );
}

const fetchWidget = (apiBase: string, projectID: number) => {
  const apiURL = `${apiBase}?project_id=${projectID}&page=1&per_page=12`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok)
        throw new Error(`${response.status} (${response.statusText}) from ${response.url}`);
      return response.json();
    })
    .then((data) => {
      handleWidgetData(data, projectID);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const handleWidgetData = (data: any, projectID: number) => {
  const photos = data.results.map((result: any) => ({
    attribution: result.photos?.[0]?.attribution || "No attribution",
    src: result.photos?.[0]?.url.replace("square", "medium"),
    taxon: {
      latinName: result.taxon?.name || "Unknown",
      commonName: result.taxon?.preferred_common_name || "",
    },
    user: {
      icon: result.user?.icon,
      profile: `https://www.inaturalist.org/people/${result.user?.login}`,
    },
  }));

  buildWidget(photos, projectID);
};

const buildWidget = (photos: any[], projectID: number) => {
  const grid = document.querySelector(`.widget-${projectID}`);
  if (!grid) return;

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
    profile.className = "observer__profile--link flex items-center space-x-2 mb-1";

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
      <span class="text-gray-600"> ${photo.taxon.commonName ? `(${photo.taxon.commonName})` : ""}</span>
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
};