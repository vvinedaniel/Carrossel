// ============================================================
// Biblioteca de ilustração retrô (SVG inline) + componentes de página
// ============================================================

export const INK = "#111111";    // contornos e sombras
export const PAPER = "#E9E9E1";  // creme / papel envelhecido
export const PAPER2 = "#F7F7F4"; // branco / off-white
export const ACC = "#163B66";    // azul-marinho principal (grandes preenchimentos)
export const DEEP = "#0B1F3A";   // azul profundo (áreas secundárias)
export const OR = ACC;           // compatibilidade: antigo laranja
const SW = 7;          // contorno principal
const SH = 10;         // deslocamento da sombra

export const DEFS = `
<defs>
  <pattern id="ht" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
    <circle cx="4.5" cy="4.5" r="1.9" fill="${INK}"/>
  </pattern>
  <pattern id="htd" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
    <circle cx="4" cy="4" r="2.6" fill="${INK}"/>
  </pattern>
  <pattern id="hto" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
    <circle cx="4.5" cy="4.5" r="2.2" fill="${OR}"/>
  </pattern>
  <pattern id="lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="4" height="10" fill="${INK}"/>
  </pattern>
</defs>`;

// ---------- primitivas ----------
export const rect = (x, y, w, h, fill, r = 0, sw = SW, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" ${extra}/>`;

export const shadowRect = (x, y, w, h, fill, r = 0, sw = SW, dx = SH, dy = SH) =>
  `<rect x="${x + dx}" y="${y + dy}" width="${w}" height="${h}" rx="${r}" fill="${INK}"/>` + rect(x, y, w, h, fill, r, sw);

export const circle = (cx, cy, r, fill, sw = SW) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="${sw}"/>`;

export const line = (x1, y1, x2, y2, sw = SW, extra = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${sw}" stroke-linecap="round" ${extra}/>`;

export const text = (x, y, s, size = 24, opts = {}) => {
  const { fill = DEEP, anchor = "middle", weight = 700, family = "Oswald", ls = ".04em", rot = 0, italic = false } = opts;
  const tr = rot ? `transform="rotate(${rot} ${x} ${y})"` : "";
  return `<text x="${x}" y="${y}" font-family="${family}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}" ${italic ? 'font-style="italic"' : ""} ${tr}>${s}</text>`;
};

// linhas de "texto" (placeholder de conteúdo)
export const tlines = (x, y, w, n, gap = 14, sw = 6, color = INK, widths = null) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const ww = widths ? widths[i % widths.length] * w : w * (i === n - 1 ? 0.6 : 1);
    s += `<line x1="${x}" y1="${y + i * gap}" x2="${x + ww}" y2="${y + i * gap}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }
  return s;
};

// ---------- explosão gráfica ----------
export const burst = (cx, cy, r1, r2, n = 18, fill = OR, sw = SW, rot = 0, shadow = true) => {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI * i) / n + (rot * Math.PI) / 180;
    const r = i % 2 === 0 ? r2 : r1;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  const p = pts.join(" ");
  return (shadow ? `<polygon points="${p}" fill="${INK}" transform="translate(${SH},${SH})"/>` : "") +
    `<polygon points="${p}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
};

// ---------- estrela 4 pontas (brilho) ----------
export const spark = (cx, cy, r, fill = INK) => {
  const q = r * 0.28;
  return `<polygon points="${cx},${cy - r} ${cx + q},${cy - q} ${cx + r},${cy} ${cx + q},${cy + q} ${cx},${cy + r} ${cx - q},${cy + q} ${cx - r},${cy} ${cx - q},${cy - q}" fill="${fill}"/>`;
};

// ---------- linhas de ênfase (quadrinho) ----------
export const emph = (cx, cy, r0, r1, angles, sw = 6) =>
  angles.map(a => {
    const rad = (a * Math.PI) / 180;
    return line(cx + Math.cos(rad) * r0, cy + Math.sin(rad) * r0, cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1, sw);
  }).join("");

