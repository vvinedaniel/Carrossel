// ============================================================
// Gera pages/01.html … 08.html a partir do design system
// ============================================================
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  INK, PAPER, PAPER2, OR, ACC, DEEP, svg, hl, band, txt, finalPhrase, cta, page,
  rect, shadowRect, circle, line, text, tlines, burst, spark, emph, arrow, sign,
  phone, site, bubble, magnifier, stopwatch, plane, addressBar, searchBox, badge,
} from "./lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "pages");
mkdirSync(OUT, { recursive: true });

const K = (s) => `PRESENÇA DIGITAL <em>·</em> ${s}`;

// ------------------------------------------------------------
// PÁGINA 01 — CAPA
// ------------------------------------------------------------
const p01 = page({
  n: 1,
  kicker: "PRESENÇA DIGITAL",
  body: `
    ${hl(["INSTAGRAM", { t: "OU SITE?", cls: "or" }], { top: 126, size: 178 })}
    ${band("NÃO É UMA DISPUTA.", { top: 486 })}
    ${svg(`
      ${burst(540, 795, 222, 282, 20, OR, 7, 4)}
      ${emph(540, 795, 310, 370, [200, 215, 230, 320, 335, 350], 6)}
      ${phone(240, 580, 250, 440, { rot: -8 })}
      ${site(555, 610, 330, 390, { rot: 5 })}
      ${sign(205, 590, "CONTEÚDO", -8, 30, PAPER2)}
      ${sign(870, 596, "ORGANIZAÇÃO", 6, 30, ACC, PAPER2)}
      ${sign(892, 1030, "BUSCA", -5, 30, PAPER2)}
      ${sign(230, 1046, "CONTATO", 6, 30, ACC, PAPER2)}
      ${spark(150, 720, 22)} ${spark(940, 780, 18)} ${spark(560, 560, 16, OR)} ${spark(120, 900, 12)}
    `)}
    ${txt("SEU PERFIL APRESENTA.<br>O SITE EXPLICA.", { top: 1090, size: 39, style: "font-weight:800;letter-spacing:.06em" })}
    ${cta("ARRASTE PARA ENTENDER →", { top: 1188 })}
  `,
});

// ------------------------------------------------------------
// PÁGINA 02 — A TRÉGUA
// ------------------------------------------------------------
const p02 = page({
  n: 2,
  kicker: K("ATO 1 · A TRÉGUA"),
  body: `
    ${hl([{ t: "SEU PERFIL", size: 150 }, { t: "FAZ BEM O QUE", size: 118 }, { t: "FOI FEITO PRA FAZER.", size: 92, cls: "or" }], { top: 122, size: 150 })}
    ${txt("Ele mostra seu trabalho, em ordem de data,<br>para quem já chegou até você.", { top: 490, size: 34, cls: "serifish", style: "font-weight:600" })}
    ${svg(`
      ${burst(470, 810, 205, 256, 16, OR, 7, 8)}
      ${emph(470, 810, 280, 335, [195, 210, 225], 6)}
      ${phone(335, 592, 275, 440, { rot: -4 })}
      ${sign(168, 632, "PUBLICAÇÕES", -6, 28, PAPER2)}
      ${sign(160, 748, "PORTFÓLIO", 4, 28, ACC, PAPER2)}
      ${sign(168, 864, "BASTIDORES", -6, 28, PAPER2)}
      ${sign(806, 626, "CONTEÚDO", 6, 28, ACC, PAPER2)}
      ${sign(816, 722, "INTERAÇÃO", -5, 28, PAPER2)}
      ${site(690, 782, 250, 225, { rot: 6, scale: 0.72, url: "seusite.com.br" })}
      ${spark(690, 600, 16, OR)} ${spark(140, 960, 16)} ${spark(965, 890, 14)}
    `)}
    ${band("O PROBLEMA É QUERER<br>QUE ELE FAÇA O PAPEL DO SITE.", { top: 1048, size: 34 })}
    ${txt("Cada um tem uma função.", { top: 1180, size: 32, cls: "serifish" })}
  `,
});

