"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, CheckCircle2, LockKeyhole } from "lucide-react";

import type { Language } from "@/components/LandingPage";
import { leadSchema } from "@/lib/leadSchema";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  fbclid: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  consent: false,
  utm_source: "",
  utm_campaign: "",
  utm_medium: "",
  fbclid: "",
};

const benefits = {
  nl: [
    "Je lichaamssamenstelling, spiermassa en vetpercentage",
    "Je leefstijl en huidige routine",
    "Samen je persoonlijke resultaten doornemen",
    "In kaart brengen waar je aandacht aan kunt geven",
    "Een helder advies voor je volgende stap",
  ],
  en: [
    "Your body composition, muscle mass and body fat percentage",
    "Your lifestyle and current routine",
    "Reviewing your personal results together",
    "Identifying where to focus your attention",
    "Clear advice for your next step",
  ],
};

export function BookingForm({ language }: { language: Language }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "demo" | "error">("idle");
  const english = language === "en";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValues((current) => ({
      ...current,
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_medium: params.get("utm_medium") || "",
      fbclid: params.get("fbclid") || "",
    }));
  }, []);

  function updateValue(field: keyof FormValues, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const localizedErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        if (localizedErrors[field]) continue;
        if (field === "name") localizedErrors.name = english ? "Enter at least 2 characters." : issue.message;
        if (field === "phone") localizedErrors.phone = english ? "Enter a valid Dutch or Belgian phone number." : issue.message;
        if (field === "email") localizedErrors.email = english ? "Enter a valid email address." : issue.message;
        if (field === "consent") localizedErrors.consent = english ? "Consent is required." : issue.message;
      }
      setErrors(localizedErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const result = (await response.json()) as { fields?: Record<string, string[]> };
        if (result.fields) {
          setErrors(
            Object.fromEntries(
              Object.entries(result.fields).map(([field, messages]) => [
                field,
                english ? "Please check this field." : messages?.[0],
              ]),
            ),
          );
        }
        throw new Error("Request failed");
      }

      const result = (await response.json()) as { mode?: "demo" | "live" };
      setStatus(result.mode === "demo" ? "demo" : "success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "demo") {
    const demo = status === "demo";
    return (
      <section className="booking-card booking-card--success" aria-live="polite">
        <div className="success-icon"><CheckCircle2 aria-hidden="true" size={34} /></div>
        <p className="booking-card__step">
          {demo
            ? (english ? "Preview submission" : "Testaanvraag")
            : (english ? "Request received" : "Aanvraag ontvangen")}
        </p>
        <h2>
          {demo
            ? (english ? "The form works correctly." : "Het formulier werkt correct.")
            : (english ? "Great, your Health Check is ready to get started." : "Mooi, je Health Check staat in de startblokken.")}
        </h2>
        <p>
          {demo
            ? (english ? "This is demo mode. No details were sent to a CRM." : "Dit is de demomodus. Er zijn geen gegevens naar een CRM verstuurd.")
            : (english ? "We will contact you soon to choose a suitable time together." : "We nemen snel contact met je op om samen een geschikt moment te kiezen.")}
        </p>
        <div className="success-rule" />
        <p className="success-note">
          {demo
            ? (english ? "Enable live mode after connecting Pipedrive." : "Schakel live-modus in na de Pipedrive-koppeling.")
            : (english ? "Keep an eye on your phone and inbox." : "Houd je telefoon en inbox in de gaten.")}
        </p>
      </section>
    );
  }

  const privacyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "https://beyondfit.nl/privacyverklaring/";

  return (
    <section className="booking-card" aria-labelledby="booking-title">
      <p className="booking-card__step">{english ? "No obligation · 15 minutes" : "Vrijblijvend · 15 minuten"}</p>
      <h2 id="booking-title">{english ? <>Book your free<br /><em>Health Check™</em></> : <>Boek je gratis<br /><em>Health Check™</em></>}</h2>

      <ul className="benefit-list">
        {benefits[language].map((benefit) => (
          <li key={benefit}><Check aria-hidden="true" size={15} />{benefit}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">{english ? "Name" : "Naam"}</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder={english ? "First and last name" : "Voor- en achternaam"}
            value={values.name} onChange={(event) => updateValue("name", event.target.value)}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span className="field__error" id="name-error">{errors.name}</span>}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="phone">{english ? "Phone number" : "Telefoonnummer"}</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78"
              value={values.phone} onChange={(event) => updateValue("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            {errors.phone && <span className="field__error" id="phone-error">{errors.phone}</span>}
          </div>
          <div className="field">
            <label htmlFor="email">{english ? "Email address" : "E-mailadres"}</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={english ? "name@email.com" : "naam@email.nl"}
              value={values.email} onChange={(event) => updateValue("email", event.target.value)}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <span className="field__error" id="email-error">{errors.email}</span>}
          </div>
        </div>

        <label className={`consent ${errors.consent ? "consent--error" : ""}`}>
          <input type="checkbox" checked={values.consent}
            onChange={(event) => updateValue("consent", event.target.checked)} />
          <span className="consent__box"><Check aria-hidden="true" size={14} /></span>
          <span>
            {english ? "I agree to the " : "Ik ga akkoord met het "}<a href={privacyUrl} target="_blank" rel="noreferrer">{english ? "privacy policy" : "privacybeleid"}</a>
            {errors.consent && <small>{errors.consent}</small>}
          </span>
        </label>

        {status === "error" && <p className="form-error" role="alert">{english ? "Something went wrong. Please try again." : "Er ging iets mis. Probeer het nog een keer."}</p>}

        <button className="submit-button" type="submit" disabled={!values.consent || status === "submitting"}>
          <span>{status === "submitting" ? (english ? "Please wait..." : "Even geduld...") : (english ? "Book my free Health Check" : "Boek mijn gratis Health Check")}</span>
          <ArrowRight aria-hidden="true" size={20} />
        </button>

        <p className="privacy-note">
          <LockKeyhole aria-hidden="true" size={13} />
          {english ? "Your details remain confidential. Free for new clients." : "Je gegevens blijven vertrouwelijk. Gratis voor nieuwe klanten."}
        </p>
      </form>
    </section>
  );
}