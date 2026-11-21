/* Navbar — marca + WordRotate à esquerda, nav centralizada, ações à direita */
import { Link } from "@tanstack/react-router";
import { Languages, Menu } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useTema } from "@/tema/TemaContext";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export function Navbar({ onAbrirMenu }: { onAbrirMenu: () => void }) {
  const { t, toggleLang } = useI18n();
  const { tema, aplicarTema } = useTema();

  const itemNav = (props: { to: string; rotulo: string }) => (
    <Link
      to={props.to}
      className="focus-vm rounded-sm font-mono text-xs uppercase tracking-widest text-[var(--texto-muted)] transition-colors duration-200 hover:text-[var(--accent)] data-[status=active]:text-[var(--accent)]"
      activeProps={{
        className:
          "focus-vm rounded-sm font-mono text-xs uppercase tracking-widest text-[var(--accent)]",
      }}
    >
      {props.rotulo}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[var(--fundo)]/80 backdrop-blur-md">
      <div className="container-dossie flex h-14 items-center justify-between gap-3 border-x border-b border-[var(--borda)]">
        {/* marca */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="focus-vm rounded-sm font-mono text-sm font-medium tracking-tight"
            aria-label={t("nav.inicio")}
          >
            kelwin<span className="text-[var(--accent)]">.dev</span>
          </Link>
        </div>

        {/* nav centralizada (INÍCIO · PROJETOS) */}
        <nav className="hidden items-center gap-2 md:flex" aria-label="principal">
          {itemNav({ to: "/", rotulo: t("nav.inicio") })}
          <span className="text-[var(--borda)]" aria-hidden>
            ·
          </span>
          {itemNav({ to: "/projetos", rotulo: t("nav.projetos") })}
        </nav>

        {/* ações */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("menu.idioma")}
            title={t("menu.idioma")}
            className="focus-vm icon-tile !h-8 !w-8 hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white"
          >
            <Languages className="h-4 w-4" aria-hidden />
          </button>

          {/* AnimatedThemeToggler (Magic UI) — círculo de View Transition a partir do botão */}
          <AnimatedThemeToggler
            theme={tema}
            onThemeChange={(novo) => aplicarTema(novo)}
            aria-label={t("menu.tema")}
            title={t("menu.tema")}
            className="focus-vm icon-tile !h-8 !w-8 hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white [&_svg]:!h-4 [&_svg]:!w-4"
          />

          <button
            type="button"
            onClick={onAbrirMenu}
            aria-label={t("menu.titulo")}
            title={t("menu.titulo")}
            className="focus-vm icon-tile !h-8 !w-8 hover:!border-transparent hover:!bg-[var(--accent)] hover:!text-white"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
