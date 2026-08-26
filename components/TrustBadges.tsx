import { BarChart3, ScanLine, UserRoundCheck } from "lucide-react";

import type { Language } from "@/components/LandingPage";

const dutchItems = [
  { icon: ScanLine, number: "01", title: "Meten", copy: "Een InBody-scan brengt onder meer spiermassa, vetpercentage en balans in beeld." },
  { icon: BarChart3, number: "02", title: "Begrijpen", copy: "Je coach vertaalt de cijfers naar heldere inzichten die passen bij jouw situatie." },
  { icon: UserRoundCheck, number: "03", title: "Vooruitkijken", copy: "Je vertrekt met een concrete eerste stap. Zonder verplichtingen, zonder verkooppraat." },
];

const englishItems = [
  { icon: ScanLine, number: "01", title: "Measure", copy: "An InBody scan reveals muscle mass, body fat percentage and physical balance." },
  { icon: BarChart3, number: "02", title: "Understand", copy: "Your coach translates the numbers into clear insights tailored to your situation." },
  { icon: UserRoundCheck, number: "03", title: "Move forward", copy: "You leave with a concrete first step. No obligations and no sales pitch." },
];

export function TrustBadges({ language }: { language: Language }) {
  const english = language === "en";
  const items = english ? englishItems : dutchItems;

  return (
    <section className="process" id="health-check" aria-labelledby="process-title">
      <div className="process__heading">
        <p className="eyebrow eyebrow--dark">{english ? "The BeyondFit approach" : "De BeyondFit aanpak"}</p>
        <h2 id="process-title">{english ? <>Know where you stand.<br /><em>Move forward with direction.</em></> : <>Weet waar je staat.<br /><em>Ga verder met richting.</em></>}</h2>
        <p>{english ? "The free Health Check™ is your personal baseline: fifteen minutes that reveal what numbers alone cannot tell you." : "De gratis Health Check™ is jouw persoonlijke nulmeting: een kwartier dat helder maakt wat cijfers alleen niet vertellen."}</p>
      </div>
      <div className="process__grid">
        {items.map(({ icon: Icon, number, title, copy }) => (
          <article className="process-item" key={number}>
            <div className="process-item__top"><Icon aria-hidden="true" size={24} /><span>{number}</span></div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="process__cta">
        <p><strong>{english ? "15 minutes." : "15 minuten."}</strong> {english ? "No obligations. A clear starting point." : "Geen verplichtingen. Wel een helder startpunt."}</p>
        <a href="#boeken">{english ? "Plan my Health Check" : "Plan mijn Health Check"}</a>
      </div>
    </section>
  );
}