// ---------- seta grossa ----------
export const arrow = (x, y, len, dir = 0, h = 46, fill = OR, sw = SW) => {
  const head = h * 1.1, body = h * 0.5;
  const p = `0,${-body} ${len - head},${-body} ${len - head},${-h} ${len},0 ${len - head},${h} ${len - head},${body} 0,${body}`;
  return `<g transform="translate(${x},${y}) rotate(${dir})">
    <polygon points="${p}" fill="${INK}" transform="translate(${SH * 0.8},${SH * 0.8})"/>
    <polygon points="${p}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>
  </g>`;
};

// ---------- placa inclinada ----------
export const sign = (x, y, label, rot = -6, size = 30, fill = PAPER2, color = ACC) => {
  const w = label.length * size * 0.56 + 44;
  const h = size * 1.7;
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    ${shadowRect(-w / 2, -h / 2, w, h, fill, 4, 6, 8, 8)}
    ${text(0, size * 0.36, label, size, { fill: color, ls: ".08em" })}
  </g>`;
};

// ---------- smartphone com perfil ----------
export const phone = (x, y, w, h, opts = {}) => {
  const { rot = 0, feed = true, shadow = true, labels = false, question = false } = opts;
  const r = w * 0.13, pad = w * 0.08;
  const sx = pad, sy = pad * 1.4, sw2 = w - pad * 2, sh = h - pad * 2.6;
  let content = "";
  if (feed) {
    // cabeçalho do perfil
    content += circle(sx + sw2 * 0.18, sy + sw2 * 0.2, sw2 * 0.11, OR, 5);
    content += tlines(sx + sw2 * 0.36, sy + sw2 * 0.13, sw2 * 0.55, 3, sw2 * 0.075, 6, INK, [1, 0.7, 0.5]);
    // barra de destaques
    for (let i = 0; i < 4; i++) content += circle(sx + sw2 * (0.12 + i * 0.25), sy + sw2 * 0.46, sw2 * 0.075, i === 0 ? OR : PAPER2, 4);
    // grade de posts
    const gy = sy + sw2 * 0.62, cell = (sw2 - 12) / 3;
    const fills = [OR, PAPER2, "url(#ht)", PAPER2, OR, PAPER2, PAPER2, "url(#ht)", OR, PAPER2, PAPER2, OR];
    let k = 0;
    for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) {
      const cy = gy + row * (cell + 6);
      if (cy + cell > sy + sh) continue;
      content += rect(sx + col * (cell + 6), cy, cell, cell, fills[k++ % fills.length], 3, 4);
    }
  }
  if (question) {
    content += text(sx + sw2 / 2, sy + sh * 0.6, "?", sw2 * 0.8, { family: "Anton", fill: OR, weight: 400 });
  }
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    ${shadow ? `<rect x="${SH}" y="${SH}" width="${w}" height="${h}" rx="${r}" fill="${INK}"/>` : ""}
    ${rect(0, 0, w, h, DEEP, r)}
    ${rect(sx, sy, sw2, sh, PAPER2, 6, 5)}
    <rect x="${w / 2 - w * 0.18}" y="${pad * 0.55}" width="${w * 0.36}" height="${pad * 0.42}" rx="${pad * 0.2}" fill="${PAPER2}"/>
    ${content}
  </g>`;
};

