import React from "react";

const MetricCard = ({ title, value, subtext }) => (
    <div className="bg-gray-800 p-4 rounded shadow text-center">
      <h3 className="text-blue-400 text-lg mb-2">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-400 text-sm">{subtext}</div>
    </div>
  );
  
  export default MetricCard;