import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { chartSegmentos } from "../../mocks/data";

const COLORS = ["#F2A900", "#1D1D1C", "#6B7280", "#B45309", "#404040"];

const TT = ({ active, payload }) =>
  active && payload?.length ? (
    <div className="bg-white border border-neutral-200 rounded-sm px-3 py-2 shadow-sm">
      <div className="abs-label mb-1">{payload[0].name}</div>
      <div className="font-mono text-sm font-semibold text-[#1D1D1C]">{payload[0].value}%</div>
    </div>
  ) : null;

export const CustomersChart = ({ data = chartSegmentos }) => (
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie
        data={data}
        dataKey="valor"
        nameKey="segmento"
        cx="42%"
        cy="50%"
        innerRadius={60}
        outerRadius={92}
        paddingAngle={2}
        stroke="#FFFFFF"
        strokeWidth={2}
      >
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<TT />} />
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        iconType="square"
        wrapperStyle={{ fontSize: 12, color: "#1D1D1C" }}
      />
    </PieChart>
  </ResponsiveContainer>
);
