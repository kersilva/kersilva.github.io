/* Motion Primitives — CursorGlobal: composição sobre o Cursor oficial
   (padrão dos demos cursor-1/2) para o cursor-bolinha do site inteiro.
   A bolinha fica maior sobre elementos que viriam com cursor pointer. */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Cursor } from "./cursor";

type EstadoCursor = "normal" | "pointer" | "texto";

const SELETOR_POINTER =
  'a, button, [role="button"], summary, [data-cursor="pointer"]';
const SELETOR_TEXTO = 'input, textarea, select, [contenteditable="true"]';

export function CursorGlobal() {
  const [estado, setEstado] = useState<EstadoCursor>("normal");
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    /* ponteiro fino (desktop) — touch fica de fora; ambientes que não
       reportam nenhum pointer (ex.: headless) tratam como desktop */
    const ponteiroFino = window.matchMedia("(pointer: fine)").matches;
    const ponteiroGrosso = window.matchMedia("(pointer: coarse)").matches;
    const provavelDesktop = ponteiroFino || (!ponteiroFino && !ponteiroGrosso);
    if (!provavelDesktop) return;

    setAtivo(true);
    document.documentElement.classList.add("cursor-bolinha");

    const aoSobrevoo = (e: MouseEvent) => {
      const alvo = e.target as HTMLElement | null;
      if (!alvo) return;
      setEstado(
        alvo.closest(SELETOR_TEXTO)
          ? "texto"
          : alvo.closest(SELETOR_POINTER)
            ? "pointer"
            : "normal"
      );
    };

    window.addEventListener("mouseover", aoSobrevoo, { passive: true });
    return () => {
      document.documentElement.classList.remove("cursor-bolinha");
      document.body.style.cursor = "";
      window.removeEventListener("mouseover", aoSobrevoo);
    };
  }, []);

  if (!ativo) return null;

  return (
    <Cursor
      springConfig={{ bounce: 0, stiffness: 520, damping: 34, mass: 0.6 }}
      className="z-[100]"
    >
      {/* a bolinha: 10px em repouso → 44px sobre elementos pointer */}
      <motion.div
        className="rounded-full shadow-md/30"
        animate={{
          width: estado === "pointer" ? 20 : estado === "texto" ? 14 : 10,
          height: estado === "pointer" ? 20 : estado === "texto" ? 14 : 10,
          backgroundColor:
            "white",
          opacity: estado === "pointer" ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
    </Cursor>
  );
}
