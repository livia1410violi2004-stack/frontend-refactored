import React from "react";

export const PageHeader = ({ title, description, actions }) => (
  <div className="flex items-start justify-between gap-6 mb-6">
    <div className="min-w-0">
      <div className="abs-label text-neutral-500">Módulo</div>
      <h1 className="font-heading text-[26px] font-bold tracking-tight text-[#1D1D1C] leading-tight mt-1">{title}</h1>
      {description && <p className="text-sm text-neutral-500 mt-1 max-w-2xl">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);
