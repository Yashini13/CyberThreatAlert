import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const TrafficChart = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded">
    <h3 className="text-xl mb-4">📊 Network Traffic Trend</h3>
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="traffic" stroke="#0ea5e9" />
      <Line type="monotone" dataKey="anomalyScore" stroke="#ef4444" />
    </LineChart>
  </div>
);

export default TrafficChart;
