/* Contexto de idioma — PT padrão, persistência em localStorage */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type TranslationKey } from "./translations";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  /** resolve textos bilíngues dos dados (ex.: resumo do projeto) */
  tx: <T,>(obj: { pt: T; en: T }) => T;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "kelwin-lang";

function lerLangSalva(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => lerLangSalva());

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* modo privado: apenas não persiste */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] as string,
    [lang]
  );

  const tx = useCallback(
    <T,>(obj: { pt: T; en: T }): T => obj[lang],
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, tx }),
    [lang, setLang, toggleLang, t, tx]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n deve ser usado dentro de <I18nProvider>");
  return ctx;
}