// ------------------------------------------------------------
// PÁGINAS 03–06 — SISTEMA DE COMPARAÇÃO
// ------------------------------------------------------------
const compare = ({ n, kicker, num, headline, hsize, hstyle = "", bandText, hoje, comSite, capHoje, capSite, final, extra = "", vsY = 680 }) => page({
  n,
  kicker,
  body: `
    ${svg(badge(90, 90, 64, num, 90), 190, 190, 30, 78, "", 11)}
    ${hl(headline, { top: 128, size: hsize, style: hstyle })}
    ${band(bandText, { top: 396, size: 38 })}
    <div class="cmp" style="top:522px">
      <div class="panel hoje"><span class="tab">Hoje</span>${svg(hoje, 418, 330, 0, 0, "inline")}<div class="cap">${capHoje}</div></div>
      <div class="panel site"><span class="tab">Com site</span>${svg(comSite, 418, 330, 0, 0, "inline")}<div class="cap">${capSite}</div></div>
    </div>
    ${svg(arrow(0, 44, 134, 0, 40), 160, 88, 462, vsY - 4, "", 14)}
    ${final}
    ${extra}
  `,
});

// helper: svg inline dentro do painel (não absoluto)
const inl = (s) => s.replaceAll('style="position:absolute;left:0px;top:0px;z-index:8"', 'style="display:block"');

// --- 03 ENDEREÇO ---
const p03 = compare({
  n: 3,
  kicker: K("FUNÇÃO 1 DE 4"),
  num: "1",
  headline: ["O ENDEREÇO", { t: "É SEU.", cls: "or" }],
  hsize: 128,
  bandText: "TENHA UM ENDEREÇO PRÓPRIO PARA SUA MARCA",
  hoje: `
    ${phone(122, 18, 172, 296, { rot: -4 })}
    ${sign(330, 262, "PERFIL", -8, 26, ACC, PAPER2)}
    ${spark(70, 60, 14)} ${spark(370, 70, 12, OR)}
  `,
  comSite: `
    ${addressBar(18, 30, 384, 66, "suaempresa.com.br", 32)}
    ${site(52, 128, 312, 190, { scale: 0.7, url: "suaempresa.com.br" })}
    ${sign(350, 292, "ENDEREÇO", 6, 24, OR, PAPER2)}
    ${spark(390, 20, 14, OR)}
  `,
  capHoje: "Seu conteúdo principal depende<br>de uma plataforma de terceiros.",
  capSite: "Você ganha um endereço próprio<br>para divulgar.",
  final: finalPhrase(`INSTAGRAM É PERFIL.<br><span class="or">SITE É ENDEREÇO.</span>`, { top: 1030, size: 64 }),
});

