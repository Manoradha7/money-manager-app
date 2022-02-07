import React from "react";
import { PieChart, Pie,  Cell } from "recharts";

export function Charts({income,expense}) {
  // data for the chart
  const data = [
    { value:income,name: "Income" },
    { value: expense,name: "Expense"}  ];
// console.log(income)
  // color for the charts to display
  const colors = ["green", "red"];
  return (
    <div className="chart">
      <PieChart width={240} height={210}>
      <Pie data={data} dataKey="value" cx={106} cy={96} innerRadius={60} outerRadius={70} fill="#82ca9d" label >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        {/* <Legend verticalAlign="bottom" height={46} /> */}
      </PieChart>
    </div>
  );
}
