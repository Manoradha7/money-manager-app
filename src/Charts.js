import React from "react";
import { PieChart, Pie, Legend, Cell } from "recharts";

export function Charts({income,expense}) {
  // data for the chart
  const data = [
    { name: "Income", value:{income} },
    { name: "Expense", value: {expense}}  ];

  // color for the charts to display
  const colors = ["skyblue", "green"];
  return (
    <div style={{ width: "auto", backgroundColor: "white" }}>
      <PieChart width={320} height={400}>
        <Pie
          data={data}
          cx={50}
          cy={60}
          innerRadius={70}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          label="true"
          legendType="circle"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={46} />
      </PieChart>
    </div>
  );
}