// --- 04 ORGANIZAÇÃO ---
const feedCards = () => {
  let s = "";
  const labels = ["HOJE", "ONTEM", "SEMANA PASSADA", "MÊS PASSADO"];
  for (let i = 0; i < 4; i++) {
    const x = 40 + i * 14, y = 14 + i * 76;
    s += shadowRect(x, y, 300, 66, i % 2 ? "url(#ht)" : PAPER2, 4, 5, 7, 7);
    if (i % 2) s += `<rect x="${x + 3}" y="${y + 3}" width="294" height="60" fill="${PAPER2}"/><rect x="${x + 3}" y="${y + 3}" width="294" height="60" fill="url(#ht)" opacity=".3"/>`;
    s += rect(x + 12, y + 12, 42, 42, i % 3 === 0 ? OR : PAPER2, 3, 4);
    if (i % 3) s += `<rect x="${x + 15}" y="${y + 15}" width="36" height="36" fill="url(#ht)" opacity=".4"/>`;
    s += tlines(x + 68, y + 24, 110, 2, 20, 6, INK, [1, 0.65]);
    s += text(x + 288, y + 42, labels[i], 16, { anchor: "end", ls: ".1em" });
  }
  s += arrow(392, 40, 240, 90, 22, OR, 6);
  return s;
};
const p04 = compare({
  n: 4,
  kicker: K("FUNÇÃO 2 DE 4"),
  num: "2",
  headline: ["O SITE", { t: "ORGANIZA.", cls: "or" }],
  hsize: 128,
  bandText: "INFORMAÇÃO NO LUGAR CERTO.",
  hoje: feedCards(),
  comSite: `
    ${site(24, 10, 372, 306, { scale: 0.8, hero: false, sections: ["SERVIÇOS", "REGIÕES", "COMO FUNCIONA", "CONTATO"] })}
    ${spark(400, 40, 14, OR)}
  `,
  capHoje: "No feed, o conteúdo acompanha<br>a ordem das publicações.",
  capSite: "Serviços, regiões, processo<br>e contato ficam organizados<br>por assunto.",
  final: finalPhrase(`MENOS ROLAGEM.<br><span class="or">MAIS CLAREZA.</span>`, { top: 1030, size: 64 }),
});

// --- 05 BUSCA ---
const p05 = compare({
  n: 5,
  kicker: K("FUNÇÃO 3 DE 4"),
  num: "3",
  headline: ["O SITE ENTRA", { t: "NO JOGO DA BUSCA.", cls: "or" }],
  hsize: 106,
  hstyle: "line-height:1.08",
  bandText: "MAIS UMA PORTA PARA SER ENCONTRADO.",
  hoje: `
    ${phone(190, 26, 150, 262, { rot: 6, feed: false, question: true })}
    <path d="M 40 80 C 100 80, 130 120, 190 130" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="14 12" stroke-linecap="round"/>
    <path d="M 30 300 C 90 290, 110 220, 190 210" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="14 12" stroke-linecap="round"/>
    <path d="M 60 180 C 110 180, 140 170, 188 170" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="14 12" stroke-linecap="round"/>
    ${sign(78, 62, "INDICAÇÃO", -8, 20, PAPER2)}
    ${sign(66, 176, "ANÚNCIO", 4, 20, PAPER2)}
    ${sign(76, 300, "BOCA A BOCA", -5, 20, PAPER2)}
  `,
  comSite: `
    ${searchBox(20, 22, 378, 58, "seu serviço + sua cidade", 24)}
    ${[0, 1, 2].map(i => {
      const y = 112 + i * 70, hi = i === 1;
      return shadowRect(24, y, 370, 56, hi ? PAPER2 : PAPER2, 4, hi ? 6 : 4, 6, 6) +
        (hi ? rect(24, y, 370, 56, "none", 4, 6) : "") +
        rect(38, y + 12, 32, 32, hi ? OR : PAPER2, 3, 4) +
        (hi ? text(84, y + 36, "suaempresa.com.br", 22, { anchor: "start", family: "Barlow Condensed", weight: 800, ls: "0" })
            : tlines(84, y + 22, 260, 2, 16, 6, INK, [1, 0.6]));
    }).join("")}
  `,
  capHoje: "Quem ainda não conhece<br>sua empresa precisa chegar<br>até você por outros caminhos.",
  capSite: "Páginas do seu site podem ser<br>rastreadas e indexadas<br>pelos buscadores.",
  final: band("TER SITE NÃO GARANTE POSIÇÃO.", { top: 1040, cls: "center ink flat", size: 40 }) +
    txt("Ele cria páginas que <i>podem</i> participar da busca.", { top: 1132, size: 32, cls: "serifish", style: `font-weight:600;color:${DEEP}` }),
  extra: svg(magnifier(96, 96, 72, 32), 230, 230, 776, 596, "", 15),
});

