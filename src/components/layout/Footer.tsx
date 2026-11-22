/* Rodapé — CTA + contatos, metadados com relógio ao vivo e back to top.
   Sem tecnologias (movidas para as competências na Home); localização
   fica abaixo do nome. */
import { useEffect, useState } from "react";
import { ArrowUp, Check, Clock, Copy } from "lucide-react";
import { GithubMarca, LinkedinMarca } from "@/components/ui/Marcas";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedUnderlineLink } from "@/components/motion-primitives/animated-underline-link";
import { FadeInUp } from "@/components/motion-primitives/fade-in-up";
import { TextMorph } from "@/components/motion-primitives/text-morph";
import { useI18n } from "@/i18n/I18nContext";
import { pessoa } from "@/data/portfolio";

/* relógio ao vivo no fuso de São Paulo (America/Sao_Paulo) */
function useRelogioSaoPaulo() {
  const [agora, setAgora] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date())
  );
  useEffect(() => {
    const id = setInterval(() => {
      setAgora(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return agora;
}

export function Footer() {
  const { t, tx } = useI18n();
  const [copiado, setCopiado] = useState(false);
  const relogio = useRelogioSaoPaulo();

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(pessoa.email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* fallback silencioso */
    }
  }

  return (
    <footer>
      <div className="container-dossie py-12">
        <Separator />

        {/* ===== linha 1: CTA + contatos ===== */}
        <FadeInUp>
        <div className="flex flex-wrap items-end justify-between gap-6 pt-10">
          <div className="w-full max-w-fit">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t("footer.cta")}
            </h2>
            <p className="mt-1 text-sm lg:text-base leading-relaxed text-[var(--texto-muted)]">
              {tx({
                pt: "aberto a projetos, estágios e colaborações técnicas em desenvolvimento web.",
                en: "open to projects, internships and technical collaborations in web development.",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full max-w-fit">
            {/* pill de e-mail com copiar */}
            <Button
              variant="secondary"
              onClick={copiarEmail}
              aria-live="polite"
              className="h-10 gap-2.5 rounded-full px-4 font-mono text-xs normal-case tracking-normal"
            >
              {copiado ? (
                <Check className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              ) : (
                <Copy className="h-4 w-4" aria-hidden />
              )}
              <TextMorph>{copiado ? t("footer.emailCopiado") : pessoa.email}</TextMorph>
            </Button>

            {/* ícones sociais pequenos */}
            <a
              href={pessoa.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="focus-vm icon-tile !h-10 !w-10 !rounded-full hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white"
            >
              <GithubMarca className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={pessoa.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="focus-vm icon-tile !h-10 !w-10 !rounded-full hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white"
            >
              <LinkedinMarca className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
        </FadeInUp>

        {/* ===== linha 2: metadados — nome, localização abaixo, relógio, topo ===== */}
        <Separator className="mt-10" />
        <FadeInUp delay={0.08}>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div>
            <p className="label-mono">{pessoa.marcaRodape}</p>
            <p className="label-mono mt-1 !text-[10px]">
              {tx({ pt: "São Paulo, Brasil", en: "São Paulo, Brazil" })}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <span className="label-mono inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              <span aria-live="off">{relogio}</span>
              <span className="opacity-70">BRT</span>
            </span>

            <AnimatedUnderlineLink
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer"
            >
              <span className="label-mono inline-flex items-center gap-1.5 group-hover:text-[var(--texto)]">
                {t("footer.voltarTopo")}
                <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              </span>
            </AnimatedUnderlineLink>
          </div>
        </div>
        </FadeInUp>
      </div>
    </footer>
  );
}
