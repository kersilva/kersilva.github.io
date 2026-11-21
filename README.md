# portfolio — Kelwin Felipe Rocha Silva

Portfólio pessoal reconstruído do zero, mantendo todas as informações da versão anterior.

## Stack

- **Node + Vite** — build de SPA estática
- **React 19 + TypeScript**
- **TanStack Router** — rotas tipadas (`/`, `/projetos`, `/projetos/$slug`)
- **Tailwind CSS 4** (build estático, via `@tailwindcss/vite`) + tokens de tema claro/escuro
- **motion** — animações (reveals, menu fullscreen, hovers suaves)
- **lucide-react** + ícones de marca em SVG próprio
- Fontes self-hosted: Alpino (Fontshare, sans-serif) e JetBrains Mono
- **shadcn/ui** — `components.json` (estilo new-york) + `Button`, `Badge`, `Input`, `Separator` em `src/components/ui/` com `cn()` (`clsx` + `tailwind-merge`)
- **Magic UI** — `WordRotate` (navbar), `AnimatedThemeToggler` (navbar, View Transitions) e `Marquee` (competências) em `src/components/magicui/`
- **Motion Primitives** — `FadeInUp`, `AnimatedUnderlineLink`, `Spotlight`/`SpotlightBorder` (bordas azuis que seguem o cursor) e `Cursor`/`CursorGlobal` (cursor bolinha que cresce sobre elementos pointer) em `src/components/motion-primitives/`

## Estrutura

```
src/
  data/portfolio.ts     ← TODO o conteúdo editável (pessoa, projetos, skills, formação)
  i18n/                 ← traduções PT/EN + context de idioma (persistido)
  tema/                 ← context de tema claro/escuro (persistido)
  components/
    layout/             ← Navbar, MenuFullscreen, Footer, Secao (trilhos 1px)
    projetos/           ← CardProjeto (capa colorida), Filtros (com contadores)
    ui/                 ← shadcn (Button, Badge, Input, Separator) + Marcas (SVG GitHub/LinkedIn)
    magicui/            ← WordRotate, AnimatedThemeToggler, Marquee
    motion-primitives/  ← FadeInUp, AnimatedUnderlineLink, Spotlight, SpotlightBorder, Cursor, CursorGlobal
  pages/                ← Home (hero + sobre + competências + projetos), Projetos, ProjetoDetail
```

## Comandos

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # servir o build localmente
```

## Deploy — GitHub Pages

1. O workflow `.github/workflows/deploy.yml` faz build e publica a cada push na `main`.
2. No repositório: **Settings → Pages → Source = "GitHub Actions"**.
3. O `base` do Vite está em `vite.config.ts` (`/portfolio/`). Se o repositório
   se chamar diferente, ajuste ali; se for user site (`seuuser.github.io`), use `"/"`.
4. Refresh em rotas internas funciona pelo `404.html` (SPA fallback clássico
   do GitHub Pages) — o roteador reconstrói a URL no `src/router.tsx`.

## Onde editar o conteúdo

| O que mudar | Onde |
|---|---|
| Nome, e-mail, GitHub, LinkedIn, currículo | `src/data/portfolio.ts` → `pessoa` |
| Projetos (resumo, stack, estudo de caso, capa) | `src/data/portfolio.ts` → `projetos` |
| Skills (5 categorias, 23 tecnologias) | `src/data/portfolio.ts` → `skills` |
| Palavras rotativas da navbar | `src/components/layout/Navbar.tsx` → `palavras` |
| Textos PT/EN | `src/i18n/translations.ts` |
| Cores (temas claro/escuro, azul de destaque) | `src/index.css` → `@theme` |
| Período da formação | `src/data/portfolio.ts` → `formacao` (campo `periodo`) |
