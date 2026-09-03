"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BatteryCharging, CalendarCheck2, Clock3, Dumbbell, HeartPulse, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { CalendlyLink, CalendlyWidget } from "@/components/CalendlyBooking";
import { Hero } from "@/components/Hero";
import { StudioGallery } from "@/components/StudioGallery";
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

    let animationFrame = 0;
    const updateScrollEffects = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
        document.documentElement.style.setProperty("--page-progress", String(progress));
        document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.035, 24)}px`);
      });
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });

    return () => {
      revealObserver.disconnect();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateScrollEffects);
    };
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("beyondfit-language", nextLanguage);
  }

  const english = language === "en";

  return (
    <main id="top">
      <div className="page-progress" aria-hidden="true" />
      <Hero language={language} onLanguageChange={changeLanguage} />
      <section className="proof-strip" aria-label={english ? "Health Check benefits" : "Voordelen van de Health Check"}>
        <div className="proof-strip__item"><Clock3 aria-hidden="true" /><span><strong>15 min</strong>{english ? "Focused and valuable" : "Gericht en waardevol"}</span></div>
        <div className="proof-strip__item"><CalendarCheck2 aria-hidden="true" /><span><strong>{english ? "Real-life fit" : "Past in het echte leven"}</strong>{english ? "Built around your schedule" : "Rond jouw agenda gebouwd"}</span></div>
        <div className="proof-strip__item"><ShieldCheck aria-hidden="true" /><span><strong>{english ? "No obligation" : "Vrijblijvend"}</strong>{english ? "Professional guidance" : "Professionele begeleiding"}</span></div>
        <CalendlyLink>{english ? "Reserve my spot" : "Reserveer mijn plek"}<ArrowRight aria-hidden="true" /></CalendlyLink>
      </section>
      <section className="recognition" data-reveal aria-labelledby="recognition-title">
        <div className="recognition__intro">
          <p className="eyebrow eyebrow--dark">{english ? "For people carrying a lot" : "Voor mensen die veel dragen"}</p>
          <h2 id="recognition-title">
            {english ? <>You take care of everything.<br /><em>But who protects your health?</em></> : <>Je zorgt voor alles.<br /><em>Maar wie beschermt jouw gezondheid?</em></>}
          </h2>
          <p>{english ? "You know health matters. The challenge is making it work when meetings, travel, deadlines and family change the week." : "Je weet dat gezondheid belangrijk is. De uitdaging is om het vol te houden wanneer afspraken, reizen, deadlines en gezin je week veranderen."}</p>
        </div>
        <div className="recognition__grid">
          {[
            { icon: BatteryCharging, nl: "Je redt de werkdag, maar thuis is je energie op.", en: "You get through the workday, but have nothing left when you get home." },
            { icon: Dumbbell, nl: "Je weet wat je moet doen. Toch begin je steeds opnieuw.", en: "You know what to do. Yet you keep having to start again." },
            { icon: HeartPulse, nl: "Je lichaam voelt ouder en stijver dan bij je leeftijd past.", en: "Your body feels older and stiffer than it should at your age." },
            { icon: CalendarCheck2, nl: "Eén drukke week is genoeg om je routine weer kwijt te raken.", en: "One demanding week is enough to lose your routine again." },
          ].map(({ icon: Icon, nl, en }) => (
            <article key={en}><Icon aria-hidden="true" /><p>{english ? en : nl}</p></article>
          ))}
        </div>
      </section>
      <StudioGallery language={language} />
      <section className="strategy-section" data-reveal aria-labelledby="strategy-title">
        <p className="eyebrow">{english ? "The core difference" : "Het verschil"}</p>
        <h2 id="strategy-title">
          {english ? <>You do not need to make fitness your life.<br /><em>You need a health strategy that works with it.</em></> : <>Fitness hoeft niet je leven te worden.<br /><em>Je hebt een gezondheidsstrategie nodig die ermee werkt.</em></>}
        </h2>
        <p>{english ? "The problem is rarely knowledge or ambition. It is a health approach that only works when life is quiet. BeyondFit helps you build one that survives meetings, travel, stress and family demands." : "Het probleem is zelden kennis of ambitie. Het is een gezondheidsaanpak die alleen werkt wanneer het leven rustig is. BeyondFit helpt je er één bouwen die overeind blijft bij afspraken, reizen, stress en gezinsdrukte."}</p>
      </section>
      <section className="identity-shift" data-reveal aria-labelledby="identity-title">
        <div className="identity-shift__heading">
          <p className="eyebrow eyebrow--dark">{english ? "A different way to think" : "Een andere manier van denken"}</p>
          <h2 id="identity-title">
            {english ? <>You do not need more motivation.<br /><em>You need a new standard.</em></> : <>Je hebt niet meer motivatie nodig.<br /><em>Je hebt een nieuwe standaard nodig.</em></>}
          </h2>
        </div>
        <div className="identity-shift__grid">
          <div>
            <span>{english ? "The pattern today" : "Het patroon van nu"}</span>
            <blockquote>
              {english
                ? "“I will focus on myself when work settles down.”"
                : "“Ik richt me weer op mezelf zodra het rustiger wordt op werk.”"}
            </blockquote>
            <p>{english ? "Health depends on spare time, perfect weeks and renewed motivation." : "Gezondheid hangt af van vrije tijd, perfecte weken en nieuwe motivatie."}</p>
          </div>
          <ArrowRight aria-hidden="true" />
          <div className="identity-shift__destination">
            <span>{english ? "The BeyondFit identity" : "De BeyondFit-identiteit"}</span>
            <blockquote>
              {english
                ? "“I protect my health because everything else depends on me.”"
                : "“Ik bescherm mijn gezondheid, omdat al het andere op mij leunt.”"}
            </blockquote>
            <p>{english ? "Health becomes part of how you live, lead and handle changing weeks." : "Gezondheid wordt onderdeel van hoe je leeft, leidinggeeft en omgaat met veranderende weken."}</p>
          </div>
        </div>
      </section>
      <TrustBadges language={language} />
      <Testimonials language={language} />
      <section className="booking-section" id="boeken" data-reveal aria-label={english ? "Book your free Health Check" : "Boek je gratis Health Check"}>
        <div className="booking-intro">
          <div className="booking-intro__copy">
            <p className="eyebrow">{english ? "Your most valuable asset" : "Je meest waardevolle bezit"}</p>
            <h2>
              {english ? <>Always protect your most valuable asset—<em>you.</em></> : <>Bescherm altijd je meest waardevolle bezit—<em>jij.</em></>}
            </h2>
            <p>
              {english
                ? "Your health supports how you perform, lead and show up for the people who depend on you. Start by understanding where you stand."
                : "Je gezondheid bepaalt hoe je presteert, leidinggeeft en er bent voor de mensen die op je rekenen. Begin met inzicht in waar je staat."}
            </p>
          </div>
          <div className="booking-intro__cta">
            <span>{english ? "Your next step" : "Jouw volgende stap"}</span>
            <strong>{english ? "See what your health needs now." : "Ontdek wat je gezondheid nu nodig heeft."}</strong>
            <p>{english ? "15 minutes. Personal insight. No obligation." : "15 minuten. Persoonlijk inzicht. Vrijblijvend."}</p>
            <CalendlyLink className="primary-link">
              {english ? "Book my complimentary Health Check" : "Boek mijn gratis Health Check"}
              <ArrowRight aria-hidden="true" size={18} />
            </CalendlyLink>
          </div>
        </div>
      </section>
      <CalendlyWidget language={language} />
      <footer>
        <a className="brand-mark brand-mark--footer" href="#top" aria-label="BeyondFit home">
          <Image src="/beyondfit-wordmark.png" alt="BeyondFit" width={303} height={139} />
        </a>
        <p>© {new Date().getFullYear()} BeyondFit. {english ? "All rights reserved." : "Alle rechten voorbehouden."}</p>
      </footer>
    </main>
  );
}