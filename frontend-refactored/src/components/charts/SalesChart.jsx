import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { chartVendasMes } from "../../mocks/data";

const fmt = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);

const TT = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="bg-white border border-neutral-200 rounded-sm px-3 py-2 shadow-sm">
      <div className="abs-label mb-1">{label}</div>
      <div className="font-mono text-sm font-semibold text-[#1D1D1C]">{fmt(payload[0].value)}</div>
    </div>
  ) : null;

export const SalesChart = ({ data = chartVendasMes }) => (
  <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2A900" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#F2A900" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
      <XAxis dataKey="mes" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
      <YAxis
        tick={{ fill: "#6B7280", fontSize: 11 }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => `R$${Math.round(v / 1000)}k`}
      />
      <Tooltip content={<TT />} cursor={{ stroke: "#1D1D1C", strokeDasharray: "3 3" }} />
      <Area
        type="monotone"
        dataKey="vendas"
        stroke="#F2A900"
        strokeWidth={2.5}
        fill="url(#salesFill)"
        dot={{ r: 3, fill: "#1D1D1C", stroke: "#F2A900", strokeWidth: 2 }}
        activeDot={{ r: 5, fill: "#F2A900", stroke: "#1D1D1C", strokeWidth: 2 }}
      />
    </AreaChart>
  </ResponsiveContainer>
);
