import React from "react";
import { Download, FileSpreadsheet, FileText, FileDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { EXPORT } from "../constants/testIds";

/**
 * Botão + menu de exportação (CSV / XLSX / PDF).
 * Recebe callbacks onExportCSV / onExportXLSX / onExportPDF.
 */
export const ExportMenu = ({ onExportCSV, onExportXLSX, onExportPDF, label = "Exportar" }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button data-testid={EXPORT.menu} className="abs-btn-ghost">
        <Download size={14} /> {label}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48 rounded-sm">
      <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-neutral-500">Formato</DropdownMenuLabel>
      <DropdownMenuItem data-testid={EXPORT.xlsx} onClick={onExportXLSX} className="cursor-pointer">
        <FileSpreadsheet size={14} className="mr-2 text-emerald-600" /> Excel (.xlsx)
      </DropdownMenuItem>
      <DropdownMenuItem data-testid={EXPORT.csv} onClick={onExportCSV} className="cursor-pointer">
        <FileText size={14} className="mr-2 text-neutral-700" /> CSV (.csv)
      </DropdownMenuItem>
      <DropdownMenuItem data-testid={EXPORT.pdf} onClick={onExportPDF} className="cursor-pointer">
        <FileDown size={14} className="mr-2 text-red-600" /> PDF (.pdf)
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