// --- 06 O LINK ---
const p06 = compare({
  n: 6,
  kicker: K("FUNÇÃO 4 DE 4"),
  num: "4",
  headline: ["AGORA VOCÊ", { t: "TEM UM LINK.", cls: "or" }],
  hsize: 128,
  bandText: "PARE DE EXPLICAR TUDO DO ZERO.",
  hoje: `
    ${bubble(22, 34, 270, 50, "“Qual o horário?”", { side: "left", size: 26, rot: -1 })}
    ${bubble(120, 104, 280, 50, "“Onde vocês atendem?”", { side: "right", size: 26, rot: 1, fill: ACC, color: PAPER2 })}
    ${bubble(22, 174, 290, 50, "“Quais serviços fazem?”", { side: "left", size: 26, rot: -1 })}
    ${bubble(140, 244, 258, 50, "“Como funciona?”", { side: "right", size: 26, rot: 1, fill: ACC, color: PAPER2 })}
  `,
  comSite: `
    ${addressBar(30, 14, 360, 54, "suaempresa.com.br", 26)}
    ${site(40, 84, 338, 240, { scale: 0.62, hero: false, sections: ["SERVIÇOS", "REGIÃO", "PROCESSO", "HORÁRIO", "CONTATO"] })}
    ${spark(396, 92, 14, OR)}
  `,
  capHoje: "As mesmas perguntas,<br>uma conversa de cada vez.",
  capSite: "Você manda um link.<br>E nele a pessoa encontra tudo.",
  final: finalPhrase(`VOCÊ PARA DE REPETIR.<br><span class="or">O SITE COMEÇA A EXPLICAR.</span>`, { top: 1030, size: 60 }),
});

// ------------------------------------------------------------
// PÁGINA 07 — NÃO ACREDITE EM MIM
// ------------------------------------------------------------
const testRow = (y, n, label, body, icon) => `
  <div class="test" style="position:absolute;left:84px;right:96px;top:${y}px;height:184px;z-index:10">
    ${svg(badge(64, 92, 56, n, 80), 140, 184, 0, 0)}
    <div style="position:absolute;left:146px;top:16px;width:520px">
      <div style="display:inline-block;background:${OR};color:${PAPER2};font-family:Oswald;font-weight:700;font-size:27px;letter-spacing:.14em;padding:3px 16px 4px;border:4px solid ${INK};box-shadow:5px 5px 0 ${INK};transform:rotate(-1.5deg)">${label}</div>
      <div style="font-family:'Barlow Condensed';font-weight:600;font-size:30px;line-height:1.1;margin-top:12px;color:${DEEP}">${body}</div>
    </div>
    ${icon}
  </div>`;

const p07 = page({
  n: 7,
  kicker: K("ATO 3 · O TESTE"),
  body: `
    ${hl(["NÃO ACREDITE", "EM MIM.", { t: "TESTE.", cls: "or" }], { top: 118, size: 90 })}
    ${band("3 TESTES. 30 SEGUNDOS.", { top: 392, size: 38 })}
    <div style="position:absolute;left:84px;right:96px;top:664px;height:3px;background:${INK};z-index:9"></div>
    <div style="position:absolute;left:84px;right:96px;top:862px;height:3px;background:${INK};z-index:9"></div>
    ${testRow(474, "1", "PESQUISE:",
      `<span class="hi" style="font-weight:800;font-size:31px;padding:0 8px;background:${ACC};color:${PAPER2}">seu serviço + sua cidade</span><br><span style="display:inline-block;margin-top:8px">É fácil encontrar e entender sua empresa?</span>`,
      svg(`${searchBox(14, 56, 258, 58, "serviço + cidade", 23)}${spark(286, 46, 12, OR)}${spark(24, 134, 9)}`, 300, 184, 600, 0))}
    ${testRow(672, "2", "PEÇA PARA ALGUÉM ENCONTRAR:",
      `sua região · seu horário · seus serviços<br><span style="font-weight:800;font-size:32px;letter-spacing:.04em;display:inline-block;margin-top:8px">EM 30 SEGUNDOS.</span>`,
      svg(stopwatch(190, 102, 62, { fraction: 0.5, label: "30s" }), 300, 184, 600, 0))}
    ${testRow(870, "3", "CONTE:",
      `quantas vezes nesta semana<br>você respondeu <span style="font-weight:800">a mesma pergunta</span><br>no WhatsApp.`,
      svg(`${bubble(40, 26, 200, 46, "“Qual o horário?”", { size: 21, rot: -2 })}${bubble(90, 98, 200, 46, "“Qual o horário?”", { side: "right", size: 21, rot: 2, fill: ACC, color: PAPER2 })}${spark(272, 36, 12, OR)}`, 300, 184, 600, 0))}
    ${finalPhrase(`O RESULTADO<br><span class="or">FALA POR VOCÊ.</span>`, { top: 1070, size: 70 })}
  `,
});

