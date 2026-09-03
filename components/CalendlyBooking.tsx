"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { CalendarDays, X } from "lucide-react";




const calendlyUrl = "https://calendly.com/beyondfit_/30min";
const openEvent = "beyondfit:open-calendly";

type CalendlyLinkProps = {
  children: ReactNode;
  className?: string;
};

export function CalendlyLink({ children, className }: CalendlyLinkProps) {
  function openCalendar(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.dispatchEvent(new Event(openEvent));
  }

  return (
    <a className={className} href="https://calendly.com/beyondfit_/30min" onClick={openCalendar}>
      {children}
    </a>
  );
}

export function CalendlyWidget({ language }: { language: "nl" | "en" }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const english = language === "en";

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(openEvent, handleOpen);
    return () => window.removeEventListener(openEvent, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>("button, iframe, [href], [tabindex]:not([tabindex='-1'])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button className="calendly-fab" type="button" onClick={() => setOpen(true)}>
        <CalendarDays aria-hidden="true" />
        <span>{english ? "Book free Health Check" : "Boek gratis Health Check"}</span>
      </button>

      {open && (
        <div
          className="calendly-modal"
          role="dialog"
          aria-modal="true"
          aria-label={english ? "Book your Health Check" : "Boek je Health Check"}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="calendly-modal__shell" ref={modalRef}>
            <div className="calendly-modal__heading">
              <div>
                <span>{english ? "Choose your moment" : "Kies jouw moment"}</span>
                <strong>{english ? "Book your complimentary Health Check" : "Boek je gratis Health Check"}</strong>
              </div>
              <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label={english ? "Close calendar" : "Sluit kalender"}>
                <X aria-hidden="true" />
              </button>
            </div>
            <iframe
              src={calendlyUrl}
              title={english ? "BeyondFit booking calendar" : "BeyondFit boekingskalender"}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
