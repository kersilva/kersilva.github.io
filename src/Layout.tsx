/* Layout raiz: navbar + menu fullscreen + conteúdo + footer + cursor bolinha */
import { useState, useCallback } from "react";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { MenuFullscreen } from "@/components/layout/MenuFullscreen";
import { Footer } from "@/components/layout/Footer";
import { CursorGlobal } from "@/components/motion-primitives/cursor-bolinha";
import { pessoa } from "@/data/portfolio";

export function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const abrirMenu = useCallback(() => setMenuAberto(true), []);
  const fecharMenu = useCallback(() => setMenuAberto(false), []);

  const copiarEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pessoa.email);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col pt-14">
      <Navbar onAbrirMenu={abrirMenu} />
      <MenuFullscreen aberto={menuAberto} onFechar={fecharMenu} onCopiarEmail={copiarEmail} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      {/* cursor bolinha (Motion Primitives) — site todo, cresce sobre pointer */}
      <CursorGlobal />
    </div>
  );
}
