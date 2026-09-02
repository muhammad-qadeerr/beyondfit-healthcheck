import { BarChart3, MessageCircleMore, ScanLine, UserRoundCheck } from "lucide-react";

import { CalendlyLink } from "@/components/CalendlyBooking";
import type { Language } from "@/components/LandingPage";

const dutchItems = [
  { icon: ScanLine, number: "01", title: "Inzicht in je lichaam", copy: "Een InBody-scan geeft een helder beeld van je lichaamssamenstelling, spiermassa en vetpercentage." },
  { icon: MessageCircleMore, number: "02", title: "Persoonlijke review", copy: "We bespreken je leefstijl, routine, energie en wat je op dit moment mogelijk tegenhoudt." },
  { icon: BarChart3, number: "03", title: "Focus bepalen", copy: "Samen brengen we in kaart welke onderdelen van je gezondheid nu de meeste aandacht verdienen." },
  { icon: UserRoundCheck, number: "04", title: "Realistische vervolgstap", copy: "Je vertrekt met een duidelijke eerste stap die past bij jouw agenda en echte leven." },
];

const englishItems = [
  { icon: ScanLine, number: "01", title: "Understand your body", copy: "An InBody scan gives you a clear view of body composition, muscle mass and body fat." },
  { icon: MessageCircleMore, number: "02", title: "Personal review", copy: "We discuss your lifestyle, routine, energy and what may currently be holding you back." },
  { icon: BarChart3, number: "03", title: "Identify your focus", copy: "Together, we identify which areas of your health deserve attention now." },
  { icon: UserRoundCheck, number: "04", title: "A realistic next step", copy: "You leave with a clear first step that works with your schedule and real life." },
];

export function TrustBadges({ language }: { language: Language }) {
  const english = language === "en";
  const items = english ? englishItems : dutchItems;

  return (
    <section className="process" id="health-check" data-reveal aria-labelledby="process-title">
      <div className="process__heading">
        <p className="eyebrow eyebrow--dark">{english ? "More than a body scan" : "Meer dan een bodyscan"}</p>
        <h2 id="process-title">{english ? <>Clarity about where you are.<br /><em>Direction for what comes next.</em></> : <>Helderheid over waar je staat.<br /><em>Richting voor wat volgt.</em></>}</h2>
        <p>{english ? "You do not leave with another generic plan. You leave knowing what matters most for your body, routine and demanding life right now." : "Je vertrekt niet met het zoveelste generieke plan. Je weet wat nu het belangrijkst is voor jouw lichaam, routine en drukke leven."}</p>
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
        <p><strong>{english ? "Complimentary for new clients." : "Gratis voor nieuwe cliënten."}</strong> {english ? "No pressure. Just useful insight." : "Geen druk. Wel waardevol inzicht."}</p>
        <CalendlyLink>{english ? "Book my Health Check" : "Boek mijn Health Check"}</CalendlyLink>
      </div>
    </section>
  );
}