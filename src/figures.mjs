// ============================================================
// Figuras humanas em traço de quadrinho vintage
// Mesmo sistema: contorno preto grosso, sombra deslocada, halftone,
// paleta creme / off-white / azul-marinho / azul profundo / preto.
// ============================================================
import { INK, PAPER2, ACC, DEEP } from "./lib.mjs";

const SW = 7;   // contorno
const SH = 10;  // sombra

// ---------- cabeça ----------
const HEAD = "M 0,-68 C 38,-68 60,-44 60,-8 C 60,32 38,62 0,62 C -38,62 -60,32 -60,-8 C -60,-44 -38,-68 0,-68 Z";
const EAR_R = "M 56,-16 C 78,-22 80,12 56,16 Z";
const EAR_L = "M -56,-16 C -78,-22 -80,12 -56,16 Z";
const NECK = "M -19,42 L -19,98 L 19,98 L 19,42 Z";
const TORSO = "M -118,180 C -116,122 -62,94 -30,88 L 30,88 C 62,94 116,122 118,180 Z";

const HAIR = {
  short: "M -63,-8 C -67,-58 -34,-82 0,-82 C 36,-82 69,-58 63,-8 C 56,-36 38,-46 6,-44 C -20,-42 -47,-33 -63,-8 Z",
  swoop: "M -63,-6 C -69,-56 -32,-84 4,-84 C 42,-84 70,-58 62,-12 C 58,-40 44,-52 22,-54 C 34,-40 30,-28 18,-22 C -4,-34 -40,-28 -63,-6 Z",
  curly: "M -64,-6 C -70,-54 -34,-84 0,-84 C 36,-84 70,-54 64,-6 C 54,-30 34,-42 0,-42 C -34,-42 -54,-30 -64,-6 Z",
  bun: "M -63,-8 C -67,-58 -34,-82 0,-82 C 36,-82 69,-58 63,-8 C 56,-36 38,-46 6,-44 C -20,-42 -47,-33 -63,-8 Z",
  long: "M -63,-8 C -67,-58 -34,-82 0,-82 C 36,-82 69,-58 63,-8 C 63,34 68,62 74,86 L 40,86 C 46,50 44,10 38,-18 C 16,-30 -22,-30 -40,-16 C -46,10 -48,50 -42,86 L -76,86 C -70,58 -63,30 -63,-8 Z",
  cap: "M -64,-14 C -68,-60 -32,-82 2,-82 C 40,-82 70,-58 64,-14 Z",
};
const HAIR_EXTRA = {
  curly: [[-44, -44, 24], [-16, -60, 26], [16, -60, 26], [44, -44, 24], [0, -74, 20]],
  bun: [[0, -96, 24]],
};
const CAP_VISOR = "M 22,-20 C 64,-26 94,-18 98,-2 L 26,0 Z";

