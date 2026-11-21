/* Card de projeto — Alexis: capa própria por projeto + metadados padronizados */
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { GithubMarca } from "@/components/ui/Marcas";
import { Badge } from "@/components/ui/badge";
import { BadgeTecnologia } from "@/components/projetos/BadgeTecnologia";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";
import { SpotlightBorder } from "@/components/motion-primitives/border-spotlight";
import { useI18n } from "@/i18n/I18nContext";
import type { Projeto } from "@/data/portfolio";

export function CardProjeto({ projeto }: { projeto: Projeto }) {
  const { t, tx } = useI18n();
  const repositorio = projeto.repositorioPessoal ?? projeto.repositorioOriginal;

  return (
    <FadeInUp className="h-full">
      <SpotlightBorder
        className="h-full rounded-xl"
        innerClassName="h-full rounded-[inherit] p-0"
        size={800}
      >
        <article className="group flex h-full flex-col overflow-hidden rounded-[inherit] bg-[var(--superficie)]">
          {/* capa com identidade própria (cor por projeto quando não há imagem) */}
          <Link
            to="/projetos/$slug"
            params={{ slug: projeto.slug }}
            className="focus-vm block"
          >
            <div
              className="relative flex aspect-[16/10] items-end overflow-hidden p-4"
              style={{ backgroundColor: projeto.corCapa }}
              aria-hidden
            >
              <span className="font-mono text-sm font-semibold text-black/70">
                {projeto.nome}
              </span>
              <img
                src={projeto.capa}
                alt={projeto.nome}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Link>

          {/* área de informações */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                <Link
                  to="/projetos/$slug"
                  params={{ slug: projeto.slug }}
                  className="focus-vm rounded-sm"
                >
                  {projeto.nome}
                </Link>
              </h3>
              {/* hover azul apenas quando o mouse está sobre o botão */}
              <a
                href={repositorio}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t("projeto.verGithub")} — ${projeto.nome}`}
                className="focus-vm icon-tile !h-8 !w-8"
                title={t("projeto.verGithub")}
              >
                <GithubMarca className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <p className="text-sm leading-relaxed text-[var(--texto-muted)]">
              {tx(projeto.resumo)}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {[...projeto.stack].sort((a, b) => a.length - b.length).slice(0, 3).map((tec) => (
                <BadgeTecnologia key={tec} nome={tec} />
              ))}

              {projeto.stack.length > 3 && (
                <Badge>+{projeto.stack.length - 3}</Badge>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--borda)] pt-3">
              <Badge variant="accent" className="!text-[10px]">
                {t(
                  `projeto.tipo.${projeto.tipo}`,
                )}
              </Badge>
              <Link
                to="/projetos/$slug"
                params={{ slug: projeto.slug }}
                className="focus-vm flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[var(--texto-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {t("projeto.verDetalhe")}
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          </div>
        </article>
      </SpotlightBorder>
    </FadeInUp>
  );
}
