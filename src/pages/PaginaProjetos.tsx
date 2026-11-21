/* Página de listagem de projetos — grade completa com filtros (Alexis) */
import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { projetos } from "@/data/portfolio";
import { CardProjeto } from "@/components/projetos/CardProjeto";
import { Filtros, type Filtro } from "@/components/projetos/Filtros";
import { CabecalhoPagina } from "@/components/layout/Secao";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";

export function PaginaProjetos() {
  const { t, tx } = useI18n();
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const visiveis =
    filtro === "todos"
      ? projetos
      : projetos.filter((p) => p.tipo === filtro);

  return (
    <main>
      <CabecalhoPagina
        numero="01"
        kicker={t("nav.projetos")}
        titulo={tx({
          pt: "projetos que desenvolvi na minha trajetória",
          en: "projects I built throughout my career",
        })}
      >
        <p className="max-w-xl text-sm lg:text-lg leading-relaxed text-[var(--texto-muted)]">
          {tx({
            pt: "cada projeto tem uma página com o problema, a solução, minhas contribuições e os resultados — clique para ver os detalhes.",
            en: "each project has a page with the problem, solution, my contributions and results — click to see the details.",
          })}
        </p>
      </CabecalhoPagina>

      <section className="py-12 sm:py-16">
        <div className="container-dossie">
          <FadeInUp>
            <Filtros filtro={filtro} onMudar={setFiltro} />
          </FadeInUp>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visiveis.map((projeto) => (
              <CardProjeto key={projeto.slug} projeto={projeto} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
