import * as React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";

export default function ProductChart(props: { data: any }) {
  const { data } = props;
  return (
    <>
      <LineChart
        width={window.screen.width * 0.8}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          connectNulls
          type="monotone"
          dataKey={"amazon"}
          stroke="#8884d8"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey={"facebook"}
          stroke="#82ca9d"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey={"google"}
          stroke="#ffc658"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey={"linkedin"}
          stroke="#4484d8"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey={"twitter"}
          stroke="#32ca9d"
        />
      </LineChart>
    </>
  );
}
