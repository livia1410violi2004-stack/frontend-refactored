import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Package, FileText, ClipboardList,
  ShoppingCart, Warehouse, BarChart3, UserCog, Settings, Wrench, Landmark,
} from "lucide-react";
import { AbsolutaLogo } from "../Logo";
import { NAV } from "../../constants/testIds";

const NAV_ITEMS = [
  { key: "dashboard", to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { key: "clientes", to: "/clientes", icon: Users, label: "Clientes" },
  { key: "produtos", to: "/produtos", icon: Package, label: "Produtos" },
  { key: "orcamentos", to: "/orcamentos", icon: FileText, label: "Orçamentos" },
  { key: "pedidos", to: "/pedidos", icon: ClipboardList, label: "Pedidos" },
  { key: "compras", to: "/compras", icon: ShoppingCart, label: "Compras" },
  { key: "estoque", to: "/estoque", icon: Warehouse, label: "Estoque" },
  { key: "impostos", to: "/impostos", icon: Landmark, label: "Impostos" },
  { key: "relatorios", to: "/relatorios", icon: BarChart3, label: "Relatórios" },
  { key: "usuarios", to: "/usuarios", icon: UserCog, label: "Usuários" },
  { key: "configuracoes", to: "/configuracoes", icon: Settings, label: "Configurações" },
];

export const Sidebar = () => {
  return (
    <aside
      data-testid={NAV.sidebar}
      className="w-[260px] shrink-0 h-screen sticky top-0 flex flex-col text-neutral-200 abs-scroll"
      style={{ background: "#1D1D1C" }}
    >
      <div className="px-5 pt-6 pb-5 border-b border-neutral-800">
        <AbsolutaLogo variant="light" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="abs-label px-3 pb-2 text-neutral-500">Operação</div>
        {NAV_ITEMS.slice(0, 8).map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            end={it.to === "/"}
            data-testid={NAV.link(it.key)}
            className={({ isActive }) => `abs-sidebar-link ${isActive ? "active" : ""}`}
          >
            <it.icon size={17} strokeWidth={1.75} />
            <span>{it.label}</span>
          </NavLink>
        ))}

        <div className="abs-label px-3 pt-4 pb-2 text-neutral-500">Sistema</div>
        {NAV_ITEMS.slice(8).map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            data-testid={NAV.link(it.key)}
            className={({ isActive }) => `abs-sidebar-link ${isActive ? "active" : ""}`}
          >
            <it.icon size={17} strokeWidth={1.75} />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-400">
        <Wrench size={14} className="text-[#F2A900]" />
        <div className="font-mono">v0.1.0 · MOCK MODE</div>
      </div>
    </aside>
  );
};
