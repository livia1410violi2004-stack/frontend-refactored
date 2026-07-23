import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const StatCard = ({ label, value, delta, deltaLabel, icon: Icon, accent, testid }) => {
  const positive = (delta || 0) >= 0;
  return (
    <div data-testid={testid} className="abs-card p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="abs-label">{label}</div>
        {Icon && (
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center"
            style={{ background: accent ? "#F2A900" : "#1D1D1C", color: accent ? "#1D1D1C" : "#F2A900" }}
          >
            <Icon size={16} strokeWidth={2} />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="font-mono text-[28px] font-semibold text-[#1D1D1C] leading-none tracking-tight">
          {value}
        </div>
      </div>
      {delta !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={`inline-flex items-center gap-0.5 font-semibold ${positive ? "text-emerald-600" : "text-red-600"}`}>
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta)}%
          </span>
          <span className="text-neutral-500">{deltaLabel || "vs. mês anterior"}</span>
        </div>
      )}
      <div
        className="absolute left-0 bottom-0 right-0 h-[3px]"
        style={{ background: accent ? "#F2A900" : "#1D1D1C" }}
      />
    </div>
  );
};