// ------------------------------------------------------------
// PÁGINA 08 — FECHAMENTO
// ------------------------------------------------------------
const p08 = page({
  n: 8,
  kicker: K("ATO 3 · A TESE"),
  body: `
    ${hl(["SEU PERFIL", "APRESENTA.", { t: "O SITE", cls: "or" }, { t: "EXPLICA.", cls: "or" }], { top: 116, size: 126 })}
    ${txt(`Um site não fecha negócio sozinho.<br>E não garante posição no Google.<br><span style="display:block;height:12px"></span>Mas pode organizar sua apresentação,<br>explicar seus serviços<br>e criar mais um caminho<br>para quem procura sua empresa.`, { top: 636, size: 30, cls: "serifish", left: 120, right: 140, style: `font-weight:600;color:${DEEP}` })}
    ${svg(`
      ${shadowRect(40, 96, 850, 200, OR, 6)}
      ${burst(876, 104, 58, 78, 12, PAPER2, 6, 10)}
      ${text(876, 132, "!", 78, { family: "Anton", weight: 400, fill: ACC })}
      ${text(400, 172, "QUER VER COMO", 68, { family: "Anton", weight: 400, fill: PAPER2, ls: ".01em" })}
      ${text(400, 242, "FICARIA O SEU?", 68, { family: "Anton", weight: 400, fill: PAPER2, ls: ".01em" })}
      ${plane(690, 148, 120, -18)}
      ${emph(720, 202, 85, 108, [150, 170, 190], 5)}
    `, 960, 330, 60, 800)}
    ${cta("ME CHAMA NO DIRECT.", { top: 1104, style: `background:${ACC};color:${PAPER2};border-color:${INK};box-shadow:8px 8px 0 ${INK};font-size:40px;font-weight:700;letter-spacing:.14em;padding:12px 46px 14px` })}
    ${txt("SEU PRÓXIMO LINK PODE SER O SEU SITE.", { top: 1206, size: 22, style: "font-family:Oswald;font-weight:600;letter-spacing:.3em" })}
  `,
});

const pages = { "01": p01, "02": p02, "03": p03, "04": p04, "05": p05, "06": p06, "07": p07, "08": p08 };
for (const [k, html] of Object.entries(pages)) {
  writeFileSync(join(OUT, `${k}.html`), inl(html));
}

// folha de contato
const sheet = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Carrossel — Instagram ou site?</title>
<style>body{margin:0;background:#2b2926;padding:24px;font-family:sans-serif;color:#EBDDBF}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.g img{width:100%;display:block;box-shadow:0 10px 40px rgba(0,0,0,.5)}
h1{font-weight:400;letter-spacing:.2em;font-size:14px;text-transform:uppercase;margin:0 0 18px}</style></head>
<body><h1>Instagram ou site? · 8 páginas · 1080×1350</h1><div class="g">${Object.keys(pages).map(k => `<a href="../output/${k}.png"><img src="../output/${k}.png" alt="Página ${k}"></a>`).join("")}</div></body></html>`;
writeFileSync(join(OUT, "index.html"), sheet);
console.log("pages geradas:", Object.keys(pages).join(", "));
