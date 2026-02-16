"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function OrderChart() {
  return (
    <>
      <div className="chart px-6 py-4 bg-[#30343d] rounded-lg h-full">
        <div className="flex flex-col gap-2 h-full">
          <h3 className="text-lg">Sales Overview</h3>
          <LineChart
            style={{ width: "100%", height: "100%", maxHeight: "500px" }}
            responsive
            data={[
              { x: "Jan", y: 3 },
              { x: "Feb", y: 1 },
              { x: "Mar", y: 1 },
              { x: "Apr", y: 7 },
              { x: "May", y: 1 },
            ]}
            margin={{
              top: 20,
              right: 20,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid stroke="#ffff" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#9e1c3b"
              strokeWidth={2}
              name="Orders"
            />
            <XAxis dataKey="x" />
            <YAxis
              width="auto"
              label={{ position: "insideLeft", angle: -90 }}
            />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </>
  );
}
