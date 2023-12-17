import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export type BarChartProps = {
  data: ({ name: string } & Record<string, any>)[];
  keys: { key: string, color: string; }[];
}

const Component: React.FC<BarChartProps> = ({ data, keys }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" tickFormatter={(v: string) => `${v.slice(0, 3)}/${v.slice(-2)}`} />
        <Tooltip formatter={(v) => Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "BRL",
        }).format(+v)} separator=': ' />
        <Legend />
        {keys.map(({ key, color }) => (
          <Bar key={key} dataKey={key} fill={color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

Component.displayName = 'BarChart';

export {
  Component as BarChart
}