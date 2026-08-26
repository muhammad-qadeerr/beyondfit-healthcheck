"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import type { Language } from "@/components/LandingPage";

const testimonials = [
  "wrUnjMiYsaI", "MMI10iGvKHg", "DGQYiVpddLs", "gfDQ7OaGynU", "FlNYYupJc-A",
  "unZ6FFrfTXI", "XdRpNaoi6BU", "eat7PnomxSs", "Zz5kMbohN9I", "leTUUHo9gSU",
];

export function Testimonials({ language }: { language: Language }) {
  const english = language === "en";
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="testimonials" id="ervaringen" aria-labelledby="testimonials-title">
      <div className="testimonials__heading">
        <div>
          <p className="eyebrow">{english ? "Real stories" : "Echte verhalen"}</p>
          <h2 id="testimonials-title">{english ? <>They went <em>before you.</em></> : <>Zij gingen je <em>voor.</em></>}</h2>
        </div>
        <p>{english ? "No before-and-after promises. Just people sharing what personal attention and insight changed for them." : "Geen voor-en-na-beloftes. Wel mensen die vertellen wat persoonlijke aandacht en inzicht voor hen heeft veranderd."}</p>
      </div>

      <div className="testimonial-reel" aria-label={english ? "Video stories from BeyondFit clients" : "Video-ervaringen van BeyondFit klanten"}>
        {testimonials.map((id, index) => (
          <div className="testimonial-card" key={id}>
            {activeVideo === id ? (
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&feature=oembed`}
                title={`${english ? "BeyondFit client story" : "BeyondFit klantervaring"} ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                className="testimonial-card__trigger"
                type="button"
                onClick={() => setActiveVideo(id)}
                aria-label={`${english ? "Play client story" : "Speel klantervaring af"} ${index + 1}`}
              >
                <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="testimonial-card__shade" />
                <span className="testimonial-card__play"><Play aria-hidden="true" fill="currentColor" size={20} /></span>
                <span className="testimonial-card__label">{english ? "Story" : "Ervaring"} {String(index + 1).padStart(2, "0")}</span>
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="reel-hint">{english ? "Scroll to see more stories" : "Scroll om meer verhalen te bekijken"}</p>
    </section>
  );
}