import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Ja! met Anouk omgaat met jullie persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang en welke rechten jullie hebben.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="kicker rise r1">Privacy</p>
          <h1>
            <span className="line">
              <span className="rise r2">Zorgvuldig met</span>
            </span>
            <span className="line">
              <span className="rise r3">
                jullie <em>gegevens.</em>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section legal-page">
        <div className="container">
          <Reveal>
            <div className="prose legal-prose">
              <p className="legal-updated">Laatst bijgewerkt: juli 2026</p>

              <p>
                Ja! met Anouk (trouwambtenaar en ceremoniespreker), gevestigd aan de
                Kapelstraat 25, 1404 HV Bussum en ingeschreven bij de Kamer van Koophandel
                onder nummer 63510898, is verantwoordelijk voor de verwerking van
                persoonsgegevens zoals beschreven in deze privacyverklaring. Vragen hierover?
                Mail naar{" "}
                <a className="inline-link" href="mailto:info@jametanouk.nl">
                  info@jametanouk.nl
                </a>{" "}
                of bel <a className="inline-link" href="tel:+31611429005">06 11 42 90 05</a>.
              </p>

              <h2>Welke gegevens we verwerken</h2>
              <p>
                Via het contactformulier op deze website verwerken we de gegevens die jullie
                zelf invullen: jullie namen, e-mailadres, telefoonnummer (optioneel),
                trouwdatum (optioneel), pakketvoorkeur en jullie bericht. Nemen jullie direct
                contact op via e-mail of telefoon, dan verwerken we de gegevens die jullie
                daarbij delen.
              </p>

              <h2>Waarvoor we ze gebruiken</h2>
              <p>
                We gebruiken deze gegevens uitsluitend om te reageren op jullie aanvraag, een
                kennismaking te plannen en een eventuele offerte of overeenkomst voor te
                bereiden (grondslag: uitvoering van de overeenkomst en de fase daarvoor,
                artikel 6 lid 1 sub b AVG). We versturen geen nieuwsbrieven en verkopen jullie
                gegevens nooit aan derden.
              </p>

              <h2>Wie er verder bij betrokken zijn</h2>
              <p>
                Voor de techniek achter deze website schakelen we verwerkers in. Berichten uit
                het contactformulier worden bezorgd via Resend Inc. en de website wordt gehost
                door Vercel Inc. Voor statistieken gebruiken we Google Analytics van Google
                Ireland Ltd (zie hieronder). Deze partijen zijn (deels) gevestigd in de
                Verenigde Staten; doorgifte gebeurt op basis van de
                EU-standaardcontractbepalingen en het EU-VS Data Privacy Framework. Vercel
                verwerkt daarnaast beknopte serverlogs (waaronder IP-adressen) om de website
                veilig en bereikbaar te houden.
              </p>

              <h2>Google Analytics en Search Console</h2>
              <p>
                We gebruiken Google Analytics 4 om te begrijpen hoe bezoekers de website
                gebruiken, bijvoorbeeld welke pagina&rsquo;s het meest bekeken worden. Dat
                gebeurt alleen nadat jullie via de cookiebanner &lsquo;ja&rsquo; hebben gezegd.
                We hebben Google Analytics privacyvriendelijk ingesteld: IP-adressen worden
                geanonimiseerd, we delen geen gegevens voor advertentiedoeleinden en de
                statistieken zijn niet tot personen te herleiden. Daarnaast gebruiken we
                Google Search Console om te zien hoe de website in de zoekresultaten van
                Google presteert; die dienst verwerkt geen persoonsgegevens van bezoekers van
                deze website.
              </p>

              <h2>Cookies</h2>
              <p>
                Bij jullie eerste bezoek vragen we via de cookiebanner of we
                statistiek-cookies mogen plaatsen. Zeggen jullie nee, dan plaatsen we geen
                analysecookies; de website werkt dan gewoon volledig. Zeggen jullie ja, dan
                plaatst Google Analytics cookies (waaronder <code>_ga</code> en{" "}
                <code>_ga_*</code>, met een bewaartermijn van maximaal twee jaar). Jullie
                keuze zelf slaan we lokaal in de browser op. Van gedachten veranderd? Via de
                link &lsquo;Cookievoorkeuren&rsquo; onderaan elke pagina kunnen jullie de keuze
                opnieuw maken.
              </p>

              <h2>Hoe lang we gegevens bewaren</h2>
              <p>
                We bewaren jullie aanvraag zolang dat nodig is voor de afhandeling, en uiterlijk
                twaalf maanden na het laatste contact. Wordt het een boeking, dan bewaren we de
                gegevens die bij de overeenkomst horen zo lang de wettelijke (fiscale)
                bewaarplicht dat vraagt.
              </p>

              <h2>Jullie rechten</h2>
              <p>
                Jullie hebben het recht om je persoonsgegevens in te zien, te laten corrigeren
                of te laten verwijderen, en het recht op beperking van de verwerking, bezwaar en
                dataportabiliteit. Stuur daarvoor een bericht naar{" "}
                <a className="inline-link" href="mailto:info@jametanouk.nl">
                  info@jametanouk.nl
                </a>
                . Niet tevreden over hoe we met jullie gegevens omgaan? Dan kunnen jullie een
                klacht indienen bij de{" "}
                <a
                  className="inline-link"
                  href="https://www.autoriteitpersoonsgegevens.nl/"
                  target="_blank"
                  rel="noopener"
                >
                  Autoriteit Persoonsgegevens
                </a>
                .
              </p>

              <h2>Beveiliging</h2>
              <p>
                De verbinding met deze website is versleuteld (https) en alleen Anouk heeft
                toegang tot de berichten die via het formulier binnenkomen.
              </p>

              <h2>Wijzigingen</h2>
              <p>
                We kunnen deze privacyverklaring aanpassen wanneer de website of onze
                dienstverlening verandert. De actuele versie staat altijd op deze pagina.
              </p>

              <p>
                Terug naar <Link className="inline-link" href="/">de homepage</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