// ---------- janela / site ----------
export const site = (x, y, w, h, opts = {}) => {
  const { rot = 0, url = "suaempresa.com.br", sections = null, hero = true, shadow = true, scale = 1 } = opts;
  const bar = 44 * scale, addr = 40 * scale;
  let content = "";
  let cy = bar + addr + 16 * scale;
  if (hero) {
    content += rect(16 * scale, cy, w - 32 * scale, 78 * scale, OR, 3, 5);
    content += tlines(34 * scale, cy + 26 * scale, w * 0.5, 2, 22 * scale, 8 * scale, PAPER2, [1, 0.6]);
    cy += 96 * scale;
  }
  if (sections) {
    const n = sections.length, gap = 12 * scale;
    const ch = (h - cy - 16 * scale - gap * (n - 1)) / n;
    sections.forEach((s, i) => {
      const yy = cy + i * (ch + gap);
      content += rect(16 * scale, yy, w - 32 * scale, ch, i % 2 ? ACC : PAPER2, 3, 5);
      content += text(w / 2, yy + ch / 2 + 12 * scale, s, 32 * scale, { ls: ".12em", fill: i % 2 ? PAPER2 : ACC });
    });
  } else {
    // blocos de conteúdo genéricos
    const cw = (w - 44 * scale) / 2;
    content += rect(16 * scale, cy, cw, 70 * scale, PAPER2, 3, 5);
    content += `<rect x="${16 * scale + 3}" y="${cy + 3}" width="${cw - 6}" height="${70 * scale - 6}" fill="url(#ht)" opacity=".35"/>`;
    content += rect(28 * scale + cw, cy, cw, 70 * scale, PAPER2, 3, 5);
    content += tlines(30 * scale + cw + 12 * scale, cy + 20 * scale, cw - 24 * scale, 3, 18 * scale, 6 * scale, INK, [1, 0.8, 0.5]);
    cy += 88 * scale;
    if (cy + 40 * scale < h) content += tlines(20 * scale, cy + 10 * scale, w - 40 * scale, 3, 18 * scale, 6 * scale, INK, [1, 0.85, 0.55]);
  }
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    ${shadow ? `<rect x="${SH}" y="${SH}" width="${w}" height="${h}" rx="8" fill="${INK}"/>` : ""}
    ${rect(0, 0, w, h, PAPER2, 8)}
    <rect x="0" y="0" width="${w}" height="${bar}" rx="8" fill="${DEEP}"/>
    <rect x="0" y="${bar - 10}" width="${w}" height="10" fill="${DEEP}"/>
    ${[0, 1, 2].map(i => `<circle cx="${22 * scale + i * 28 * scale}" cy="${bar / 2}" r="${8 * scale}" fill="${i === 1 ? OR : PAPER2}"/>`).join("")}
    ${rect(14 * scale, bar + 8 * scale, w - 28 * scale, addr - 12 * scale, PAPER2, (addr - 12 * scale) / 2, 4)}
    ${text(w / 2, bar + 8 * scale + (addr - 12 * scale) * 0.7, url, 20 * scale, { family: "Barlow Condensed", weight: 700, ls: ".06em" })}
    ${content}
  </g>`;
};

// ---------- balão de conversa ----------
export const bubble = (x, y, w, h, msg, opts = {}) => {
  const { side = "left", fill = PAPER2, color = DEEP, size = 26, rot = 0 } = opts;
  const tail = side === "left"
    ? `<polygon points="${18},${h - 2} ${4},${h + 18} ${44},${h - 2}" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`
    : `<polygon points="${w - 18},${h - 2} ${w - 4},${h + 18} ${w - 44},${h - 2}" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  const lines = Array.isArray(msg) ? msg : [msg];
  const lh = size * 1.1;
  const ty = h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    <rect x="${SH * 0.8}" y="${SH * 0.8}" width="${w}" height="${h}" rx="18" fill="${INK}"/>
    ${rect(0, 0, w, h, fill, 18, 6)}
    ${tail}
    <rect x="6" y="${h - 8}" width="${w - 12}" height="10" fill="${fill}"/>
    ${lines.map((l, i) => text(w / 2, ty + i * lh, l, size, { fill: color, family: "Barlow Condensed", weight: 700, ls: ".02em" })).join("")}
  </g>`;
};

// ---------- lupa ----------
export const magnifier = (x, y, r, rot = 35) => `
  <g transform="translate(${x},${y}) rotate(${rot})">
    <circle cx="${SH}" cy="${SH}" r="${r}" fill="${INK}"/>
    <rect x="${r - 6 + SH}" y="${-18 + SH}" width="${r * 1.15}" height="36" rx="18" fill="${INK}"/>
    <rect x="${r - 6}" y="-18" width="${r * 1.15}" height="36" rx="18" fill="${OR}" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="0" cy="0" r="${r}" fill="${PAPER}" stroke="${INK}" stroke-width="${SW + 3}"/>
    <circle cx="0" cy="0" r="${r - 16}" fill="${PAPER2}" stroke="${INK}" stroke-width="5"/>
    <path d="M ${-r * 0.55} ${-r * 0.25} A ${r * 0.62} ${r * 0.62} 0 0 1 ${-r * 0.2} ${-r * 0.58}" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
  </g>`;

// ---------- cronômetro ----------
export const stopwatch = (x, y, r, opts = {}) => {
  const { fraction = 0.5, label = "30s" } = opts;
  const a = -Math.PI / 2 + Math.PI * 2 * fraction;
  const ex = x + Math.cos(a) * r * 0.5, ey = y + Math.sin(a) * r * 0.5;
  const big = fraction > 0.5 ? 1 : 0;
  const wedge = `M ${x} ${y} L ${x} ${y - r * 0.78} A ${r * 0.78} ${r * 0.78} 0 ${big} 1 ${x + Math.cos(a) * r * 0.78} ${y + Math.sin(a) * r * 0.78} Z`;
  return `
    <circle cx="${x + SH}" cy="${y + SH}" r="${r}" fill="${INK}"/>
    <rect x="${x - 22}" y="${y - r - 34}" width="44" height="34" rx="6" fill="${INK}"/>
    <rect x="${x - 34}" y="${y - r - 46}" width="68" height="22" rx="6" fill="${OR}" stroke="${INK}" stroke-width="6"/>
    <line x1="${x + r * 0.62}" y1="${y - r * 0.72}" x2="${x + r * 0.82}" y2="${y - r * 0.92}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW + 2}"/>
    <path d="${wedge}" fill="url(#hto)" stroke="none"/>
    <path d="${wedge}" fill="${OR}" opacity=".55"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.78}" fill="none" stroke="${INK}" stroke-width="5"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
      const t = (i * Math.PI) / 6;
      const l = i % 3 === 0 ? 0.18 : 0.09;
      return line(x + Math.cos(t) * r * 0.78, y + Math.sin(t) * r * 0.78, x + Math.cos(t) * r * (0.78 - l), y + Math.sin(t) * r * (0.78 - l), 5);
    }).join("")}
    ${text(x, y + r * 0.62, label, r * 0.34, { family: "Anton", weight: 400 })}
    ${line(x, y, ex, ey, 9)}
    <circle cx="${x}" cy="${y}" r="10" fill="${INK}"/>
  `;
};

// ---------- avião de papel (direct) ----------
export const plane = (x, y, s, rot = -20) => `
  <g transform="translate(${x},${y}) rotate(${rot})">
    <polygon points="${SH},${SH} ${s + SH},${s * 0.42 + SH} ${SH},${s * 0.84 + SH} ${s * 0.22 + SH},${s * 0.42 + SH}" fill="${INK}"/>
    <polygon points="0,0 ${s},${s * 0.42} 0,${s * 0.84} ${s * 0.22},${s * 0.42}" fill="${PAPER2}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <polygon points="0,${s * 0.84} ${s * 0.22},${s * 0.42} ${s * 0.3},${s * 0.72}" fill="url(#ht)" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="${s * 0.22}" y1="${s * 0.42}" x2="${s}" y2="${s * 0.42}" stroke="${INK}" stroke-width="5"/>
  </g>`;

// ---------- barra de endereço grande ----------
export const addressBar = (x, y, w, h, url, size = 44) => `
  <g transform="translate(${x},${y})">
    ${shadowRect(0, 0, w, h, PAPER2, h / 2)}
    <circle cx="${h / 2 + 6}" cy="${h / 2}" r="${h * 0.24}" fill="${OR}" stroke="${INK}" stroke-width="5"/>
    <rect x="${h / 2 - 2}" y="${h / 2 - 3}" width="16" height="13" rx="2" fill="${PAPER2}"/>
    <path d="M ${h / 2 + 2} ${h / 2 - 3} v -6 a 4 4 0 0 1 8 0 v 6" fill="none" stroke="${PAPER2}" stroke-width="3"/>
    ${text(h + 22, h / 2 + size * 0.36, url, size, { anchor: "start", family: "Barlow Condensed", weight: 800, ls: ".02em" })}
  </g>`;

// ---------- caixa de pesquisa ----------
export const searchBox = (x, y, w, h, q, size = 30) => `
  <g transform="translate(${x},${y})">
    ${shadowRect(0, 0, w, h, PAPER2, h / 2)}
    ${text(30, h / 2 + size * 0.36, q, size, { anchor: "start", family: "Barlow Condensed", weight: 700, ls: ".02em" })}
    <rect x="${w - h * 1.6}" y="${h * 0.16}" width="${h * 1.4}" height="${h * 0.68}" rx="${h * 0.34}" fill="${OR}" stroke="${INK}" stroke-width="5"/>
    <circle cx="${w - h * 0.9}" cy="${h / 2 - 3}" r="${h * 0.15}" fill="none" stroke="${PAPER2}" stroke-width="5"/>
    <line x1="${w - h * 0.8}" y1="${h / 2 + 7}" x2="${w - h * 0.68}" y2="${h / 2 + 18}" stroke="${PAPER2}" stroke-width="6" stroke-linecap="round"/>
  </g>`;

// ---------- numeral em selo ----------
export const badge = (x, y, r, n, size = null) => `
  <g transform="translate(${x},${y})">
    <circle cx="${SH}" cy="${SH}" r="${r}" fill="${INK}"/>
    <circle cx="0" cy="0" r="${r}" fill="${OR}" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="0" cy="0" r="${r - 14}" fill="none" stroke="${PAPER2}" stroke-width="3" stroke-dasharray="8 7"/>
    ${text(0, (size || r * 1.3) * 0.36, n, size || r * 1.3, { family: "Anton", weight: 400, fill: PAPER2, ls: "0" })}
  </g>`;

// ============================================================
// componentes de página
// ============================================================
export const svg = (inner, w = 1080, h = 1350, x = 0, y = 0, cls = "", z = 8) =>
  `<svg class="art ${cls}" style="position:absolute;left:${x}px;top:${y}px;z-index:${z}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${DEFS}${inner}</svg>`;

export const hl = (lines, { top, size, cls = "center", left = null, style = "" } = {}) => {
  const ls = lines.map(l => {
    if (typeof l === "string") return `<span class="l" data-t="${l}">${l}</span>`;
    const c = l.cls ? ` ${l.cls}` : "";
    const s = l.size ? ` style="font-size:${l.size}px"` : "";
    return `<span class="l${c}" data-t="${l.t}"${s}>${l.t}</span>`;
  }).join("");
  const pos = left !== null ? `left:${left}px;` : "";
  return `<div class="hl ${cls}" style="top:${top}px;${pos}font-size:${size}px;${style}">${ls}</div>`;
};

export const band = (t, { top, cls = "center", style = "", size = null } = {}) =>
  `<div class="band ${cls}" style="top:${top}px;${size ? `font-size:${size}px;` : ""}${style}">${t}</div>`;

export const txt = (t, { top, left = 0, right = 0, cls = "", size = null, style = "" } = {}) =>
  `<div class="txt ${cls}" style="top:${top}px;left:${left}px;right:${right}px;${size ? `font-size:${size}px;` : ""}${style}">${t}</div>`;

export const finalPhrase = (t, { top, size = 64, style = "" } = {}) =>
  `<div class="final" style="top:${top}px;font-size:${size}px;${style}">${t}</div>`;

export const cta = (t, { top, style = "" } = {}) => `<div class="cta" style="top:${top}px;${style}">${t}</div>`;

export const scrollbar = (i, n = 8) => {
  // faixa útil: track de 132px a 1350-132 = 1086px de altura, borda 4px, thumb 120px
  const trackH = 1350 - 132 * 2 - 8, thumb = 120;
  const y = Math.round(((trackH - thumb) * i) / (n - 1)) - 4;
  return `<div class="scroll"><div class="thumb" style="top:${y}px"></div></div>`;
};

export const page = ({ n, kicker, body }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Página ${String(n).padStart(2, "0")} — Instagram ou site?</title>
<link rel="stylesheet" href="../src/styles.css">
</head>
<body>
<div class="page" id="p${n}">
  <div class="kicker">${kicker}</div>
  ${body}
  <div class="frame"></div>
  ${scrollbar(n - 1)}
  <div class="footer"><span>@viniciusdaniel.web</span><span class="num">${String(n).padStart(2, "0")}/08</span></div>
  <div class="specks"></div>
  <div class="halftone"></div>
  <div class="grain"></div>
</div>
</body>
</html>`;
