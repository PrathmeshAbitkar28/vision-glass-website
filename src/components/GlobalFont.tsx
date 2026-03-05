/**
 * GlobalFont.tsx
 * Drop this component once inside your App.tsx or root layout.
 * It loads Outfit from Google Fonts and sets it as the site-wide font.
 *
 * Usage in App.tsx:
 *   import GlobalFont from "@/components/GlobalFont";
 *   ...
 *   <GlobalFont />
 *   <Navbar />
 *   <main>...</main>
 *   <Footer />
 */

const GlobalFont = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    /* ── Apply Outfit everywhere ── */
    html, body, * {
      font-family: 'Outfit', sans-serif !important;
    }

    /* ── Weight utilities ── */
    .font-light    { font-weight: 300; }
    .font-normal   { font-weight: 400; }
    .font-medium   { font-weight: 500; }
    .font-semibold { font-weight: 600; }
    .font-bold     { font-weight: 700; }
    .font-extrabold{ font-weight: 800; }
    .font-black    { font-weight: 900; }

    /* ── Outfit-optimised heading tracking ── */
    h1, h2, h3, h4, h5 {
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    /* ── Body text ── */
    p, li, span, label, input, textarea, select, button {
      letter-spacing: 0;
      line-height: 1.6;
    }

    /* ── Small caps / labels ── */
    .label-caps {
      font-weight: 600;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  `}</style>
);

export default GlobalFont;