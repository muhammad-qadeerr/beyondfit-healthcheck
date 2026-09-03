"use client";

import Image from "next/image";
import { useState } from "react";

import type { Language } from "@/components/LandingPage";

type StudioCategory = {
  id: string;
  label: { en: string; nl: string };
  description: { en: string; nl: string };
  images: Array<{
    src: string;
    alt: { en: string; nl: string };
  }>;
};

const categories: StudioCategory[] = [
  {
    id: "training",
    label: { en: "Personal Training", nl: "Persoonlijke training" },
    description: {
      en: "Focused coaching in a private, well-equipped training environment.",
      nl: "Gerichte coaching in een persoonlijke, volledig uitgeruste trainingsomgeving.",
    },
    images: [
      { src: "/studio/gallery/training-1.webp", alt: { en: "Personal coaching on the strength floor", nl: "Persoonlijke coaching op de trainingsvloer" } },
      { src: "/studio/gallery/training-2.webp", alt: { en: "Coach supporting a client during strength training", nl: "Coach begeleidt een cliënt tijdens krachttraining" } },
      { src: "/studio/gallery/training-3.webp", alt: { en: "Movement coaching in the BeyondFit studio", nl: "Bewegingscoaching in de BeyondFit-studio" } },
      { src: "/studio/gallery/training-4.webp", alt: { en: "One-to-one bench training with a coach", nl: "Een-op-een-training op de bank met een coach" } },
      { src: "/studio/gallery/training-5.webp", alt: { en: "Coach observing a mobility exercise", nl: "Coach observeert een mobiliteitsoefening" } },
    ],
  },
  {
    id: "kitchen",
    label: { en: "Kitchen & Nutrition", nl: "Keuken & voeding" },
    description: {
      en: "Practical nutrition guidance in the studio kitchen—not another restrictive diet.",
      nl: "Praktische voedingsbegeleiding in de studiokeuken—geen nieuw streng dieet.",
    },
    images: [
      { src: "/studio/gallery/kitchen-1.webp", alt: { en: "Nutrition conversation at the BeyondFit kitchen", nl: "Voedingsgesprek bij de BeyondFit-keuken" } },
      { src: "/studio/gallery/kitchen-2.webp", alt: { en: "Personal nutrition guidance at the kitchen counter", nl: "Persoonlijke voedingsbegeleiding aan het keukenblad" } },
      { src: "/studio/gallery/kitchen-3.webp", alt: { en: "Preparing fresh ingredients in the studio kitchen", nl: "Verse ingrediënten klaarmaken in de studiokeuken" } },
      { src: "/studio/gallery/kitchen-4.webp", alt: { en: "Clients gathering around the BeyondFit kitchen", nl: "Cliënten samen rond de BeyondFit-keuken" } },
      { src: "/studio/gallery/kitchen-5.webp", alt: { en: "Fresh smoothie prepared at BeyondFit", nl: "Verse smoothie bereid bij BeyondFit" } },
    ],
  },
  {
    id: "assessment",
    label: { en: "Coaching & Assessment", nl: "Coaching & meting" },
    description: {
      en: "Personal coaching that turns your health data and assessment results into a clear, practical plan.",
      nl: "Persoonlijke coaching die je gezondheidsdata en meetresultaten vertaalt naar een helder, praktisch plan.",
    },
    images: [
      { src: "/studio/gallery/coaching-assessment.webp", alt: { en: "Coach explaining personal health assessment results to a client", nl: "Coach bespreekt persoonlijke meetresultaten met een cliënt" } },
      { src: "/studio/gallery/assessment-2.webp", alt: { en: "Coach reviewing personal health information with a client", nl: "Coach bespreekt persoonlijke gezondheidsinformatie met een cliënt" } },
      { src: "/studio/gallery/assessment-3.webp", alt: { en: "Personal results displayed during a health review", nl: "Persoonlijke resultaten tijdens een gezondheidsreview" } },
      { src: "/studio/gallery/coaching-2.webp", alt: { en: "Coach guiding clients during a personal session", nl: "Coach begeleidt cliënten tijdens een persoonlijke sessie" } },
      { src: "/studio/gallery/assessment-5.webp", alt: { en: "Digital results used to guide the next step", nl: "Digitale resultaten als basis voor de volgende stap" } },
    ],
  },
  {
    id: "lounge",
    label: { en: "Lounge & Community", nl: "Lounge & community" },
    description: {
      en: "A relaxed place for conversation, reflection and connection before or after a session.",
      nl: "Een ontspannen plek voor gesprek, reflectie en contact voor of na een sessie.",
    },
    images: [
      { src: "/studio/gallery/lounge-1.webp", alt: { en: "Warm welcome in the BeyondFit lounge", nl: "Warm welkom in de BeyondFit-lounge" } },
      { src: "/studio/gallery/lounge-2.webp", alt: { en: "Clients talking together in the lounge", nl: "Cliënten in gesprek in de lounge" } },
      { src: "/studio/gallery/lounge-3.webp", alt: { en: "BeyondFit communal lounge and kitchen", nl: "Gezamenlijke lounge en keuken van BeyondFit" } },
      { src: "/studio/gallery/lounge-4.webp", alt: { en: "Community gathering around the studio table", nl: "Samenkomst rond de tafel in de studio" } },
      { src: "/studio/gallery/lounge-5.webp", alt: { en: "Relaxed conversation after a session", nl: "Ontspannen gesprek na een sessie" } },
    ],
  },
  {
    id: "studio",
    label: { en: "Studio & Arrival", nl: "Studio & binnenkomst" },
    description: {
      en: "A bright boutique studio in Amsterdam West, designed to feel personal from the moment you arrive.",
      nl: "Een lichte boutique studio in Amsterdam West, persoonlijk vanaf het moment dat je binnenkomt.",
    },
    images: [
      { src: "/studio/gallery/studio-1.webp", alt: { en: "BeyondFit entrance signage in Amsterdam West", nl: "BeyondFit-entree in Amsterdam West" } },
      { src: "/studio/gallery/studio-2.webp", alt: { en: "Client arriving at the BeyondFit studio", nl: "Cliënt arriveert bij de BeyondFit-studio" } },
      { src: "/studio/gallery/studio-3.webp", alt: { en: "Bright changing area inside BeyondFit", nl: "Lichte kleedruimte binnen BeyondFit" } },
      { src: "/studio/gallery/studio-4.webp", alt: { en: "Wide view of the boutique training studio", nl: "Ruim overzicht van de boutique trainingsstudio" } },
      { src: "/studio/gallery/studio-5.webp", alt: { en: "Welcoming interior at the studio entrance", nl: "Gastvrij interieur bij de studio-entree" } },
    ],
  },
];

