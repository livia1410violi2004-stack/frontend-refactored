import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { chartOrcamentos } from "../../mocks/data";

const TT = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="bg-white border border-neutral-200 rounded-sm px-3 py-2 shadow-sm">
      <div className="abs-label mb-1">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
          <span className="text-neutral-600">{p.name}:</span>
          <span className="font-mono font-semibold text-[#1D1D1C]">{p.value}</span>
        </div>
      ))}
    </div>
  ) : null;

export const QuotesChart = ({ data = chartOrcamentos }) => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
      <XAxis dataKey="semana" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
      <Tooltip content={<TT />} />
      <Legend wrapperStyle={{ fontSize: 12 }} />
      <Line type="monotone" dataKey="abertos" name="Abertos" stroke="#1D1D1C" strokeWidth={2.5} dot={{ r: 3 }} />
      <Line type="monotone" dataKey="aprovados" name="Aprovados" stroke="#F2A900" strokeWidth={2.5} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
);
