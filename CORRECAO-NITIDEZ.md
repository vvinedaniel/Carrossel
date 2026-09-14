# Correção de nitidez — cole isto no chat do canvas do Claude Design

---

A arte está saindo embaçada e acinzentada. Corrija a nitidez sem mudar layout,
textos, cores ou composição. Siga exatamente estas regras.

## 1. PROIBIDO QUALQUER DESFOQUE

Remova de todos os elementos, sem exceção:

- `filter: blur(...)`
- `filter: drop-shadow(...)` com qualquer raio de desfoque
- `box-shadow` com raio de desfoque maior que zero
- `text-shadow` com raio de desfoque maior que zero
- `backdrop-filter`
- Qualquer preset de sombra suave do painel de propriedades

Esta identidade **não tem sombra suave**. A sombra é sólida, deslocada e com
desfoque zero. Substitua toda sombra por:

```css
box-shadow: 8px 8px 0 0 #111111;   /* deslocamento, blur 0, spread 0 */
text-shadow: 10px 10px 0 #111111;  /* sem terceiro valor de blur */
```

Em SVG, não use `<feGaussianBlur>` nem `filter`. A sombra é a própria forma
duplicada e deslocada 10 px para baixo e 10 px para a direita, preenchida com
`#111111`, desenhada atrás da forma original.

## 2. PROIBIDO QUALQUER CAMADA ESCURA POR CIMA

Remova:

- Retângulos semitransparentes cobrindo o quadro
- Gradientes escuros de sobreposição
- Camadas com `opacity` sobre a arte para "dar contraste"
- Vinheta forte nas bordas

Se houver vinheta, ela pode existir apenas nas bordas extremas e com no máximo
`rgba(11,31,58,.18)`. Nunca sobre o centro.

## 3. TEXTURA: SUTIL E SEM ESCALA

O grão e o halftone fazem parte da identidade, mas em dose baixa:

- Grão de papel: `opacity: .16` com `mix-blend-mode: multiply`
- Halftone de pontos: `opacity: .10`, pontos de 1,1 px numa grade de 6 px

Nunca aplique desfoque na textura. Nunca amplie a textura junto com o conteúdo:
ela deve ficar sempre em escala 1:1 sobre o quadro final, como uma camada de
impressão por cima de tudo.

## 4. NÃO AMPLIE AS IMAGENS

Os quadros originais são **1080 × 1350**. Se o artboard do Reels é
**1080 × 1920**, não estique nem aumente a imagem para preencher: ampliar um
PNG borra tudo. Faça de uma destas duas formas:

**Opção A, preferida.** Reconstrua cada cena direto em 1080 × 1920 com texto
vivo e formas vetoriais, usando os PNGs só como referência de composição.
Nada de imagem raster no resultado final.

**Opção B.** Use os arquivos em resolução dobrada que estou anexando
(**2160 × 2700**) e exiba-os em 1080 × 1350 dentro do artboard, sem esticar.
Preencha o espaço restante acima e abaixo com o creme `#E9E9E1` e a mesma
textura de papel.

Em qualquer caso: nenhuma imagem pode aparecer com largura maior que a largura
real do arquivo.

## 5. TEXTO TEM QUE SER TEXTO

As headlines precisam ser texto vivo com Anton, Oswald e Barlow Condensed, não
imagem. O contorno preto das headlines é feito com:

```css
-webkit-text-stroke: 9px #111111;
paint-order: stroke fill;
```

Não simule o contorno com sombra desfocada ao redor da letra.

## 6. PALETA — SEM COR INTERMEDIÁRIA

Apenas estas cinco. Nenhum cinza, nenhuma transparência que gere cinza:

| Uso | Hex |
| --- | --- |
| Fundo creme | `#E9E9E1` |
| Branco / off-white | `#F7F7F4` |
| Azul-marinho principal | `#163B66` |
| Azul profundo | `#0B1F3A` |
| Preto de contorno e sombra | `#111111` |

Se algo estiver aparecendo acinzentado, é sinal de camada transparente por
cima. Encontre e remova.

## 7. EXPORTAÇÃO

Exporte em 2x e deixe o Instagram reduzir: **2160 × 3840** para o Reels e
**2160 × 2700** para a capa. Exportar em 1x a partir de uma visualização
reduzida do canvas é o que mais tira nitidez.

## RESUMO

Contorno preto duro, sombra sólida deslocada sem desfoque, fundo creme limpo,
textura leve por cima, texto vivo, nenhuma imagem ampliada. É pôster impresso,
não fotografia com profundidade de campo.