export function StudioGallery({ language }: { language: Language }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];
  const activeImage = activeCategory.images[activeImageIndex];
  const english = language === "en";

  return (
    <section className="studio-atmosphere" data-reveal aria-labelledby="studio-title">
      <div className="studio-atmosphere__intro">
        <p className="eyebrow eyebrow--dark">{english ? "Inside BeyondFit" : "Binnen bij BeyondFit"}</p>
        <h2 id="studio-title">
          {english ? <>A boutique studio built around <em>personal attention.</em></> : <>Een boutique studio gebouwd rond <em>persoonlijke aandacht.</em></>}
        </h2>
        <p>
          {english
            ? "Explore the spaces where training, health assessment and practical nutrition come together under one roof."
            : "Ontdek de ruimtes waar training, gezondheidsmetingen en praktische voeding samenkomen onder één dak."}
        </p>
      </div>

      <div className="studio-gallery__tabs" role="tablist" aria-label={english ? "Studio photo categories" : "Categorieën studiofoto's"}>
        {categories.map((category) => {
          const active = category.id === activeCategory.id;
          return (
            <button
              id={`studio-tab-${category.id}`}
              key={category.id}
              type="button"
              role="tab"
              aria-controls={`studio-panel-${category.id}`}
              aria-selected={active}
              className={active ? "is-active" : ""}
              onClick={() => {
                setActiveCategoryId(category.id);
                setActiveImageIndex(0);
              }}
            >
              {category.label[language]}
            </button>
          );
        })}
      </div>

      <div
        id={`studio-panel-${activeCategory.id}`}
        className="studio-gallery__panel"
        role="tabpanel"
        aria-labelledby={`studio-tab-${activeCategory.id}`}
      >
        <div className="studio-gallery__summary">
          <strong>{activeCategory.label[language]}</strong>
          <p>{activeCategory.description[language]}</p>
        </div>
        <figure className="studio-gallery__featured">
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt[language]}
            fill
            sizes="(max-width: 760px) 100vw, 58vw"
            quality={90}
          />
        </figure>
        <div className="studio-gallery__supporting">
          {activeCategory.images.map((image, index) => (
            index !== activeImageIndex && (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={english ? "Show this photo as the large image" : "Toon deze foto als grote afbeelding"}
              >
                <Image src={image.src} alt={image.alt[language]} fill sizes="(max-width: 760px) 82vw, 21vw" quality={90} />
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
