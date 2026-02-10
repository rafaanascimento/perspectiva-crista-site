# perspectiva-crista-site

Site em Astro para blog estático cristão, pronto para deploy no Cloudflare Pages via GitHub.

## Estrutura do projeto

```text
public/
├─ authors/
│  └─ README.txt
├─ images/
│  └─ README.txt

src/
├─ components/
│  └─ AuthorCard.astro
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ PostLayout.astro
├─ content/
│  └─ posts/
│     └─ conversao-saulo.md
├─ data/
│  └─ authors.json
├─ utils/
│  └─ formatDateBR.ts
```

> Observação: este repositório não inclui imagens binárias. Os paths `/authors/rafael.jpg` e `/images/post-cover.jpg` já estão no código e devem ser atendidos ao adicionar os arquivos reais futuramente.

## Como rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

A saída estática é gerada em `dist/`.

## Deploy no Cloudflare Pages

Configure o projeto no Cloudflare Pages com:

- **Build command:** `npm run build`
- **Output directory:** `dist`
