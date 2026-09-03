import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { CalendlyLink } from "@/components/CalendlyBooking";
import type { Language } from "@/components/LandingPage";

type HeroProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function Hero({ language, onLanguageChange }: HeroProps) {
  const english = language === "en";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__topbar">
        <a className="brand-mark" href="#top" aria-label="BeyondFit home">
          <Image src="/beyondfit-wordmark.png" alt="BeyondFit" width={303} height={139} priority />
        </a>
        <nav aria-label={english ? "Main navigation" : "Hoofdnavigatie"}>
          <a href="#health-check">{english ? "The Health Check" : "De Health Check"}</a>
          <a href="#ervaringen">{english ? "Stories" : "Ervaringen"}</a>
          <div className="language-toggle" role="group" aria-label={english ? "Choose language" : "Kies taal"}>
            <button type="button" className={language === "nl" ? "is-active" : ""} onClick={() => onLanguageChange("nl")} aria-pressed={language === "nl"}>NL</button>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => onLanguageChange("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <CalendlyLink className="nav-cta">{english ? "Book for free" : "Gratis boeken"} <ArrowRight aria-hidden="true" size={15} /></CalendlyLink>
        </nav>
      </div>

      <div className="hero__body">
        <div className="hero__content">
          <p className="eyebrow">{english ? "BeyondFit Health Performance Studio" : "BeyondFit Health Performance Studio"}</p>
          <h1 id="hero-title">
            {english ? <>Your career has a strategy.<br /><em>Does your health?</em></> : <>Je carrière heeft een strategie.<br /><em>Je gezondheid ook?</em></>}
          </h1>
          <p className="hero__copy">
            {english
              ? "You can lead a team, run a business and take care of a family. But when the week becomes unpredictable, your own health is still the first commitment you cancel."
              : "Je kunt een team leiden, een bedrijf runnen en voor een gezin zorgen. Maar zodra je week onvoorspelbaar wordt, is je eigen gezondheid nog steeds de eerste afspraak die je schrapt."}
          </p>
          <p className="hero__copy hero__copy--strong">
            {english
              ? "The BeyondFit Health Check™ shows where you stand today—and what deserves your attention next."
              : "De BeyondFit Health Check™ laat zien waar je vandaag staat—en wat als volgende jouw aandacht verdient."}
          </p>
          <div className="hero__actions">
            <CalendlyLink className="primary-link">{english ? "Book your complimentary Health Check" : "Boek je gratis Health Check"} <ArrowRight aria-hidden="true" size={18} /></CalendlyLink>
            <a className="hero__scroll" href="#health-check">{english ? "See what is included" : "Bekijk wat je krijgt"} <ArrowDown aria-hidden="true" size={18} /></a>
          </div>
          <ul className="hero__facts" aria-label={english ? "Health Check details" : "Details van de Health Check"}>
            {(english
              ? ["15 minutes", "InBody scan", "Personal health review", "Clear next step"]
              : ["15 minuten", "InBody-scan", "Persoonlijke gezondheidsreview", "Heldere volgende stap"]
            ).map((item) => <li key={item}><Check aria-hidden="true" size={14} />{item}</li>)}
          </ul>
        </div>
        <div className="hero__image">
          <Image
            src="/studio/gallery/lounge-1.webp"
            alt={english ? "BeyondFit Health Performance Studio in Amsterdam West" : "BeyondFit Health Performance Studio in Amsterdam West"}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 46vw"
          />
          <span>{english ? "A private environment built around you" : "Een persoonlijke omgeving, gebouwd rond jou"}</span>
        </div>
      </div>
    </section>
  );
}