"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";

import type { Language } from "@/components/LandingPage";

const testimonials = [
  "wrUnjMiYsaI", "MMI10iGvKHg", "DGQYiVpddLs", "gfDQ7OaGynU", "FlNYYupJc-A",
  "unZ6FFrfTXI", "XdRpNaoi6BU", "eat7PnomxSs", "Zz5kMbohN9I", "leTUUHo9gSU",
];

export function Testimonials({ language }: { language: Language }) {
  const english = language === "en";
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const activeIndex = activeVideo ? testimonials.indexOf(activeVideo) : -1;

  useEffect(() => {
    if (!activeVideo) return;

    document.body.classList.add("modal-open");
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  function moveCarousel(direction: -1 | 1) {
    reelRef.current?.scrollBy({ left: direction * reelRef.current.clientWidth * 0.72, behavior: "smooth" });
  }

  function moveVideo(direction: -1 | 1) {
    const nextIndex = (activeIndex + direction + testimonials.length) % testimonials.length;
    setActiveVideo(testimonials[nextIndex]);
  }

  return (
    <section className="testimonials" id="ervaringen" data-reveal aria-labelledby="testimonials-title">
      <div className="testimonials__heading">
        <div>
          <p className="eyebrow">{english ? "Real stories" : "Echte verhalen"}</p>
          <h2 id="testimonials-title">{english ? <>They went <em>before you.</em></> : <>Zij gingen je <em>voor.</em></>}</h2>
        </div>
        <div className="testimonials__aside">
          <p>{english ? "No before-and-after promises. Just people sharing what personal attention and insight changed for them." : "Geen voor-en-na-beloftes. Wel mensen die vertellen wat persoonlijke aandacht en inzicht voor hen heeft veranderd."}</p>
          <div className="carousel-controls">
            <button type="button" onClick={() => moveCarousel(-1)} aria-label={english ? "Previous stories" : "Vorige verhalen"}><ArrowLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => moveCarousel(1)} aria-label={english ? "Next stories" : "Volgende verhalen"}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      <div ref={reelRef} className="testimonial-reel" aria-label={english ? "Video stories from BeyondFit clients" : "Video-ervaringen van BeyondFit klanten"}>
        {testimonials.map((id, index) => (
          <div className="testimonial-card" key={id}>
            <button
              className="testimonial-card__trigger"
              type="button"
              onClick={() => setActiveVideo(id)}
              aria-label={`${english ? "Play client story" : "Speel klantervaring af"} ${index + 1}`}
            >
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="testimonial-card__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="testimonial-card__shade" />
              <span className="testimonial-card__play"><Play aria-hidden="true" fill="currentColor" size={20} /></span>
              <span className="testimonial-card__label"><strong>{english ? "Client story" : "Klantverhaal"}</strong>{english ? "Watch their experience" : "Bekijk de ervaring"}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="reel-footer">
        <p>{english ? "10 honest stories. One personal approach." : "10 eerlijke verhalen. Een persoonlijke aanpak."}</p>
        <a href="#boeken">{english ? "Experience it yourself" : "Ervaar het zelf"}<ArrowRight aria-hidden="true" size={16} /></a>
      </div>

      {activeVideo && (
        <div className="review-modal" role="dialog" aria-modal="true" aria-label={english ? "Client story player" : "Klantverhaal speler"} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveVideo(null);
        }}>
          <div className="review-modal__shell">
            <button className="review-modal__close" type="button" onClick={() => setActiveVideo(null)} aria-label={english ? "Close video" : "Sluit video"}><X aria-hidden="true" /></button>
            <div className="review-modal__player">
              <iframe
                key={activeVideo}
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&playsinline=1&rel=0&feature=oembed`}
                title={`${english ? "BeyondFit client story" : "BeyondFit klantervaring"} ${activeIndex + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="review-modal__player-controls">
                <button type="button" onClick={() => moveVideo(-1)}><ArrowLeft aria-hidden="true" />{english ? "Previous" : "Vorige"}</button>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {testimonials.length}</span>
                <button type="button" onClick={() => moveVideo(1)}>{english ? "Next" : "Volgende"}<ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
            <aside className="review-modal__list">
              <p className="eyebrow">{english ? "All stories" : "Alle verhalen"}</p>
              <h3>{english ? "Real people. Real progress." : "Echte mensen. Echte vooruitgang."}</h3>
              <div className="review-list">
                {testimonials.map((id, index) => (
                  <button className={id === activeVideo ? "is-active" : ""} type="button" key={id} onClick={() => setActiveVideo(id)}>
                    <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" />
                    <span><strong>{english ? "Client story" : "Klantverhaal"} {String(index + 1).padStart(2, "0")}</strong>{english ? "Play video" : "Video afspelen"}</span>
                    <Play aria-hidden="true" fill="currentColor" />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}