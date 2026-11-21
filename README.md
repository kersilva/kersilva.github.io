# Portfólio — Kelwin Felipe Rocha Silva

Portfólio acadêmico e profissional de Kelwin Felipe Rocha Silva. O site apresenta formação, competências, certificados e projetos, com páginas individuais para os estudos de caso.

## Tecnologias

- React 19, TypeScript e Vite
- TanStack Router para navegação entre a página inicial, a lista de projetos e os detalhes de cada projeto
- Tailwind CSS 4
- Motion para animações e componentes interativos
- Magic UI e Motion Primitives para efeitos de texto, imagem, cursor e diálogos
- Lucide React e ícones SVG próprios
- Fontes Inter, Alpino e JetBrains Mono

## Conteúdo do site

- **Início:** apresentação, foto, formação, competências, certificados e até quatro projetos em telas menores ou três em telas grandes
- **Projetos:** lista completa com filtros por tipo
- **Detalhes do projeto:** contexto, problema, solução, contribuições, resultados, competências, tecnologias e links dos repositórios
- **Certificados:** imagens abertas em diálogo animado
- **Preferências:** idioma português/inglês e tema claro/escuro

## Estrutura

```text
src/
  data/portfolio.ts                 # pessoa, projetos, competências, formação e certificados
  i18n/                             # textos em português e inglês
  tema/                             # estado do tema claro/escuro
  components/
    layout/                         # navegação, menu, rodapé e seções
    projetos/                       # cartões, filtros e certificados
    ui/                              # componentes de interface e marcas SVG
    magicui/                         # componentes Magic UI usados no site
    motion-primitives/               # animações e componentes Motion Primitives
  pages/                             # página inicial, projetos e detalhes
public/
  img/avatar/                        # imagens do hero
  img/certificados/                  # certificados
  img/projetos/                      # capas e capturas de tela dos projetos
```

## Desenvolvimento

Requer Node.js e npm.

```bash
npm install
npm run dev      # inicia o servidor local
npm run build    # verifica os tipos e gera o site em dist/
npm run preview  # visualiza localmente o build de produção
npm run lint     # executa o Oxlint
```

## Publicação no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica após um push para `main` ou por execução manual. No repositório, o GitHub Pages deve usar **Settings → Pages → Source → GitHub Actions**. Como este projeto está no repositório de usuário `kersilva.github.io`, o Vite usa `base: "/"` e o workflow instala, compila e publica a partir da raiz.

## Onde editar

| Conteúdo | Arquivo |
|---|---|
| Nome, contatos, currículo e links | `src/data/portfolio.ts` — `pessoa` |
| Projetos e estudos de caso | `src/data/portfolio.ts` — `projetos` |
| Tecnologias e categorias | `src/data/portfolio.ts` — `skills` |
| Formação | `src/data/portfolio.ts` — `formacao` |
| Certificados | `src/data/portfolio.ts` — `certificados` |
| Textos em português e inglês | `src/i18n/translations.ts` e os textos bilíngues em `src/data/portfolio.ts` |
| Cores e estilos globais | `src/index.css` |
