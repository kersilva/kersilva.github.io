/* Primitivos de layout do dossiê — Alexis como base estrutural */
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";

/**
 * Seção numerada com kicker monospace e divisória DENTRO dos trilhos
 * (a divisória é um Separator renderizado no container, nunca full-bleed).
 */
export function Secao({
  numero,
  titulo,
  descricao,
  children,
  className = "",
}: {
  numero: string; // "01", "02"...
  titulo: string;
  descricao?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="container-dossie">
        <Separator className="mb-8 sm:mb-10" />
        <FadeInUp>
          <header className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="label-mono">{`${numero}.`}</span>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {titulo}
                </h2>
              </div>
              {descricao ? (
                <span className="label-mono hidden max-w-sm text-right md:block">
                  {descricao}
                </span>
              ) : null}
            </div>
          </header>
        </FadeInUp>
        {children}
      </div>
    </section>
  );
}

/** Cabeçalho de página (hero) — fundo limpo, sem padrões decorativos */
export function CabecalhoPagina({
  numero,
  kicker,
  titulo,
  children,
}: {
  numero: string;
  kicker: string;
  titulo: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header>
      <div className="container-dossie py-14 sm:py-20">
        <FadeInUp>
          <p className="label-mono mb-4">{`${numero} — ${kicker}`}</p>
          <h1 className="max-w-3xl lg:max-w-fit text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {titulo}
          </h1>
          {children ? <div className="mt-6">{children}</div> : null}
        </FadeInUp>
      </div>
    </header>
  );
}