// ---------- expressões ----------
const brows = (mood) => {
  const m = {
    tired: [[-38, -26, -12, -22], [38, -26, 12, -22]],
    annoyed: [[-38, -32, -12, -20], [38, -32, 12, -20]],
    worried: [[-38, -20, -12, -30], [38, -20, 12, -30]],
    happy: [[-38, -30, -12, -28], [38, -30, 12, -28]],
  }[mood] || [[-38, -26, -12, -22], [38, -26, 12, -22]];
  return m.map(([x1, y1, x2, y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`).join("");
};

const mouth = (mood) => ({
  tired: `<line x1="-17" y1="28" x2="17" y2="28" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
  annoyed: `<path d="M -18,32 C -7,23 7,23 18,32" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
  worried: `<ellipse cx="0" cy="30" rx="15" ry="12" fill="${INK}"/>`,
  happy: `<path d="M -20,20 C -8,38 8,38 20,20" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
}[mood] || `<line x1="-17" y1="28" x2="17" y2="28" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`);

const eyes = (mood) => {
  if (mood === "tired") {
    return `<path d="M -32,-4 C -26,-10 -18,-10 -12,-4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
            <path d="M 12,-4 C 18,-10 26,-10 32,-4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
  }
  const r = mood === "worried" ? 9 : 7;
  return `<circle cx="-22" cy="-4" r="${r}" fill="${INK}"/><circle cx="22" cy="-4" r="${r}" fill="${INK}"/>`;
};

const sweat = (n = 1) => {
  const pos = [[64, -44, 1], [-66, -38, 0.85], [70, -12, 0.7]];
  return pos.slice(0, n).map(([x, y, k]) =>
    `<g transform="translate(${x},${y}) scale(${k})">
      <path d="M 0,-20 C 9,-6 14,2 14,8 A 14,14 0 0 1 -14,8 C -14,2 -9,-6 0,-20 Z" fill="${PAPER2}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    </g>`).join("");
};

// ---------- celular na mão ----------
const handPhone = (x, y, w, h, rot = 0, lit = true) => `
  <g transform="translate(${x},${y}) rotate(${rot})">
    <rect x="${-w / 2 + SH * 0.7}" y="${-h / 2 + SH * 0.7}" width="${w}" height="${h}" rx="${w * 0.16}" fill="${INK}"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.16}" fill="${DEEP}" stroke="${INK}" stroke-width="${SW}"/>
    <rect x="${-w / 2 + w * 0.13}" y="${-h / 2 + h * 0.12}" width="${w * 0.74}" height="${h * 0.74}" rx="${w * 0.07}" fill="${lit ? PAPER2 : DEEP}" stroke="${INK}" stroke-width="4"/>
    ${lit ? [0, 1, 2].map(i => `<rect x="${-w / 2 + w * 0.2}" y="${-h / 2 + h * 0.24 + i * h * 0.18}" width="${w * (i === 2 ? 0.32 : 0.58)}" height="${h * 0.07}" rx="${h * 0.035}" fill="${i === 1 ? ACC : INK}"/>`).join("") : ""}
  </g>`;

// ============================================================
// person(x, y, s, opts)
//   hair: short | swoop | curly | bun | long | cap
//   mood: tired | annoyed | worried | happy
//   pose: typing | facepalm | phoneUp | point | calm
// ============================================================
export const person = (x, y, s = 1, o = {}) => {
  const {
    hair = "short", mood = "tired", pose = "typing",
    shirt = ACC, bust = true, flip = false, rot = 0,
    shade = true, drops = 0,
  } = o;

  // silhueta: [d, fill] — desenhada 2x (sombra + traço)
  const sil = [];
  if (bust) sil.push([NECK, PAPER2], [TORSO, shirt]);
  sil.push([EAR_L, PAPER2], [EAR_R, PAPER2], [HEAD, PAPER2]);
  if (HAIR[hair]) sil.push([HAIR[hair], INK]);
  if (hair === "cap") sil.push([CAP_VISOR, ACC]);

  // braços: [d, larguraInterna]
  const arms = [];
  let held = "";
  if (bust) {
    if (pose === "typing") {
      arms.push(["M -96,156 C -102,196 -64,208 -36,188", 26], ["M 96,156 C 102,196 64,208 36,188", 26]);
      held = handPhone(0, 150, 78, 122, 0) +
        `<circle cx="-34" cy="186" r="19" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}"/>
         <circle cx="34" cy="186" r="19" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}"/>`;
    } else if (pose === "handsUp") {
      arms.push(["M -100,158 C -146,112 -146,42 -122,2", 26], ["M 100,158 C 146,112 146,42 122,2", 26]);
      const palm = (px, py, f) => `<g transform="translate(${px},${py}) scale(${f},1)">
        <path d="M 0,-30 C 18,-30 30,-14 30,4 C 30,22 16,32 0,32 C -16,32 -30,22 -30,4 C -30,-14 -18,-30 0,-30 Z" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
        <line x1="-12" y1="-22" x2="-12" y2="10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <line x1="4" y1="-26" x2="4" y2="10" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <line x1="18" y1="-20" x2="18" y2="8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      </g>`;
      held = palm(-124, -8, -1) + palm(124, -8, 1);
    } else if (pose === "phoneUp") {
      arms.push(["M 98,158 C 140,126 146,64 130,22", 26]);
      held = handPhone(126, -46, 76, 116, 8) +
        `<circle cx="128" cy="18" r="20" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}"/>`;
    } else if (pose === "point") {
      arms.push(["M 98,156 C 146,142 172,110 186,74", 26]);
      held = `<path d="M 186,88 C 208,82 232,60 240,44 C 244,34 236,26 228,32 C 218,40 206,50 196,54 C 186,58 180,70 186,88 Z" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
    }
  }

  const paint = (shadowPass) => {
    const sh = shadowPass ? `transform="translate(${SH},${SH})"` : "";
    const fill = (f) => (shadowPass ? INK : f);
    let out = `<g ${sh}>`;
    // braços por trás do tronco quando descem, por cima quando sobem
    out += arms.map(([d, w]) =>
      `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + SW * 2}" stroke-linecap="round"/>` +
      (shadowPass ? "" : `<path d="${d}" fill="none" stroke="${PAPER2}" stroke-width="${w}" stroke-linecap="round"/>`)).join("");
    out += sil.map(([d, f]) =>
      `<path d="${d}" fill="${fill(f)}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`).join("");
    if (HAIR_EXTRA[hair]) out += HAIR_EXTRA[hair].map(([cx, cy, r]) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill(INK)}" stroke="${INK}" stroke-width="${SW}"/>`).join("");
    out += `</g>`;
    return out;
  };

  const shading = shade
    ? `<path d="${HEAD}" fill="url(#ht)" opacity=".22"/>` +
      (bust ? `<path d="${TORSO}" fill="url(#ht)" opacity=".18"/>` : "")
    : "";

  return `<g transform="translate(${x},${y}) scale(${flip ? -s : s},${s}) rotate(${rot})">
    ${paint(true)}
    ${paint(false)}
    ${shading}
    ${eyes(mood)}
    ${brows(mood)}
    ${mouth(mood)}
    ${drops ? sweat(drops) : ""}
    ${bust ? `<path d="M -30,90 L 0,122 L 30,90" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>` : ""}
    ${held}
  </g>`;
};

// ---------- linhas de agonia / repetição ----------
export const stress = (x, y, r0, r1, angles, sw = 7) =>
  angles.map(a => {
    const rad = (a * Math.PI) / 180;
    return `<line x1="${x + Math.cos(rad) * r0}" y1="${y + Math.sin(rad) * r0}" x2="${x + Math.cos(rad) * r1}" y2="${y + Math.sin(rad) * r1}" stroke="${INK}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }).join("");
