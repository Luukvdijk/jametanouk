import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Over mij",
  description:
    "Chef-kok, event-regisseuse en trouwambtenaar (BABS). Maak kennis met Anouk: warm, betrokken en oprecht.",
  alternates: { canonical: "/over-mij" },
};

export default function OverMij() {
  return (
    <main id="inhoud">
      <section className="page-hero">
        <div className="ghost-letter" aria-hidden="true">
          A
        </div>
        <div className="container">
          <p className="kicker rise r1">Over mij</p>
          <h1>
            <span className="line">
              <span className="rise r2">Een bruiloft draait niet om</span>
            </span>
            <span className="line">
              <span className="rise r3">
                een draaiboek. <em>Om jullie.</em>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section about-page">
        <div className="container about-page-grid">
          <Reveal className="about-page-media">
            <Image
              src="/images/anouk.jpg"
              alt="Anouk in koksbuis, lachend aan het werk in de keuken"
              width={900}
              height={1200}
              sizes="(max-width: 900px) 86vw, 38vw"
            />
          </Reveal>

          <div className="prose">
            <Reveal>
              <p>
                Al jarenlang ben ik als chef-kok en event-regisseuse aanwezig op de mooiste dagen
                uit het leven van mensen. Met mijn bedrijf{" "}
                <a href="https://l-affetto.nl/" target="_blank" rel="noopener" className="inline-link">
                  L&rsquo;Affetto
                </a>{" "}
                verzorg ik bijzondere diners en bruiloften, waardoor ik van dichtbij heb
                meegemaakt wat een trouwdag &eacute;cht bijzonder maakt. Ik weet hoe belangrijk de sfeer is, hoe spannend de
                eerste momenten kunnen zijn en hoeveel liefde er schuilt in de kleine details.
              </p>
            </Reveal>
            <Reveal>
              <p className="pull">
                Toch ontbrak er altijd &eacute;&eacute;n onderdeel: <em>het JAwoord.</em>
              </p>
            </Reveal>
            <Reveal>
              <p>
                Daarom heb ik ervoor gekozen om ook zelfstandig trouwambtenaar (BABS) te
                worden. Zo mag ik
                niet alleen bijdragen aan de beleving van jullie dag, maar ook aan het meest
                betekenisvolle moment ervan.
              </p>
              <p>
                Als trouwambtenaar leer ik jullie graag &eacute;cht kennen. Geen standaard
                verhaal, geen ceremonie uit een boekje, maar een persoonlijk verhaal waarin
                jullie jezelf herkennen. Met humor waar het kan, emotie waar het mag en altijd op
                een manier die bij jullie past.
              </p>
              <p>
                Mensen omschrijven mij als warm, betrokken en oprecht. Ik luister goed, voel snel
                aan wat iemand nodig heeft en weet een ontspannen sfeer te cre&euml;ren. Daardoor
                voelen niet alleen jullie je op je gemak, maar ook jullie familie en vrienden.
              </p>
              <p>
                En misschien maakt dat mij juist n&eacute;t even anders. Want naast het voltrekken
                van jullie huwelijk kan ik, als jullie dat leuk vinden, later op de dag gewoon
                weer mijn koksbuis aantrekken en een bijzonder diner verzorgen voor jullie en
                jullie gasten. Zo ben ik er niet alleen voor het mooiste &lsquo;ja&rsquo;, maar
                draag ik ook bij aan een onvergetelijke avond.
              </p>
              <p>
                Ik kijk ernaar uit om jullie verhaal te leren kennen en er samen een ceremonie
                van te maken die nog jarenlang wordt herinnerd.
              </p>
            </Reveal>
            <Reveal>
              <p className="signature" aria-hidden="true">
                Anouk
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <Reveal>
            <h2>
              Klaar voor jullie <em>ja?</em>
            </h2>
            <Link href="/contact" className="btn">
              Plan een kennismaking
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
