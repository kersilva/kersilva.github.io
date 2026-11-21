/* Contexto de tema — escuro padrão, persistência em localStorage */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Tema = "dark" | "light";

interface TemaContextValue {
  tema: Tema;
  toggleTema: () => void;
  /** define o tema explicitamente (usado pelo AnimatedThemeToggler do Magic UI) */
  aplicarTema: (t: Tema) => void;
}

const TemaContext = createContext<TemaContextValue | null>(null);

const STORAGE_KEY = "kelwin-theme";

function lerTemaSalvo(): Tema {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" ? "light" : "dark"; // escuro é o padrão
  } catch {
    return "dark";
  }
}

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => lerTemaSalvo());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "dark");
  }, [tema]);

  const aplicarTema = useCallback((t: Tema) => {
    setTema(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* modo privado: apenas não persiste */
    }
  }, []);

  const toggleTema = useCallback(() => {
    setTema((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* modo privado: apenas não persiste */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ tema, toggleTema, aplicarTema }),
    [tema, toggleTema, aplicarTema]
  );

  return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>;
}

export function useTema(): TemaContextValue {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error("useTema deve ser usado dentro de <TemaProvider>");
  return ctx;
}
