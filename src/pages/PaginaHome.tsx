/* Home — hero + tudo do Sobre integrado (bio, valores, formação,
   competências com Marquee) + grade de projetos filtráveis */
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nContext";
import { formacao, pessoa, projetos, skills } from "@/data/portfolio";
import { CardProjeto } from "@/components/projetos/CardProjeto";
import { Secao } from "@/components/layout/Secao";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";
import { SpotlightBorder } from "@/components/motion-primitives/border-spotlight";
import { WordRotate } from "@/components/magicui/word-rotate";
import { BadgeTecnologia } from "@/components/projetos/BadgeTecnologia";
import { Button } from "@/components/ui/button";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Spotlight } from "@/components/motion-primitives/spotlight";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/motion-primitives/image-comparison";
import { SecaoCertificados } from "@/components/projetos/SecaoCertificados";

export function PaginaHome() {
  const { t, tx } = useI18n();
  const focos = tx({
    pt: [
      "aplicações web full-stack",
      "sites responsivos",
      "experiência de usuário",
      "soluções digitais",
    ],
    en: [
      "full-stack web applications",
      "responsive websites",
      "user experience",
      "digital solutions",
    ],
  });

  const todasSkills = skills.flatMap((c) => c.skills);
  const totalSkills = todasSkills.length;

  return (
    <main>
      {/* ============ hero ============ */}
      <section>
        <div className="container-dossie grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_0.72fr] lg:gap-12">
          <FadeInUp>
            <div className="flex max-w-2xl flex-col gap-5">
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {t("hero.saudacao")}{" "}
                <span className="text-[var(--accent)]">{pessoa.nomeCurto}</span>
                <span className="block text-[var(--texto-muted)]">
                  <WordRotate words={focos} />
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                {/* selo de disponibilidade com pulso */}
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--borda)] px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="pulso-disponivel absolute inline-flex h-2 w-2 rounded-full bg-emerald-400"
                      aria-hidden
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"
                      aria-hidden
                    />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--texto-muted)]">
                    {t("hero.disponivel")}
                  </span>
                </span>

                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open(pessoa.curriculum, "_blank", "noopener")
                  }
                  className="h-9 gap-2"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  {t("hero.verCv")}
                </Button>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.15} className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <ImageComparison
              enableHover
              className="aspect-[4/5] w-full rounded-2xl border border-[var(--borda)] bg-[var(--superficie)] shadow-2xl shadow-black/20"
            >
              
                <BorderTrail
                  className="rounded-full bg-[var(--accent)] opacity-50 blur-[50px]"
                  size={300}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
              <ImageComparisonImage
                src={`${import.meta.env.BASE_URL}img/avatar/hq.png`}
                alt={tx({ pt: "Ilustração em preto e branco de Kelwin", en: "Black and white illustration of Kelwin" })}
                position="left"
              />
              <ImageComparisonImage
                src={`${import.meta.env.BASE_URL}img/avatar/original.png`}
                alt={tx({ pt: "Foto original de Kelwin", en: "Original photo of Kelwin" })}
                position="right"
              />
              <ImageComparisonSlider className="bg-white shadow-[0_0_18px_rgba(0,0,0,0.35)]">
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/50 text-sm text-white shadow-lg backdrop-blur-sm" aria-hidden>
                  ↔
                </span>
              </ImageComparisonSlider>
            </ImageComparison>
          </FadeInUp>
        </div>
      </section>

      {/* ============ 01. sobre (ex-página Sobre) ============ */}
      <Secao numero="01" titulo={t("sobre.titulo")}>
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeInUp>
            <div className="flex flex-col gap-5">
              <p className="text-base lg:text-lg leading-relaxed">{t("sobre.bio1")}</p>
              <p className="text-base lg:text-lg leading-relaxed text-[var(--texto-muted)]">
                {t("sobre.bio2")}
              </p>
            </div>
          </FadeInUp>

          {/* valores */}
          <FadeInUp delay={0.1}>
            <div>
              <p className="label-mono mb-4">{t("sobre.valores")}</p>
              <ul className="grid gap-3">
                {[
                  t("sobre.comunicacao"),
                  t("sobre.persistencia"),
                  t("sobre.adaptacao"),
                ].map((valor) => (
                  <li key={valor}>
                    {/* borda azul com Spotlight Border (Motion Primitives) */}
                    <SpotlightBorder
                      innerClassName="flex items-center gap-3 px-4 py-3"
                      size={120}
                    >
                      <span className="icon-tile !h-8 !w-8" aria-hidden>
                        <span className="font-mono text-[10px] font-semibold">
                          {valor.slice(0, 2).toUpperCase()}
                        </span>
                      </span>
                      <span className="font-mono text-sm">{valor}</span>
                    </SpotlightBorder>
                  </li>
                ))}
                <li className="label-mono !text-[10px] pt-1">
                  {t("sobre.trabalho")}
                </li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </Secao>

      {/* ============ 02. formação: timeline ============ */}
      <Secao numero="02" titulo={t("sobre.formacao")}>
        <ol className="relative">
          {formacao.map((item) => (
            <li key={item.titulo} className="relative flex gap-4 pb-8 last:pb-0">
              {/* marcador da timeline */}
              <div className="relative flex-1 overflow-hidden rounded-lg border border-[var(--borda)] bg-[var(--superficie)] p-6">
                <Spotlight
                  className="z-0 from-blue-800 via-blue-600 to-blue-400 opacity-40"
                  size={260}
                />
                <div className="relative z-10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="label-mono order-1 !text-[10px] sm:order-2">
                      {item.periodo}
                    </span>
                    <h3 className="order-2 font-semibold leading-snug sm:order-1">
                      {item.titulo}
                    </h3>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-[var(--texto-muted)]">
                    {item.instituicao}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--texto-muted)]">
                    {tx(item.descricao)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Secao>

      {/* ============ 03. competências: Marquee (Magic UI) + categorias ============ */}
      <Secao
        numero="03"
        titulo={t("sobre.competencias")}
        descricao={`${totalSkills} ${
          tx({ pt: "tecnologias", en: "technologies" } as {
            pt: string;
            en: string;
          })
        }`}
      >

        <div className="grid gap-6">
          {skills.map((categoria) => (
            <div
              key={categoria.id}
              className="grid gap-3 py-2 sm:grid-cols-[200px_1fr] sm:items-center"
            >
              <p className="label-mono">{tx(categoria.rotulo)}</p>
              <div className="flex flex-wrap gap-1.5">
                {categoria.skills.map((skill) => (
                  <BadgeTecnologia className="lg:text-sm" key={skill} nome={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Secao>

      {/* ============ 04. certificados ============ */}
      <SecaoCertificados />

      {/* ============ 05. grade de projetos ============ */}
      <Secao
        numero="05"
        titulo={t("nav.projetos")}
        descricao={`${projetos.length} ${
          tx({ pt: "projetos", en: "projects" } as { pt: string; en: string })
        }`}
      >
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.slice(0, 4).map((projeto, index) => (
            <div key={projeto.slug} className={index === 3 ? "lg:hidden" : undefined}>
              <CardProjeto projeto={projeto} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/projetos"
            className="focus-vm inline-flex h-10 items-center gap-2 rounded-md border border-[var(--borda)] px-5 font-mono text-xs uppercase tracking-wider transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t("projeto.verTodos")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Secao>
    </main>
  );
}
