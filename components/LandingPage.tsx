"use client";

import { useEffect, useState } from "react";

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
      <TrustBadges language={language} />
      <Testimonials language={language} />
      <section className="booking-section" id="boeken" aria-label={english ? "Book your free Health Check" : "Boek je gratis Health Check"}>
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
          <div className="booking-monogram"><span>b</span>f</div>
        </div>
        <div className="booking-panel"><BookingForm language={language} /></div>
      </section>
      <footer>
        <a className="brand-mark brand-mark--footer" href="#top">BEYOND<span>FIT</span></a>
        <p>© {new Date().getFullYear()} BeyondFit. {english ? "All rights reserved." : "Alle rechten voorbehouden."}</p>
      </footer>
    </main>
  );
}