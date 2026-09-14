// ============================================================
// CRIATIVO 2 — "AS 4 PERGUNTAS QUE VOCÊ RESPONDE TODO DIA"
// 6 quadros · 1080x1350 · mesmo design system, agora com figuras
// ============================================================
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  INK, PAPER2, ACC, DEEP, svg, hl, band, txt, cta, page,
  text, burst, spark, emph, arrow,
  site, bubble, plane, addressBar,
} from "./lib.mjs";
import { person, stress } from "./figures.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "pages");
mkdirSync(OUT, { recursive: true });

const T = 6;
const K = (s) => `PRESENÇA DIGITAL <em>·</em> ${s}`;
const inl = (s) => s.replaceAll('style="position:absolute;left:0px;top:0px;z-index:8"', 'style="display:block"');

// seta circular de repetição
const loopArrow = (x, y, r) => `
  <g transform="translate(${x},${y})">
    <path d="M ${r},0 A ${r},${r} 0 1 1 0,${-r}" fill="none" stroke="${INK}" stroke-width="${r * 0.5}" stroke-linecap="round" transform="translate(6,6)"/>
    <path d="M ${r},0 A ${r},${r} 0 1 1 0,${-r}" fill="none" stroke="${ACC}" stroke-width="${r * 0.34}" stroke-linecap="round"/>
    <polygon points="${-r * 0.34},${-r} ${r * 0.34},${-r} 0,${-r * 0.42}" fill="${INK}" transform="translate(6,6)"/>
    <polygon points="${-r * 0.34},${-r} ${r * 0.34},${-r} 0,${-r * 0.42}" fill="${ACC}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  </g>`;

// ------------------------------------------------------------
// 01 — CAPA · o loop começa
// ------------------------------------------------------------
const f01 = page({
  n: 1, total: T,
  kicker: "PRESENÇA DIGITAL",
  body: `
    ${hl(["DE NOVO A", { t: "MESMA", cls: "or" }, { t: "PERGUNTA.", cls: "or" }], { top: 118, size: 112 })}
    ${band("TODO DIA. TODA SEMANA.", { top: 476 })}
    ${svg(`
      ${burst(540, 848, 172, 216, 14, ACC, 7, 6)}
      ${emph(540, 848, 238, 292, [196, 212, 228, 312, 328, 344], 6)}
      ${person(540, 792, 1.02, { hair: "swoop", mood: "tired", pose: "typing", drops: 2 })}
      ${bubble(72, 636, 262, 58, "“Qual o horário?”", { size: 26, rot: -4 })}
      ${bubble(742, 660, 252, 58, "“Onde atendem?”", { side: "right", size: 26, rot: 4, fill: ACC, color: PAPER2 })}
      ${bubble(60, 908, 262, 58, "“Quais serviços?”", { size: 26, rot: 3, fill: ACC, color: PAPER2 })}
      ${bubble(732, 928, 262, 58, "“Como funciona?”", { side: "right", size: 26, rot: -3 })}
      ${spark(160, 792, 18)} ${spark(958, 826, 15)} ${spark(140, 1076, 14, ACC)}
    `)}
    ${txt("VOCÊ VIROU O ATENDIMENTO,<br>O CATÁLOGO E O FAQ.", { top: 1072, size: 38, style: "font-weight:800;letter-spacing:.05em" })}
    ${cta("ARRASTE →", { top: 1176, style: "font-size:29px" })}
  `,
});

// ------------------------------------------------------------
// 02 — A PRIMEIRA PERGUNTA
// ------------------------------------------------------------
const f02 = page({
  n: 2, total: T,
  kicker: K("O LOOP · PERGUNTA 1"),
  body: `
    ${hl([{ t: "“QUAL O", cls: "or" }, { t: "HORÁRIO?”", cls: "or" }], { top: 122, size: 176 })}
    ${band("VOCÊ RESPONDE. DE NOVO.", { top: 508 })}
    ${svg(`
      ${person(238, 828, 1.06, { hair: "curly", mood: "happy", pose: "phoneUp", shirt: PAPER2 })}
      ${person(846, 828, 1.06, { hair: "swoop", mood: "annoyed", pose: "typing", flip: true, drops: 1 })}
      ${bubble(646, 618, 292, 58, "“Das 8 às 18h.”", { side: "right", size: 26, rot: 2, fill: ACC, color: PAPER2 })}
      ${arrow(432, 858, 176, 0, 30, ACC, 6)}
      ${spark(130, 618, 16)} ${spark(966, 1040, 14, ACC)}
    `)}
    ${txt("A resposta é sempre a mesma.<br>O trabalho de digitar, também.", { top: 1088, size: 35, cls: "serifish", style: "font-weight:600" })}
  `,
});

// ------------------------------------------------------------
// 03 — AS OUTRAS TRÊS
// ------------------------------------------------------------
const f03 = page({
  n: 3, total: T,
  kicker: K("O LOOP · PERGUNTAS 2, 3 E 4"),
  body: `
    ${hl(["AÍ VÊM", "AS OUTRAS", { t: "TRÊS.", cls: "or" }], { top: 122, size: 114 })}
    ${band("E NUNCA VÊM SOZINHAS.", { top: 492 })}
    ${svg(`
      ${stress(540, 880, 200, 258, [206, 228, 312, 334], 7)}
      ${person(540, 876, 1.14, { hair: "swoop", mood: "worried", pose: "handsUp", drops: 2 })}
      ${person(120, 706, 0.52, { hair: "curly", mood: "annoyed", bust: false })}
      ${person(960, 702, 0.52, { hair: "bun", mood: "worried", bust: false })}
      ${person(952, 1054, 0.52, { hair: "cap", mood: "annoyed", bust: false })}
      ${bubble(178, 624, 244, 56, "“Onde atendem?”", { size: 25, rot: -4, fill: ACC, color: PAPER2 })}
      ${bubble(664, 620, 250, 56, "“Quais serviços?”", { side: "right", size: 25, rot: 4 })}
      ${bubble(688, 972, 250, 56, "“Como funciona?”", { side: "right", size: 25, rot: -3, fill: ACC, color: PAPER2 })}
      ${spark(146, 1074, 17)} ${spark(112, 902, 13, ACC)}
    `)}
    ${txt("Cada conversa começa do zero.", { top: 1176, size: 34, cls: "serifish", style: "font-weight:600" })}
  `,
});

