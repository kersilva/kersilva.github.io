/* Menu fullscreen — VM (blocos numerados com todas as ações em um lugar) */
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Copy,
  ExternalLink,
  FileText,
  Languages,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useTema } from "@/tema/TemaContext";
import { pessoa } from "@/data/portfolio";
import { Separator } from "@/components/ui/separator";
import { TextMorph } from "@/components/motion-primitives/text-morph";
import type { TranslationKey } from "@/i18n/translations";

interface ItemMenu {
  chave: TranslationKey;
  to?: string;
  href?: string;
}

export function MenuFullscreen({
  aberto,
  onFechar,
  onCopiarEmail,
}: {
  aberto: boolean;
  onFechar: () => void;
  onCopiarEmail: () => Promise<boolean>;
}) {
  const { t, lang, toggleLang } = useI18n();
  const { tema, toggleTema } = useTema();
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [emailCopiado, setEmailCopiado] = useState(false);

  /* acessibilidade: ESC fecha, foco travado dentro do menu, retorna ao abrir */
  useEffect(() => {
    if (!aberto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      if (e.key === "Tab" && dialogRef.current) {
        const focos = dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])"
        );
        if (focos.length === 0) return;
        const primeiro = focos[0];
        const ultimo = focos[focos.length - 1];
        if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro.focus();
        } else if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    botaoFecharRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, onFechar]);

  const navegacao: ItemMenu[] = [
    { chave: "nav.inicio", to: "/" },
    { chave: "nav.projetos", to: "/projetos" },
  ];

  async function copiarEmailMenu() {
    if (!(await onCopiarEmail())) return;
    setEmailCopiado(true);
    window.setTimeout(() => setEmailCopiado(false), 2000);
  }

  return (
    <AnimatePresence>
      {aberto ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[var(--fundo)]/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu.titulo")}
          ref={dialogRef}
        >
          <div className="flex h-14 items-center justify-end pr-5 sm:pr-8">
            <button
              type="button"
              ref={botaoFecharRef}
              onClick={onFechar}
              aria-label={t("menu.fechar")}
              className="focus-vm icon-tile !h-9 !w-9 hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <nav className="container-dossie grid gap-10 pb-16" aria-label="menu fullscreen">
            {/* 01. NAVEGAÇÃO */}
            <div>
              <Separator className="mb-6" />
              <p className="label-mono mb-3">{`01. ${t("menu.navegacao")}`}</p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {navegacao.map((item) => (
                  <li key={item.chave}>
                    <Link
                      to={item.to!}
                      onClick={onFechar}
                      className="focus-vm hover-vm flex items-center justify-between rounded-lg px-4 py-3 text-lg transition-colors duration-200 hover:bg-[var(--superficie)]"
                    >
                      <span className="font-mono uppercase tracking-wide">
                        {t(item.chave)}
                      </span>
                      <span aria-hidden className="text-[var(--accent)]">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 02. AÇÕES */}
            <div>
              <Separator className="mb-6" />
              <p className="label-mono mb-3">{`02. ${t("menu.acoes")}`}</p>
              <ul className="grid gap-1 sm:grid-cols-3">
                <li>
                  <button
                    type="button"
                    onClick={toggleTema}
                    className="focus-vm hover-vm flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      {tema === "dark" ? (
                        <Moon className="h-4 w-4" aria-hidden />
                      ) : (
                        <Sun className="h-4 w-4" aria-hidden />
                      )}
                    </span>
                    <span className="font-mono text-sm uppercase tracking-wide">
                      {t("menu.tema")}
                      <span className="ml-2 text-[var(--accent)]">
                        {tema === "dark" ? t("menu.temaEscuro") : t("menu.temaClaro")}
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="focus-vm hover-vm flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      <Languages className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-sm uppercase tracking-wide">
                      {t("menu.idioma")}
                      <span className="ml-2 text-[var(--accent)]">
                        {lang === "pt" ? "PT" : "EN"}
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <a
                    href={pessoa.curriculum}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-vm hover-vm flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      <FileText className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-sm uppercase tracking-wide">
                      {t("comum.cvBaixar")}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* 03. CONTATO */}
            <div>
              <Separator className="mb-6" />
              <p className="label-mono mb-3">{`03. ${t("menu.contato")}`}</p>
              <ul className="grid gap-1 sm:grid-cols-3">
                <li>
                  <button
                    type="button"
                    onClick={copiarEmailMenu}
                    className="focus-vm hover-vm flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      <Copy className="h-4 w-4" aria-hidden />
                    </span>
                    <TextMorph className="font-mono text-sm">
                      {emailCopiado ? t("footer.emailCopiado") : pessoa.email}
                    </TextMorph>
                  </button>
                </li>
                <li>
                  <a
                    href={pessoa.github}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-vm hover-vm flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-sm">github/kersilva</span>
                  </a>
                </li>
                <li>
                  <a
                    href={pessoa.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-vm hover-vm flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-[var(--superficie)]"
                  >
                    <span className="icon-tile">
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-sm">linkedin/kersilva</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
