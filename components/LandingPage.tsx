"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock3, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

import { BookingForm } from "@/components/BookingForm";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";

export type Language = "nl" | "en";

export function LandingPage() {
  const [language, setLanguage] = useState<Language>("nl");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("beyondfit-language");
    if (savedLanguage === "en") {
      setLanguage("en");
      document.documentElement.lang = "en";
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("beyondfit-language", nextLanguage);
  }

  const english = language === "en";

  return (
    <main id="top">
      <Hero language={language} onLanguageChange={changeLanguage} />
      <section className="proof-strip" aria-label={english ? "Health Check benefits" : "Voordelen van de Health Check"}>
        <div className="proof-strip__item"><Star aria-hidden="true" fill="currentColor" /><span><strong>4.9 / 5</strong>{english ? "Client appreciation" : "Waardering van klanten"}</span></div>
        <div className="proof-strip__item"><Clock3 aria-hidden="true" /><span><strong>15 min</strong>{english ? "Personal baseline" : "Persoonlijke nulmeting"}</span></div>
        <div className="proof-strip__item"><ShieldCheck aria-hidden="true" /><span><strong>{english ? "No obligation" : "Vrijblijvend"}</strong>{english ? "No sales pitch" : "Geen verkooppraat"}</span></div>
        <a href="#boeken">{english ? "Reserve my spot" : "Reserveer mijn plek"}<ArrowRight aria-hidden="true" /></a>
      </section>
      <TrustBadges language={language} />
      <section className="conversion-banner" data-reveal>
        <div>
          <p className="eyebrow">{english ? "One small step, real clarity" : "Een kleine stap, echte helderheid"}</p>
          <h2>{english ? "Your body already tells a story." : "Je lichaam vertelt al een verhaal."}<br /><em>{english ? "Let us read it together." : "Laten we het samen lezen."}</em></h2>
        </div>
        <a className="primary-link" href="#boeken">{english ? "Start with my free check" : "Start met mijn gratis check"}<ArrowRight aria-hidden="true" size={18} /></a>
      </section>
      <Testimonials language={language} />
      <section className="booking-section" id="boeken" data-reveal aria-label={english ? "Book your free Health Check" : "Boek je gratis Health Check"}>
        <div className="booking-intro">
          <p className="eyebrow">{english ? "Your next step" : "Jouw volgende stap"}</p>
          <h2>
            {english ? <>Ready to find out<br />where you <em>stand?</em></> : <>Klaar om te weten<br />waar je <em>staat?</em></>}
          </h2>
          <p>
            {english
              ? "Leave your details and we will contact you personally to choose a suitable time."
              : "Laat je gegevens achter. We nemen persoonlijk contact met je op om een geschikt moment te kiezen."}
          </p>
        </div>
        <div className="booking-panel"><BookingForm language={language} /></div>
      </section>
      <footer>
        <a className="brand-mark brand-mark--footer" href="#top" aria-label="BeyondFit home">
          <Image src="/beyondfit-wordmark.png" alt="BeyondFit" width={303} height={139} />
        </a>
        <p>© {new Date().getFullYear()} BeyondFit. {english ? "All rights reserved." : "Alle rechten voorbehouden."}</p>
      </footer>
    </main>
  );
}