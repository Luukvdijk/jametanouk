import Image from "next/image";

export default function Home() {
  return (
    <div className="scene">
      <div className="photo">
        <Image
          src="/images/trouwjurk.jpg"
          alt="Trouwjurk hangend aan een muur met klimop"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 62vw"
        />
      </div>

      <div className="ghost" aria-hidden="true">
        Ja!
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="frame">
        <header>
          <div className="brand">
            Ja! <em>met Anouk</em>
          </div>
          <div className="badge">Binnenkort</div>
        </header>

        <main>
          <p className="kicker">Liefdesverhaal, oprecht verteld</p>
          <h1>
            <span className="line">
              <span>Binnenkort</span>
            </span>
            <span className="line">
              <span>
                zeggen we <em>ja.</em>
              </span>
            </span>
          </h1>
          <blockquote className="quote">
            &ldquo;Ik verkoop geen &lsquo;dienst&rsquo;, ik verkoop <em>rust</em>. Als Anouk
            erbij is, komt het goed.&rdquo;
          </blockquote>
          <div className="rule" aria-hidden="true">
            <span className="l" />
            <span className="d" />
          </div>
          <div className="contact">
            <span className="ask">De website is in de maak. Alvast kennismaken?</span>
            <a href="mailto:info@jametanouk.nl">info@jametanouk.nl</a>
          </div>
        </main>

        <footer>
          <span>&copy; 2026 Ja! met Anouk</span>
          <span>Trouwambtenaar (BABS) &middot; Ceremonies op maat</span>
        </footer>
      </div>
    </div>
  );
}
