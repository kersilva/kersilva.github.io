/* Roteador raiz — TanStack Router com rotas estáticas + dinâmica de projeto */
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "@/Layout";
import { PaginaHome } from "@/pages/PaginaHome";
import { PaginaProjetos } from "@/pages/PaginaProjetos";
import { PaginaProjetoDetail } from "@/pages/PaginaProjetoDetail";
import { projetos } from "@/data/portfolio";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PaginaHome,
});

const projetosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projetos",
  component: PaginaProjetos,
});

const projetoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projetos/$slug",
  loader: ({ params }) => {
    const projeto = projetos.find((p) => p.slug === params.slug);
    if (!projeto) {
      throw new Error(`Projeto não encontrado: ${params.slug}`);
    }
    return { projeto };
  },
  component: function ProjetoDetailRoute() {
    const { projeto } = projetoDetailRoute.useLoaderData();
    return <PaginaProjetoDetail projeto={projeto} />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projetosRoute,
  projetoDetailRoute,
]);

/*
 * SPA fallback do GitHub Pages: o 404.html redireciona para
 * index.html?/?/caminho — aqui reconstruímos a URL real antes
 * do roteador iniciar.
 */
if (typeof window !== "undefined") {
  const qs = window.location.search;
  if (qs.startsWith("?/?")) {
    const caminho = qs.slice(3) || "/";
    window.history.replaceState({}, "", caminho);
  }
}

/* base do Vite (ex.: "/portfolio/" no GitHub Pages, "/" no dev) vira basepath */
const basepath = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "") || "/";

export const router = createRouter({ routeTree, basepath });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
