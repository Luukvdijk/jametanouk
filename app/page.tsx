import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="inhoud">
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="hero-photo">
          <Image
            src="/images/trouwjurk.jpg"
            alt="Trouwjurk hangend aan een muur met klimop"
            fill
            priority
            quality={65}
            sizes="100vw"
          />
        </div>
        <div className="grain" aria-hidden="true" />
        <div className="hero-frame container">
          <p className="kicker rise r1">
            Trouwambtenaar &middot; Ceremoniespreker
          </p>
          <h1>
            <span className="line">
              <span className="rise r2">Jullie liefde verdient</span>
            </span>
            <span className="line">
              <span className="rise r3">
                <em>een verhaal dat klopt.</em>
              </span>
            </span>
          </h1>
          <p className="hero-lede rise r4">
            De woorden die het verschil maken. Een persoonlijke ceremonie met
            humor waar het kan, emotie waar het mag en altijd vanuit jullie
            eigen verhaal.
          </p>
          <div className="hero-cta rise r5">
            <Link href="/contact" className="btn">
              Plan een kennismaking
            </Link>
            <a href="#over" className="btn btn-ghost">
              Ontdek meer
            </a>
          </div>
        </div>
      </section>

      {/* ---- Het begin ---- */}
      <section className="section about" id="over">
        <div className="ghost-letter" aria-hidden="true">
          A
        </div>
        <div className="container about-grid">
          <div className="about-media">
            <Reveal className="about-photo">
              <Image
                src="/images/bruidspaar.jpg"
                alt="Bruidspaar loopt hand in hand, bruid met boeket"
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 86vw, 40vw"
              />
            </Reveal>
            <Reveal delay={150} className="quote-card">
              <p>
                &ldquo;Het vangen van die kleine, authentieke details die jullie
                liefde uniek maken.&rdquo;
              </p>
            </Reveal>
          </div>
          <div className="about-copy">
            <Reveal>
              <p className="label">Het begin</p>
              <h2>
                JA! met <em>Anouk</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Mijn passie voor gastvrijheid en de liefde voor het meest
                waardevolle moment van de dag komen hier samen. Ik heb jarenlang
                mensen ontvangen, diners{" "}
                <a
                  href="https://l-affetto.nl/"
                  target="_blank"
                  rel="noopener"
                  className="inline-link"
                >
                  (L&rsquo;Affetto)
                </a>{" "}
                verzorgd, evenementen begeleid en sta daardoor letterlijk tussen
                de mensen. Dat maakt mij juist interessant als
                (zelfstandige) BABS.
              </p>
              <p className="about-note">
                Het is bij mij n&eacute;t even anders: na de ceremonie kan ik
                mijn &lsquo;toga&rsquo; verwisselen voor mijn koksbuis en ook
                het diner een onvergetelijke invulling geven.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link href="/over-mij" className="arrow-link">
                Lees mijn verhaal
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Quote ---- */}
      <section className="quoteband">
        <div className="container">
          <Reveal>
            <blockquote>
              &ldquo;Ik verkoop geen &lsquo;dienst&rsquo;, ik verkoop{" "}
              <em>rust</em>. Als Anouk erbij is, komt het goed.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---- Werkwijze ---- */}
      <section className="section werkwijze" id="werkwijze">
        <div className="container">
          <Reveal>
            <p className="label">Stap voor stap</p>
            <h2>
              Mijn <em>werkwijze</em>
            </h2>
          </Reveal>
          <div className="werkwijze-grid">
            <div className="steps">
              <Reveal delay={0}>
                <div className="step">
                  <span className="step-num">01</span>
                  <div>
                    <h3>Kennismaken</h3>
                    <p>
                      Jullie trouwdag begint met een goed gesprek. De eerste
                      kennismaking is er vooral om te ontdekken of er een klik
                      is: voelt het goed tussen ons? We duiken nog niet meteen
                      de inhoud van de ceremonie in, dat komt later. Aan deze
                      kennismaking zijn geen kosten verbonden.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="step">
                  <span className="step-num">02</span>
                  <div>
                    <h3>De praktische zaken</h3>
                    <p>
                      Samen bespreken we waar de ceremonie plaatsvindt, in welke
                      gemeente jullie trouwen en wat er geregeld moet worden. Ik
                      begeleid jullie door het proces, zodat jullie precies
                      weten wat jullie kunnen verwachten.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="step">
                  <span className="step-num">03</span>
                  <div>
                    <h3>Jullie verhaal</h3>
                    <p>
                      Dan ga ik aan de slag. Ik schrijf geen standaardspeech,
                      maar een persoonlijk verhaal dat bij jullie past. Met
                      humor waar het kan, emotie waar het mag en altijd vanuit
                      jullie eigen verhaal.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="step">
                  <span className="step-num">04</span>
                  <div>
                    <h3>De grote dag</h3>
                    <p>
                      Op jullie trouwdag zorg ik voor een ontspannen en
                      persoonlijke ceremonie. Een moment waarop jullie alleen
                      maar hoeven te genieten.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal className="werkwijze-media" delay={120}>
              <Image
                src="/images/bruid-boeket.jpg"
                alt="Bruid met een kleurrijk boeket in het gras"
                width={1600}
                height={1067}
                sizes="(max-width: 900px) 86vw, 34vw"
              />
              <Image
                src="/images/trouwauto.jpg"
                alt="Klassieke rode trouwauto met wit lint"
                width={1600}
                height={1065}
                sizes="(max-width: 900px) 86vw, 34vw"
              />
            </Reveal>
          </div>

          <Reveal className="extra-services">
            <div className="extra-grid">
              <div className="extra-media">
                <Image
                  src="/images/strand-bruidspaar.jpg"
                  alt="Bruidspaar wandelt hand in hand over het strand"
                  width={1600}
                  height={1067}
                  sizes="(max-width: 900px) 86vw, 30vw"
                />
              </div>
              <div className="extra-body">
                <p className="label">Meer dan alleen een trouwceremonie</p>
                <ul>
                  <li>
                    Een persoonlijke ceremoniespreker bij een huwelijk in het
                    buitenland.
                  </li>
                  <li>
                    Een symbolische ceremonie na een geregistreerd partnerschap.
                  </li>
                  <li>
                    Het leiden van de ceremonie volgens het draaiboek van jullie
                    weddingplanner, zodat de ceremoniemeester zelf volop van de
                    dag kan genieten.
                  </li>
                  <li>
                    Een complete culinaire invulling van de dag via{" "}
                    <a
                      href="https://l-affetto.nl/"
                      target="_blank"
                      rel="noopener"
                      className="inline-link"
                    >
                      L&rsquo;Affetto
                    </a>
                    , van diner tot feest. Zo lopen ceremonie en gastvrijheid
                    naadloos in elkaar over.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Pakketten ---- */}
      <section className="section packages-section" id="pakketten">
        <div className="container">
          <Reveal className="section-head">
            <p className="label">Pakketten</p>
            <h2>
              Kies jullie <em>JA!</em>
            </h2>
            <p className="section-intro">
              De tarieven zijn afhankelijk van jullie wensen en de invulling van
              de dag. Daarom werk ik met heldere pakketten, zodat jullie vooraf
              precies weten waar jullie aan toe zijn.
            </p>
          </Reveal>
          <div className="packages">
            <Reveal delay={0} className="package">
              <h3>JA! met Anouk</h3>
              <p className="package-sub">Officieel trouwen</p>
              <ul>
                <li>Kennismaking</li>
                <li>Jullie offici&euml;le huwelijksceremonie</li>
                <li>Voltrokken door de BABS en juridisch vastgelegd</li>
                <li>Dagco&ouml;rdinatie mogelijk</li>
              </ul>
              <p className="package-price">Tarief op aanvraag</p>
              <Link
                href="/contact?pakket=officieel-trouwen"
                className="arrow-link"
              >
                Vraag tarieven aan
              </Link>
            </Reveal>
            <Reveal delay={100} className="package featured">
              <h3>JA! met Anouk</h3>
              <p className="package-sub">Ceremonie op maat</p>
              <ul>
                <li>Symbolische ceremonie</li>
                <li>Buitenlandse bruiloft</li>
                <li>Geregistreerd partnerschap</li>
                <li>Jubileum of herbevestiging van geloften</li>
                <li>Dagco&ouml;rdinatie mogelijk</li>
              </ul>
              <p className="package-price">Tarief op aanvraag</p>
              <Link
                href="/contact?pakket=ceremonie-op-maat"
                className="arrow-link"
              >
                Vraag tarieven aan
              </Link>
            </Reveal>
            <Reveal delay={200} className="package">
              <h3>JA! &amp; Diner met Anouk</h3>
              <p className="package-sub">Ceremonie en culinaire beleving</p>
              <ul>
                <li>Ceremonie</li>
                <li>
                  Dagco&ouml;rdinatie tijdens de ceremonie (volgens draaiboek)
                </li>
                <li>
                  Exclusief diner of culinaire beleving door L&rsquo;Affetto
                </li>
              </ul>
              <p className="package-price">Tarief op aanvraag</p>
              <Link href="/contact?pakket=ja-diner" className="arrow-link">
                Vraag tarieven aan
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Culinair ---- */}
      <section className="section culinair">
        <div className="container culinair-grid">
          <div className="culinair-copy">
            <Reveal>
              <p className="label">De culinaire verbinding</p>
              <h2>
                Maak de herinnering <em>smaakvol</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Als chef-kok verzorg ik met L&rsquo;Affetto een bijzonder diner
                of complete culinaire beleving na de ceremonie. Van een
                priv&eacute;diner voor twee tot een avond met al jullie gasten:
                de liefde voor de tafel is waar het ooit begon. Zo lopen
                ceremonie en gastvrijheid naadloos in elkaar over.
              </p>
            </Reveal>
            <Reveal delay={180} className="culinair-links">
              <a
                href="https://l-affetto.nl/"
                target="_blank"
                rel="noopener"
                className="arrow-link"
              >
                Ontdek L&rsquo;Affetto
              </a>
              <a href="#pakketten" className="arrow-link arrow-link-muted">
                Bekijk het JA! &amp; Diner pakket
              </a>
            </Reveal>
          </div>
          <Reveal className="culinair-media" delay={120}>
            <Image
              src="/images/tuinfeest.jpg"
              alt="Bruidspaar loopt een sfeervol tuinfeest met lichtjes binnen"
              width={1600}
              height={1067}
              sizes="(max-width: 900px) 86vw, 44vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <Reveal>
              <p className="label">Contact</p>
              <h2>
                Wat is jullie <em>verhaal?</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
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
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
