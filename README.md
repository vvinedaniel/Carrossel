# Carrossel — “Instagram ou site?”

Carrossel de 8 páginas para Instagram (1080 × 1350 px, 4:5) com estética de pôster editorial retrô:
papel envelhecido, preto profundo e laranja queimado, tipografia condensada gigante com contorno e
sombra deslocada, halftone e pequenas imperfeições de impressão.

Tese: **Seu perfil apresenta. O site explica.**

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `output/` | As 8 artes finais em PNG (1080 × 1350) — prontas para publicar |
| `pages/` | Uma página HTML por card + `index.html` (folha de contato) |
| `src/styles.css` | Design system: paleta, texturas, moldura, headline, faixa, rodapé, barra de scroll |
| `src/lib.mjs` | Biblioteca de ilustração (smartphone, site, lupa, cronômetro, balões, explosões, setas…) |
| `src/build.mjs` | Conteúdo e composição de cada uma das 8 páginas |
| `scripts/render.mjs` | Renderiza os HTML em PNG com Chromium (Playwright) |
| `assets/fonts/` | Anton, Oswald e Barlow Condensed (SIL Open Font License) |

## Narrativa

1. **Capa** — Instagram ou site? Não é uma disputa.
2. **A trégua** — Seu perfil faz bem o que foi feito pra fazer.
3. **Função 1** — O endereço é seu.
4. **Função 2** — O site organiza.
5. **Função 3** — O site entra no jogo da busca (sem prometer posição).
6. **Função 4** — Agora você tem um link.
7. **O teste** — Não acredite em mim. Teste.
8. **A tese** — Seu perfil apresenta. O site explica. Me chama no direct.

Detalhe escondido: a barra vertical à direita é a barra de rolagem de um site. Ela desce a cada
página — o carrossel é um site sendo rolado.

## Como regenerar

```bash
npm install            # instala o Playwright (Chromium)
npm run all            # gera pages/*.html e output/*.png
node scripts/render.mjs 03 07   # renderiza só algumas páginas
```

Para ajustar texto ou composição, edite `src/build.mjs`; para cores, texturas e tipografia,
`src/styles.css`.
