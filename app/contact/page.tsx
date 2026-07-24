import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { pakketLabel } from "@/lib/pakketten";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Plan een vrijblijvende kennismaking met trouwambtenaar Anouk. Vertel iets over jullie dag en ontdek wat er mogelijk is.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ pakket?: string }>;
}) {
  const { pakket } = await searchParams;
  const defaultPakket = pakket && pakketLabel(pakket) ? pakket : "";
  return (
    <main id="inhoud">
      <section className="page-hero">
        <div className="container">
          <p className="kicker rise r1">Contact</p>
          <h1>
            <span className="line">
              <span className="rise r2">Zullen we jullie</span>
            </span>
            <span className="line">
              <span className="rise r3">
                <em>verhaal</em> ontdekken?
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-grid">
          <div className="contact-copy">
            <Reveal>
              <p>
                Vertel iets over jullie dag: waar en wanneer jullie trouwen, en hoe jullie de
                ceremonie voor je zien. Een kennismaking is altijd vrijblijvend. Ik reageer
                meestal binnen twee werkdagen.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="contact-detail">
                <p className="label">Liever direct contact?</p>
                <div className="contact-lines">
                  <a className="contact-mail" href="mailto:info@jametanouk.nl">
                    info@jametanouk.nl
                  </a>
                  <a className="contact-alt" href="tel:+31611429005">
                    06 11 42 90 05
                  </a>
                  <a
                    className="contact-alt"
                    href="https://www.instagram.com/jametanouk/"
                    target="_blank"
                    rel="noopener"
                  >
                    @jametanouk
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ContactForm defaultPakket={defaultPakket} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
