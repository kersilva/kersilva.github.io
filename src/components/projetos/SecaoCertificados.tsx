import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { certificados } from "@/data/portfolio";
import { Secao } from "@/components/layout/Secao";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";

export function SecaoCertificados() {
  const { tx } = useI18n();

  return (
    <Secao numero="04" titulo={tx({ pt: "certificados", en: "certificates" })}>
      <div className="flex flex-col gap-5">
        {certificados.map((certificado) => {
          const titulo = tx(certificado.titulo);
          const descricao = tx(certificado.descricao);
          return (
            <MorphingDialog key={certificado.id} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
              <MorphingDialogTrigger
                className="group w-full overflow-hidden rounded-xl border border-[var(--borda)] bg-[var(--superficie)] transition-colors hover:border-[var(--accent)]/60 flex items-center p-3 gap-5"
                aria-label={`${tx({ pt: "Ver certificado", en: "View certificate" })}: ${titulo}`}
              >
                <span className="flex aspect-[16/10] items-center justify-center overflow-hidden h-15">
                  <MorphingDialogImage
                    src={certificado.imagem}
                    alt={`${tx({ pt: "Certificado", en: "Certificate" })}: ${titulo}`}
                    className="h-full w-full object-contain transition-transform duration-300"
                  />
                </span>
                <span className="flex items-start justify-between gap-3 w-full">
                  <span className="min-w-0">
                    <MorphingDialogTitle className="block text-left font-semibold leading-snug">
                      {titulo}
                    </MorphingDialogTitle>
                    <MorphingDialogSubtitle className="mt-1 block text-left font-mono text-xs text-[var(--texto-muted)]">
                      {certificado.emissor} · {certificado.ano}
                    </MorphingDialogSubtitle>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--texto-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="w-[min(100%,64rem)] overflow-hidden rounded-2xl border border-[var(--borda)] bg-[var(--superficie)] shadow-2xl">
                  <MorphingDialogClose />
                  <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.4fr_0.8fr]">
                    <div className="flex min-h-64 items-center justify-center bg-black/10 p-4 sm:p-8">
                      <MorphingDialogImage
                        src={certificado.imagem}
                        alt={`${tx({ pt: "Certificado", en: "Certificate" })}: ${titulo}`}
                        className="max-h-[68vh] max-w-full rounded-md object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                      <p className="label-mono">{certificado.ano}</p>
                      <MorphingDialogTitle className="text-xl font-semibold leading-snug sm:text-2xl">
                        {titulo}
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className="font-mono text-xs text-[var(--texto-muted)]">
                        {certificado.emissor}
                      </MorphingDialogSubtitle>
                      <p className="text-sm leading-relaxed text-[var(--texto-muted)]">
                        {descricao}
                      </p>
                    </div>
                  </div>
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          );
        })}
      </div>
    </Secao>
  );
}
