/* Página individual de projeto — estudo de caso a partir dos dados atuais. */
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubMarca } from "@/components/ui/Marcas";
import { Badge } from "@/components/ui/badge";
import { BadgeTecnologia } from "@/components/projetos/BadgeTecnologia";
import { Separator } from "@/components/ui/separator";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";
import { SpotlightBorder } from "@/components/motion-primitives/border-spotlight";
import { useI18n } from "@/i18n/I18nContext";
import { projetos, type Projeto } from "@/data/portfolio";

function Bloco({
  numero,
  titulo,
  children,
}: {
  numero: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-9 sm:py-11">
      <Separator className="mb-8" />
      <FadeInUp>
        <p className="label-mono mb-5">{`${numero} — ${titulo}`}</p>
        {children}
      </FadeInUp>
    </section>
  );
}

export function PaginaProjetoDetail({ projeto }: { projeto: Projeto }) {
  const { t, tx } = useI18n();
  const idx = projetos.findIndex((item) => item.slug === projeto.slug);
  const anterior = projetos[idx - 1];
  const proximo = projetos[idx + 1];
  const repositorios = [
    projeto.repositorioOriginal
      ? { href: projeto.repositorioOriginal, label: t("projeto.repositorioOriginal") }
      : null,
    projeto.repositorioPessoal &&
    projeto.repositorioPessoal !== projeto.repositorioOriginal
      ? { href: projeto.repositorioPessoal, label: t("projeto.repositorioPessoal") }
      : null,
  ].filter((item): item is { href: string; label: string } => item !== null);
  let numeroBloco = 0;
  const proximoNumeroBloco = () => String(++numeroBloco).padStart(2, "0");

  return (
    <main>
      <header>
        <div className="container-dossie py-10 sm:py-14">
          <Link
            to="/projetos"
            className="focus-vm label-mono mb-6 inline-flex items-center gap-2 rounded-sm transition-colors hover:text-[var(--accent)]"
          >
            {t("projeto.voltar")}
          </Link>

          <FadeInUp>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <Badge variant="accent" className="mb-3">
                  {t(`projeto.tipo.${projeto.tipo}`)}
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {projeto.nome}
                </h1>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--texto-muted)]">
                  {projeto.instituicao ? <span>{projeto.instituicao}</span> : null}
                  <span>{projeto.periodo}</span>
                  {projeto.empresaParceira ? (
                    <span>{`${t("projeto.parceiro")}: ${projeto.empresaParceira}`}</span>
                  ) : null}
                </div>
              </div>

              {repositorios.length || projeto.demonstracao ? (
                <div className="flex flex-wrap gap-2.5 lg:justify-end">
                  {repositorios.map((repo) => (
                    <a
                      key={repo.href}
                      href={repo.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-vm inline-flex items-center gap-2 rounded-lg border border-[var(--borda)] px-3 py-2 font-mono text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <GithubMarca className="h-4 w-4" aria-hidden />
                      {repo.label}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </FadeInUp>
        </div>
      </header>

      <section>
        <div className="container-dossie pb-8 sm:pb-12">
          <FadeInUp delay={0.1}>
            <div
              className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-[var(--borda)]"
              style={{ backgroundColor: projeto.corCapa }}
            >
              <img
                src={projeto.capa}
                alt={`${t("nav.projetos")}: ${projeto.nome}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </FadeInUp>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--texto-muted)] sm:text-base">
            {tx(projeto.resumo)}
          </p>
        </div>
      </section>

      <div className="container-dossie">
        {projeto.problema || projeto.solucao ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.contexto")}>
            <div className="grid gap-6 md:grid-cols-2">
              {projeto.problema ? (
                <div>
                  <h2 className="label-mono mb-3">{t("projeto.problema")}</h2>
                  <p className="text-sm leading-relaxed text-[var(--texto-muted)] sm:text-base">
                    {tx(projeto.problema)}
                  </p>
                </div>
              ) : null}
              {projeto.solucao ? (
                <div>
                  <h2 className="label-mono mb-3">{t("projeto.solucao")}</h2>
                  <p className="text-sm leading-relaxed sm:text-base">
                    {tx(projeto.solucao)}
                  </p>
                </div>
              ) : null}
            </div>
          </Bloco>
        ) : null}

        {projeto.contribuicoes ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.contribuicoes")}>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--texto-muted)] sm:text-base">
              {tx(projeto.contribuicoes)}
            </p>
          </Bloco>
        ) : null}

        {projeto.resultados &&
        (projeto.resultados.pt.length > 0 || projeto.resultados.en.length > 0) ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.resultados")}>
            <ul className="max-w-3xl space-y-3">
              {tx(projeto.resultados).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Bloco>
        ) : null}

        {projeto.hardSkills?.length ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.hardSkills")}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projeto.hardSkills.map((skill) => (
                <li key={skill.nome} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--borda)] bg-[var(--superficie)] px-4 py-3">
                  <span className="font-medium">{skill.nome}</span>
                  <Badge variant="accent">
                    {t(
                      skill.nivel === "básico"
                        ? "projeto.nivel.basico"
                        : skill.nivel === "autônomo"
                          ? "projeto.nivel.autonomo"
                          : "projeto.nivel.fluente",
                    )}
                  </Badge>
                </li>
              ))}
            </ul>
          </Bloco>
        ) : null}

        {projeto.softSkills &&
        (projeto.softSkills.pt.length > 0 || projeto.softSkills.en.length > 0) ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.softSkills")}>
            <ul className="max-w-3xl space-y-3">
              {tx(projeto.softSkills).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--texto-muted)] sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Bloco>
        ) : null}

        {projeto.demonstracao ? (
          <Bloco numero={proximoNumeroBloco()} titulo={t("projeto.demo")}>
            <img
              src={projeto.demonstracao}
              alt={`${t("projeto.demo")}: ${projeto.nome}`}
              loading="lazy"
              className="h-auto max-h-[75vh] w-full rounded-xl border border-[var(--borda)] object-contain"
            />
          </Bloco>
        ) : null}

        <FadeInUp>
          <section className="py-9 sm:py-11">
            <Separator className="mb-8" />
            <p className="label-mono mb-4">{`${proximoNumeroBloco()} — ${t("projeto.stack")}`}</p>
            <div className="flex flex-wrap gap-1.5">
              {[...projeto.stack].sort((a, b) => a.length - b.length).map((tec) => (
                <BadgeTecnologia key={tec} nome={tec} />
              ))}
            </div>
          </section>
        </FadeInUp>

        <FadeInUp>
        <nav className="flex justify-between gap-4 py-8" aria-label={t("nav.projetos")}>
          {anterior ? (
            <Link to="/projetos/$slug" params={{ slug: anterior.slug }} className="focus-vm block rounded-lg">
              <SpotlightBorder className="bg-transparent" innerClassName="bg-transparent text-nowrap">
                <span className="label-mono mb-1 flex items-center gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  {t("projeto.anterior")}
                </span>
                <span className="font-mono text-sm font-medium">{anterior.nome}</span>
              </SpotlightBorder>
            </Link>
          ) : <span />}
          {proximo ? (
            <Link to="/projetos/$slug" params={{ slug: proximo.slug }} className="focus-vm block rounded-lg text-right">
              <SpotlightBorder className="bg-transparent" innerClassName="bg-transparent text-nowrap">
                <span className="label-mono mb-1 flex items-center justify-end gap-2">
                  {t("projeto.proximo")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="font-mono text-sm font-medium">{proximo.nome}</span>
              </SpotlightBorder>
            </Link>
          ) : null}
        </nav>
        </FadeInUp>
      </div>
    </main>
  );
}
