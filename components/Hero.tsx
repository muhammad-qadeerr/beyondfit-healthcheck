import { Activity, ArrowDown, ArrowRight } from "lucide-react";

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
          <span className="brand-mark__beyond">BEYOND</span><span className="brand-mark__fit">FIT</span>
          <Activity aria-hidden="true" />
        </a>
        <nav aria-label={english ? "Main navigation" : "Hoofdnavigatie"}>
          <a href="#health-check">{english ? "The Health Check" : "De Health Check"}</a>
          <a href="#ervaringen">{english ? "Stories" : "Ervaringen"}</a>
          <div className="language-toggle" role="group" aria-label={english ? "Choose language" : "Kies taal"}>
            <button type="button" className={language === "nl" ? "is-active" : ""} onClick={() => onLanguageChange("nl")} aria-pressed={language === "nl"}>NL</button>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => onLanguageChange("en")} aria-pressed={language === "en"}>EN</button>
          </div>
          <a className="nav-cta" href="#boeken">{english ? "Book for free" : "Gratis boeken"} <ArrowRight aria-hidden="true" size={15} /></a>
        </nav>
      </div>

      <div className="hero__content">
        <p className="eyebrow">{english ? "Health that goes further" : "Gezondheid die verder gaat"}</p>
        <h1 id="hero-title">
          {english ? <>Fit is not a number.<br />It is how you <em>live beyond.</em></> : <>Fit is geen getal.<br />Het is hoe jij <em>verder leeft.</em></>}
        </h1>
        <p className="hero__copy">
          {english
            ? "BeyondFit helps you understand what your body needs. Personal, measurable and without quick promises. Start with a free Health Check™ and discover where you stand today."
            : "BeyondFit helpt je begrijpen wat jouw lichaam nodig heeft. Persoonlijk, meetbaar en zonder snelle beloftes. Start met een gratis Health Check™ en ontdek waar jij nu staat."}
        </p>
        <div className="hero__actions">
          <a className="primary-link" href="#boeken">{english ? "Book your free Health Check" : "Boek je gratis Health Check"} <ArrowRight aria-hidden="true" size={18} /></a>
          <a className="hero__scroll" href="#health-check">{english ? "Discover BeyondFit" : "Ontdek BeyondFit"} <ArrowDown aria-hidden="true" size={18} /></a>
        </div>
      </div>

      <div className="hero__signature" aria-label={english ? "BeyondFit, beyond fit" : "BeyondFit, verder dan fit"}>
        <Activity aria-hidden="true" />
        <span>{english ? "beyond fit" : "verder dan fit"}</span>
      </div>
    </section>
  );
}