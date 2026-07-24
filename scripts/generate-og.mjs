import sharp from "sharp";

const W = 1200;
const H = 630;

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#191210" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="#191210" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#191210" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="#191210" stop-opacity="0"/>
      <stop offset="1" stop-color="#191210" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#b)"/>
  <text x="72" y="110" font-family="Georgia, serif" font-size="34" fill="#f4ede8">Ja! <tspan font-style="italic" fill="#ee9384">met Anouk</tspan></text>
  <text x="72" y="420" font-family="Georgia, serif" font-size="88" fill="#f4ede8">Liefdesverhaal,</text>
  <text x="72" y="516" font-family="Georgia, serif" font-style="italic" font-size="88" fill="#ee9384">Oprecht Verteld.</text>
  <text x="74" y="580" font-family="Arial, sans-serif" font-size="20" letter-spacing="6" fill="#b3a49b">TROUWAMBTENAAR &#183; CEREMONIESPREKER &#183; JAMETANOUK.NL</text>
</svg>`;

const base = await sharp("public/images/trouwjurk.jpg")
  .resize(W, H, { fit: "cover", position: "attention" })
  .modulate({ saturation: 0.82, brightness: 0.9 })
  .toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 84 })
  .toFile("public/og.jpg");

console.log("done", (await sharp("public/og.jpg").metadata()).width);
