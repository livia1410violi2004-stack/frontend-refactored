import React from "react";
import { Bell, Search, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AUTH, NAV } from "../../constants/testIds";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const Header = ({ title, subtitle, actions }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200 flex items-center px-6 gap-4">
      <div className="flex-1 min-w-0">
        {title && <h1 className="font-heading text-xl font-semibold text-[#1D1D1C] leading-none truncate">{title}</h1>}
        {subtitle && <div className="text-xs text-neutral-500 mt-1 truncate">{subtitle}</div>}
      </div>

      <div className="hidden md:flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-sm px-3 py-1.5 w-64">
        <Search size={14} className="text-neutral-400" />
        <input
          placeholder="Buscar em todo o sistema..."
          className="bg-transparent text-sm outline-none flex-1 placeholder:text-neutral-400"
        />
        <kbd className="text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200 px-1.5 py-0.5 rounded">⌘K</kbd>
      </div>

      {actions}

      <button
        data-testid={NAV.headerNotifications}
        className="relative p-2 rounded-sm hover:bg-neutral-100 transition-colors"
        aria-label="Notificações"
      >
        <Bell size={18} className="text-neutral-700" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F2A900]" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            data-testid={NAV.headerUser}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-sm hover:bg-neutral-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-sm bg-[#1D1D1C] text-[#F2A900] font-semibold text-xs flex items-center justify-center font-heading">
              {user?.avatar || "AB"}
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-sm font-semibold text-[#1D1D1C]">{user?.name || "Usuário"}</div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-500">{user?.role}</div>
            </div>
            <ChevronDown size={14} className="text-neutral-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 rounded-sm">
          <DropdownMenuLabel className="font-mono text-[11px]">{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Meu perfil</DropdownMenuItem>
          <DropdownMenuItem>Preferências</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            data-testid={AUTH.logoutBtn}
            onClick={handleLogout}
            className="text-red-600 focus:text-red-700"
          >
            <LogOut size={14} className="mr-2" /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
