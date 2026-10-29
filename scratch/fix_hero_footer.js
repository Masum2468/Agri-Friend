const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../public/css/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// ============ 1. MAKE BASE FOOTER SMALLER ============
css = css.replace(
`/* Footer styling */
footer {
  background: var(--primary);
  color: var(--text-white);
  padding: 60px 8% 30px 8%;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  text-align: left;
  gap: 40px;
  margin-bottom: 40px;
  width: 100%;
  box-sizing: border-box;
}

.footer-brand {
  width: 100%;
  box-sizing: border-box;
}

.footer-brand h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 15px;
  color: var(--accent);
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 380px;
}

.footer-links {
  width: 100%;
  box-sizing: border-box;
}

.footer-links h4 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: var(--accent);
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
}

.footer-links ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.footer-links ul li a:hover {
  color: var(--accent);
  padding-left: 5px;
}

.copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  word-break: break-word;
}`,

`/* Footer styling — Compact */
footer {
  background: var(--primary);
  color: var(--text-white);
  padding: 32px 6% 18px 6%;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  text-align: left;
  gap: 24px;
  margin-bottom: 18px;
  width: 100%;
  box-sizing: border-box;
}

.footer-brand {
  width: 100%;
  box-sizing: border-box;
}

.footer-brand h3 {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--accent);
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  line-height: 1.55;
  max-width: 380px;
}

.footer-links {
  width: 100%;
  box-sizing: border-box;
}

.footer-links h4 {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: var(--accent);
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
}

.footer-links ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.footer-links ul li a:hover {
  color: var(--accent);
  padding-left: 4px;
}

.copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
  word-break: break-word;
}`
);

// ============ 2. FIX LAPTOP FOOTER (1025-1366) ============
css = css.replace(
`  /* Footer - Laptop */
  footer {
    padding: 50px 5% 25px 5%;
  }

  .footer-content {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 30px;
  }`,

`  /* Footer - Laptop */
  footer {
    padding: 28px 5% 16px 5%;
  }

  .footer-content {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 22px;
    margin-bottom: 14px;
  }`
);

// ============ 3. FIX IPAD/TABLET FOOTER (max-width 1024) ============
css = css.replace(
`  /* Footer - iPad/Tablet */
  footer {
    padding: 45px 5% 25px 5%;
  }

  .footer-content {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 25px;
    margin-bottom: 30px;
  }

  .footer-brand p {
    max-width: 100%;
    font-size: 0.9rem;
  }

  .copyright {
    font-size: 0.85rem;
  }`,

`  /* Footer - iPad/Tablet */
  footer {
    padding: 24px 4% 14px 4%;
  }

  .footer-content {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 18px;
    margin-bottom: 14px;
  }

  .footer-brand p {
    max-width: 100%;
    font-size: 0.8rem;
  }

  .copyright {
    font-size: 0.72rem;
  }`
);

// ============ 4. FIX 900px NAV TRIGGER FOOTER ============
css = css.replace(
`  /* Footer - Mobile Nav Trigger (max-width: 900px) */
  footer {
    padding: 36px 5% 18px 5%;
    text-align: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 18px;
    margin-bottom: 24px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand p {
    max-width: 480px;
    font-size: 0.9rem;
    text-align: center;
  }`,

`  /* Footer - Mobile Nav Trigger (max-width: 900px) */
  footer {
    padding: 20px 4% 12px 4%;
    text-align: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand p {
    max-width: 480px;
    font-size: 0.78rem;
    text-align: center;
  }`
);

css = css.replace(
`  .footer-links ul li a {
    font-size: 0.88rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.82rem;
    padding-top: 16px;
  }
}`,

`  .footer-links ul li a {
    font-size: 0.78rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.68rem;
    padding-top: 10px;
  }
}`
);

// ============ 5. FIX MOBILE 767px — HERO + FOOTER ============
css = css.replace(
`  /* Footer - Mobile (max-width: 767px) */
  footer {
    padding: 28px 12px 16px 12px;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 1.35rem;
    margin-bottom: 8px;
  }

  .footer-brand p {
    font-size: 0.82rem;
    line-height: 1.55;
    max-width: 100%;
    text-align: center;
  }`,

`  /* Footer - Mobile (max-width: 767px) */
  footer {
    padding: 16px 12px 10px 12px;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }

  .footer-brand p {
    font-size: 0.72rem;
    line-height: 1.45;
    max-width: 100%;
    text-align: center;
  }`
);

