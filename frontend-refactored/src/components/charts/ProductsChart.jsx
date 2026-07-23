import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { chartTopProdutos } from "../../mocks/data";

const TT = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="bg-white border border-neutral-200 rounded-sm px-3 py-2 shadow-sm">
      <div className="abs-label mb-1">{label}</div>
      <div className="font-mono text-sm font-semibold text-[#1D1D1C]">
        {payload[0].value.toLocaleString("pt-BR")} un
      </div>
    </div>
  ) : null;

export const ProductsChart = ({ data = chartTopProdutos }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }} barCategoryGap={12}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
      <XAxis
        dataKey="produto"
        tick={{ fill: "#6B7280", fontSize: 10 }}
        axisLine={false}
        tickLine={false}
        interval={0}
        angle={-12}
        textAnchor="end"
        height={50}
      />
      <YAxis
        tick={{ fill: "#6B7280", fontSize: 11 }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
      />
      <Tooltip content={<TT />} cursor={{ fill: "rgba(29,29,28,0.04)" }} />
      <Bar dataKey="qtd" radius={[2, 2, 0, 0]}>
        {data.map((_, i) => (
          <Cell key={i} fill={i === 0 ? "#F2A900" : "#1D1D1C"} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
