/* Filtros de projetos — pílulas com contadores (Alexis) */
import { useI18n } from "@/i18n/I18nContext";
import { projetos, type ProjetoTipo } from "@/data/portfolio";

export type Filtro = "todos" | ProjetoTipo;

export function Filtros({
  filtro,
  onMudar,
}: {
  filtro: Filtro;
  onMudar: (f: Filtro) => void;
}) {
  const { t } = useI18n();

  const contagem = (f: Filtro) =>
    f === "todos"
      ? projetos.length
      : projetos.filter((p) => p.tipo === f).length;

  const tipos = [...new Set(projetos.map((projeto) => projeto.tipo))];
  const opcoes: { valor: Filtro; rotulo: string }[] = [
    { valor: "todos", rotulo: t("filtros.todos") },
    ...tipos.map((tipo) => ({
      valor: tipo,
      rotulo: t(`projeto.tipo.${tipo}`),
    })),
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label={t("nav.projetos")}
    >
      {opcoes.map((op) => {
        const ativo = filtro === op.valor;
        return (
          <button
            key={op.valor}
            type="button"
            onClick={() => onMudar(op.valor)}
            aria-pressed={ativo}
            className={`focus-vm rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
              ativo
                ? "border-[var(--accent)] bg-[var(--accent-suave)] text-[var(--accent)]"
                : "border-[var(--borda)] text-[var(--texto-muted)] hover:border-[var(--accent)] hover:text-[var(--texto)]"
            }`}
          >
            {op.rotulo}
            <span className="ml-1.5 opacity-70">({contagem(op.valor)})</span>
          </button>
        );
      })}
    </div>
  );
}
