import React from "react";

const MAP = {
  Aberto:     { bg: "#F5F5F5", fg: "#1D1D1C", bd: "#E5E7EB" },
  Enviado:    { bg: "#EFF6FF", fg: "#1D4ED8", bd: "#BFDBFE" },
  Negociação: { bg: "#FFFBEB", fg: "#B45309", bd: "#FDE68A" },
  Aprovado:   { bg: "#ECFDF5", fg: "#047857", bd: "#A7F3D0" },
  Cancelado:  { bg: "#FEF2F2", fg: "#B91C1C", bd: "#FECACA" },
  Separação:  { bg: "#FFFBEB", fg: "#B45309", bd: "#FDE68A" },
  Produção:   { bg: "#EFF6FF", fg: "#1D4ED8", bd: "#BFDBFE" },
  Envio:      { bg: "#F5F3FF", fg: "#6D28D9", bd: "#DDD6FE" },
  Finalizado: { bg: "#ECFDF5", fg: "#047857", bd: "#A7F3D0" },
  Ativo:      { bg: "#ECFDF5", fg: "#047857", bd: "#A7F3D0" },
  Inativo:    { bg: "#F5F5F5", fg: "#525252", bd: "#E5E5E5" },
  Entrada:    { bg: "#ECFDF5", fg: "#047857", bd: "#A7F3D0" },
  Saída:      { bg: "#FEF2F2", fg: "#B91C1C", bd: "#FECACA" },
  Pendente:   { bg: "#FFFBEB", fg: "#B45309", bd: "#FDE68A" },
  "Em cotação": { bg: "#F5F5F5", fg: "#1D1D1C", bd: "#E5E7EB" },
  Aprovada:   { bg: "#ECFDF5", fg: "#047857", bd: "#A7F3D0" },
  Recebida:   { bg: "#F5F3FF", fg: "#6D28D9", bd: "#DDD6FE" },
};

export const StatusBadge = ({ status }) => {
  const c = MAP[status] || { bg: "#F5F5F5", fg: "#1D1D1C", bd: "#E5E7EB" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-sm border"
      style={{ background: c.bg, color: c.fg, borderColor: c.bd }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.fg }} />
      {status}
    </span>
  );
};