css = css.replace(
`  .footer-links h4 {
    font-size: 0.92rem;
    margin-bottom: 10px;
  }

  /* প্রতিটার নিচের list items row-এ */
  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 4px 10px;
  }

  .footer-links ul li a {
    font-size: 0.82rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.74rem;
    padding-top: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.55);
    word-break: break-word;
    hyphens: auto;
  }

} /* end @media (max-width: 767px) */`,

`  .footer-links h4 {
    font-size: 0.82rem;
    margin-bottom: 5px;
  }

  /* প্রতিটার নিচের list items row-এ */
  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2px 8px;
  }

  .footer-links ul li a {
    font-size: 0.72rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.62rem;
    padding-top: 8px;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.5);
    word-break: break-word;
    hyphens: auto;
  }

} /* end @media (max-width: 767px) */`
);

// ============ 6. FIX 480px — HERO + FOOTER ============
css = css.replace(
`  .hero-content h1 {
    font-size: 1.45rem;
    line-height: 1.25;
    margin-bottom: 12px;
  }

  .hero-actions .btn {
    padding: 9px 12px;
    font-size: 0.82rem;
  }`,

`  .hero {
    min-height: 48vh;
    padding: 24px 12px 28px 12px;
    background-position: 50% center;
  }

  .hero-content h1 {
    font-size: 1.35rem;
    line-height: 1.22;
    margin-bottom: 10px;
  }

  .hero-actions .btn {
    padding: 8px 10px;
    font-size: 0.8rem;
  }`
);

css = css.replace(
`  /* Footer - Small Phone (max-width: 480px) */
  footer {
    padding: 22px 10px 14px 10px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }

  .footer-brand p {
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-links h4 {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 8px;
  }

  .footer-links ul li a {
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.7rem;
    padding-top: 12px;
    line-height: 1.55;
  }`,

`  /* Footer - Small Phone (max-width: 480px) */
  footer {
    padding: 14px 8px 8px 8px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 6px;
    margin-bottom: 6px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 1rem;
    margin-bottom: 3px;
  }

  .footer-brand p {
    font-size: 0.68rem;
    line-height: 1.4;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-links h4 {
    font-size: 0.78rem;
    margin-bottom: 4px;
  }

  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2px 6px;
  }

  .footer-links ul li a {
    font-size: 0.68rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.6rem;
    padding-top: 6px;
    line-height: 1.4;
  }`
);

// ============ 7. FIX 360px — HERO + FOOTER ============
css = css.replace(
`@media (max-width: 360px) {
  .hero-content h1 {
    font-size: 1.3rem;
  }

  .hero-actions .btn {
    padding: 8px 10px;
    font-size: 0.78rem;
  }

  /* Footer - Tiny Phone (max-width: 360px) */
  footer {
    padding: 18px 8px 12px 8px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 14px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  .footer-brand p {
    font-size: 0.73rem;
    line-height: 1.45;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-links h4 {
    font-size: 0.8rem;
    margin-bottom: 7px;
  }

  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3px 6px;
  }

  .footer-links ul li a {
    font-size: 0.7rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.65rem;
    padding-top: 10px;
    line-height: 1.5;
  }
}`,

`@media (max-width: 360px) {
  .hero {
    min-height: 44vh;
    padding: 20px 10px 24px 10px;
    background-position: 48% center;
  }

  .hero-content h1 {
    font-size: 1.2rem;
    line-height: 1.2;
  }

  .hero-actions .btn {
    padding: 7px 8px;
    font-size: 0.75rem;
  }

  /* Footer - Tiny Phone (max-width: 360px) */
  footer {
    padding: 10px 6px 6px 6px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 4px;
    margin-bottom: 4px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand h3 {
    font-size: 0.92rem;
    margin-bottom: 2px;
  }

  .footer-brand p {
    font-size: 0.62rem;
    line-height: 1.35;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-links h4 {
    font-size: 0.72rem;
    margin-bottom: 3px;
  }

  .footer-links ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2px 4px;
  }

  .footer-links ul li a {
    font-size: 0.62rem;
    white-space: nowrap;
  }

  .copyright {
    font-size: 0.55rem;
    padding-top: 5px;
    line-height: 1.35;
  }
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('All hero + footer media queries updated!');
console.log('File size:', css.length);
