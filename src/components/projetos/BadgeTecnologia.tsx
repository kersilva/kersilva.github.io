import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const icones: Record<string, string> = {
  HTML: "html5",
  CSS: "css",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  jQuery: "jquery",
  Tailwind: "tailwindcss",
  Bootstrap: "bootstrap",
  PHP: "php",
  Python: "python",
  "Node.js": "nodedotjs",
  Flask: "flask",
  "Express.js": "express",
  Fastify: "fastify",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MariaDB: "mariadb",
  Git: "git",
  Docker: "docker",
  XAMPP: "xampp",
  Figma: "figma",
};

const iconesPequenos = ["HTML", "CSS", "JavaScript", "TypeScript", "jQuery", "Python", "Flask", "XAMPP", "Git"];
const iconesGrandes = ["MySQL"];

const tamanhoPadrao = "size-4";
const tamanhoPequeno = "size-3.25";
const tamanhoGrande = "size-6";

export function BadgeTecnologia({
  nome,
  className,
  variant,
}: {
  nome: string;
  className?: string;
  variant?: "default" | "accent" | null | undefined
}) {
  const slug = icones[nome];
  const [logoFalhou, setLogoFalhou] = useState(false);
  const src =
    nome === "AWS"
      ? "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg"
      : slug
        ? `https://cdn.simpleicons.org/${slug}/a8a29e`
        : undefined;
  const iconSizeClass = iconesPequenos.includes(nome)
    ? tamanhoPequeno
    : iconesGrandes.includes(nome)
      ? tamanhoGrande
      : tamanhoPadrao;

  return (
    <Badge variant={variant} className={`${className} min-h-6.5`}>
      {src && !logoFalhou ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`tech-logo ${iconSizeClass} object-contain`}
          loading="lazy"
          onError={() => setLogoFalhou(true)}
        />
      ) : null}
      {nome}
    </Badge>
  );
}
