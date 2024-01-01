import React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export type AreaChartProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: ({ name: string } & Record<string, any>)[];
	keys: { key: string; color: string }[];
};

const Component: React.FC<AreaChartProps> = ({ data, keys }) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
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
				<XAxis
					dataKey="name"
					tickFormatter={(v: string) => `${v.slice(0, 3)}/${v.slice(-2)}`}
				/>
				<YAxis
					tickFormatter={(v) =>
						Intl.NumberFormat(undefined, {
							style: "currency",
							currency: "BRL",
						}).format(+v)
					}
				/>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip
					formatter={(v) =>
						Intl.NumberFormat(undefined, {
							style: "currency",
							currency: "BRL",
						}).format(+v)
					}
					separator=": "
				/>
				<Legend />
				{keys.map(({ key, color }) => (
					<Area key={key} dataKey={key} fill={color} />
				))}
			</AreaChart>
		</ResponsiveContainer>
	);
};

Component.displayName = "AreaChart";

export { Component as AreaChart };
