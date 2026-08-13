import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Ja! met Anouk voor huwelijksceremonies, symbolische ceremonies en aanverwante diensten.",
  alternates: { canonical: "/voorwaarden" },
};

export default function Voorwaarden() {
  return (
    <main id="inhoud">
      <section className="page-hero">
        <div className="container">
          <p className="kicker rise r1">Algemene voorwaarden</p>
          <h1>
            <span className="line">
              <span className="rise r2">Heldere afspraken,</span>
            </span>
            <span className="line">
              <span className="rise r3">
                voor een <em>zorgeloze dag.</em>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section legal-page">
        <div className="container">
          <Reveal>
            <div className="prose legal-prose">
              <p className="legal-updated">Versie: juli 2026</p>

              <h2>1. Wie ik ben</h2>
              <p>
                Ja! met Anouk, ingeschreven bij de Kamer van Koophandel onder nummer 63510898.
                Bereikbaar via{" "}
                <a className="inline-link" href="mailto:info@jametanouk.nl">
                  info@jametanouk.nl
                </a>{" "}
                en <a className="inline-link" href="tel:+31611429005">06 11 42 90 05</a>.
              </p>

              <h2>2. Toepasselijkheid</h2>
              <p>
                Deze voorwaarden gelden voor alle offertes en overeenkomsten van Ja! met Anouk
                voor huwelijksceremonies, symbolische ceremonies, ceremoniespreken en
                aanverwante diensten. Afwijkingen gelden alleen als ze schriftelijk zijn
                afgesproken.
              </p>

              <h2>3. Offertes en boeking</h2>
              <p>
                Offertes zijn vrijblijvend en 30 dagen geldig. Een boeking komt tot stand
                zodra jullie de offerte schriftelijk (of per e-mail) bevestigen. De datum is
                pas definitief gereserveerd na bevestiging &eacute;n ontvangst van de
                aanbetaling.
              </p>

              <h2>4. Tarieven en betaling</h2>
              <p>
                De tarieven staan in de offerte en zijn inclusief btw, tenzij anders vermeld.
                Na bevestiging betalen jullie een aanbetaling van 25% binnen 14 dagen. Het
                restant betalen jullie uiterlijk 14 dagen voor de ceremonie. Eventuele
                reiskosten staan vooraf in de offerte.
              </p>

              <h2>5. Officieel trouwen</h2>
              <p>
                Voor officieel trouwen moet de gemeente mij benoemen tot trouwambtenaar voor
                &eacute;&eacute;n dag. Trouwen jullie op een locatie buiten het gemeentehuis,
                dan moet die locatie bovendien een offici&euml;le trouwlocatie zijn of kunnen
                worden en moet de gemeente daarvoor toestemming geven. Ik begeleid die
                aanvragen, maar de beslissing ligt bij de gemeente. Blijkt een benoeming niet
                mogelijk, dan kunnen jullie de ceremonie kosteloos omzetten naar een
                symbolische ceremonie of annuleren met volledige teruggave van het betaalde
                bedrag.
              </p>

              <h2>6. Annuleren en verzetten</h2>
              <p>
                Annuleren kan alleen schriftelijk. Tot 6 maanden voor de datum zijn jullie
                alleen de aanbetaling verschuldigd. Bij annulering tussen 6 en 2 maanden voor
                de datum is dat 50% van het totaalbedrag, korter dan 2 maanden 75% en korter
                dan 14 dagen 100%. Verzetten naar een nieuwe, beschikbare datum binnen 12
                maanden kan &eacute;&eacute;n keer kosteloos.
              </p>

              <h2>7. Ziekte en overmacht</h2>
              <p>
                Kan Anouk door ziekte of overmacht niet aanwezig zijn, dan zoeken we eerst
                samen naar een passende vervanger of een nieuwe datum. Lukt dat niet, dan
                krijgen jullie het betaalde bedrag voor de niet-geleverde diensten volledig
                terug.
              </p>

              <h2>8. Culinaire diensten</h2>
              <p>
                Diners en culinaire belevingen worden verzorgd door L&rsquo;Affetto en vallen
                onder de{" "}
                <a
                  className="inline-link"
                  href="https://static.showit.co/file/w3bk1sqzTyWyBUD3EHJv0A/196291/algemene_voorwaarden_voor_l_affetto.pdf"
                  target="_blank"
                  rel="noopener"
                >
                  algemene voorwaarden van L&rsquo;Affetto
                </a>
                .
              </p>

              <h2>9. Ceremonietekst</h2>
              <p>
                De ceremonietekst wordt persoonlijk voor jullie geschreven en is bedoeld voor
                eigen gebruik. Commercieel hergebruik of publicatie door derden mag alleen met
                toestemming.
              </p>

              <h2>10. Aansprakelijkheid</h2>
              <p>
                Mijn aansprakelijkheid is beperkt tot het bedrag van de overeenkomst. Ik ben
                niet aansprakelijk voor indirecte schade of voor beslissingen van gemeenten en
                andere derden. Jullie wettelijke rechten als consument blijven altijd gelden.
              </p>

              <h2>11. Privacy</h2>
              <p>
                Persoonsgegevens verwerk ik volgens de{" "}
                <Link className="inline-link" href="/privacy">
                  privacyverklaring
                </Link>
                .
              </p>

              <h2>12. Klachten en toepasselijk recht</h2>
              <p>
                Zijn jullie ergens niet tevreden over, laat het dan zo snel mogelijk weten;
                dan zoeken we samen een oplossing. Op alle overeenkomsten is Nederlands recht
                van toepassing. Geschillen worden voorgelegd aan de bevoegde Nederlandse
                rechter.
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