// ------------------------------------------------------------
// 04 — VOCÊ VIROU O FAQ
// ------------------------------------------------------------
const f04 = page({
  n: 4, total: T,
  kicker: K("O CUSTO"),
  body: `
    ${hl(["VOCÊ VIROU", "O FAQ DA", { t: "SUA EMPRESA.", cls: "or" }], { top: 118, size: 124 })}
    ${band("MESMO TEXTO. OUTRA PESSOA.", { top: 518 })}
    ${svg(`
      ${person(302, 836, 1.12, { hair: "swoop", mood: "tired", pose: "typing", drops: 2 })}
      ${[0, 1, 2].map(i => bubble(576 + i * 16, 628 + i * 122, 386, 78, "“Das 8 às 18h.”",
        { side: "right", size: 30, rot: i % 2 ? 2 : -2, fill: i === 1 ? ACC : PAPER2, color: i === 1 ? PAPER2 : DEEP })).join("")}
      ${loopArrow(786, 1032, 40)}
      ${spark(968, 986, 15)} ${spark(148, 1052, 14, ACC)}
    `)}
    ${txt("O tempo que você gasta repetindo<br>é o tempo que você não está atendendo.", { top: 1090, size: 35, cls: "serifish", style: "font-weight:600" })}
  `,
});

// ------------------------------------------------------------
// 05 — A VIRADA
// ------------------------------------------------------------
const f05 = page({
  n: 5, total: T,
  kicker: K("A VIRADA"),
  body: `
    ${hl(["AÍ VOCÊ", "MANDA", { t: "UM LINK.", cls: "or" }], { top: 118, size: 138 })}
    ${band("UMA VEZ. PARA TODO MUNDO.", { top: 566 })}
    ${svg(`
      ${addressBar(452, 682, 528, 72, "suaempresa.com.br", 33)}
      ${site(556, 796, 404, 348, { rot: 2, scale: 0.78, hero: false, sections: ["SERVIÇOS", "REGIÃO", "PROCESSO", "HORÁRIO", "CONTATO"] })}
      ${person(214, 906, 1.04, { hair: "swoop", mood: "happy", pose: "point" })}
      ${emph(474, 848, 34, 74, [-26, -6, 14], 6)}
      ${spark(996, 664, 17, ACC)} ${spark(128, 1112, 15)}
    `)}
    ${txt("E nele a pessoa encontra tudo, sozinha.", { top: 1190, size: 35, cls: "serifish", style: "font-weight:600" })}
  `,
});

// ------------------------------------------------------------
// 06 — FECHAMENTO
// ------------------------------------------------------------
const f06 = page({
  n: 6, total: T,
  kicker: K("A TESE"),
  body: `
    ${hl(["VOCÊ PARA", "DE REPETIR.", { t: "O SITE", cls: "or" }, { t: "EXPLICA.", cls: "or" }], { top: 112, size: 120 })}
    ${svg(`
      ${person(232, 198, 0.9, { hair: "swoop", mood: "happy", pose: "phoneUp" })}
      ${plane(640, 92, 132, -18)}
      ${emph(672, 154, 96, 126, [150, 170, 190], 5)}
      ${burst(886, 60, 50, 68, 12, PAPER2, 6, 10)}
      ${text(886, 82, "!", 62, { family: "Anton", weight: 400, fill: ACC })}
    `, 1080, 392, 0, 618)}
    ${band("QUER VER COMO FICARIA O SEU?", { top: 1012, size: 38 })}
    ${cta("ME CHAMA NO DIRECT.", { top: 1108, style: `background:${ACC};color:${PAPER2};border-color:${INK};box-shadow:8px 8px 0 ${INK};font-size:40px;font-weight:700;letter-spacing:.14em;padding:12px 48px 14px` })}
    ${txt("SEU PRÓXIMO LINK PODE SER O SEU SITE.", { top: 1212, size: 22, style: "font-family:Oswald;font-weight:600;letter-spacing:.3em" })}
  `,
});

const frames = { "link-01": f01, "link-02": f02, "link-03": f03, "link-04": f04, "link-05": f05, "link-06": f06 };
for (const [k, html] of Object.entries(frames)) writeFileSync(join(OUT, `${k}.html`), inl(html));

const sheet = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>As 4 perguntas</title>
<style>body{margin:0;background:#23272e;padding:24px;font-family:sans-serif;color:#E9E9E1}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.g img{width:100%;display:block;box-shadow:0 10px 40px rgba(0,0,0,.5)}
h1{font-weight:400;letter-spacing:.2em;font-size:14px;text-transform:uppercase;margin:0 0 18px}</style></head>
<body><h1>As 4 perguntas que você responde todo dia · 6 quadros · 1080×1350</h1><div class="g">${Object.keys(frames).map(k => `<img src="../output/${k}.png" alt="${k}">`).join("")}</div></body></html>`;
writeFileSync(join(OUT, "index-link.html"), sheet);
console.log("quadros gerados:", Object.keys(frames).join(", "));
