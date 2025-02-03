
// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import MetricCard from "./MetricCard";
// import TrafficChart from "./TrafficChart";
// import Model from '../model'
// import { fetchRealTimeData, generateTimeSeriesData, generateThreatData } from "../data/fetchData";

// const NetworkSecurityDashboard = () => {
//   const [monitoringActive, setMonitoringActive] = useState(true);
//   const [alertThreshold, setAlertThreshold] = useState(500);
//   const [scanInterval, setScanInterval] = useState("30 seconds");
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [trafficData, setTrafficData] = useState(fetchRealTimeData());
//   const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
//   const [threatLog, setThreatLog] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTrafficData(fetchRealTimeData());
//       setTimeSeriesData(generateTimeSeriesData());
//       if (monitoringActive) {
//         setThreatLog((prevLog) => [...prevLog, generateThreatData()]);
//       }
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [monitoringActive]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex">
//       <Sidebar 
//         alertThreshold={alertThreshold} 
//         setAlertThreshold={setAlertThreshold} 
//         scanInterval={scanInterval} 
//         setScanInterval={setScanInterval} 
//       />

//       <div className="ml-64 flex-1 p-6 transition-all">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">🛡 Network Security Monitor</h1>
//           <button
//             onClick={() => setMonitoringActive(!monitoringActive)}
//             className={`px-4 py-2 rounded ${monitoringActive ? "bg-green-600" : "bg-gray-600"}`}
//           >
//             {monitoringActive ? "Monitoring Active" : "Monitoring Inactive"}
//           </button>
//         </div>

//         <div className="flex gap-2 mb-6">
//           {["dashboard", "logs"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600" : "bg-gray-700"}`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {activeTab === "dashboard" && (
//           <>
//             <div className="grid grid-cols-3 gap-4">
//               <MetricCard title="Current Traffic" value={`${trafficData.total} Mb/s`} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
//               <MetricCard title="Blocked Traffic" value={`${trafficData.blocked} Mb/s`} subtext="Threats Mitigated" />
//               <MetricCard title="System Uptime" value="99.98%" subtext="Last 24 Hours" />
//             </div>

//             <div className="mt-6">
//               <TrafficChart data={timeSeriesData} />
//             </div>
//           </>
//         )}

//         {activeTab === "logs" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Security Event Logs</h2>
//             <div className="mb-4">
//               <label>Filter by Severity: </label>
//               <select className="bg-gray-700 p-2 rounded" onChange={(e) => setThreatLog(threatLog.filter(log => log.severity === e.target.value || e.target.value === "All"))}>
//                 <option>All</option>
//                 <option>Critical</option>
//                 <option>High</option>
//                 <option>Medium</option>
//                 <option>Low</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               {threatLog.slice(-10).map((log, index) => (
//                 <div key={index} className="p-4 bg-gray-800 rounded shadow">
//                   <strong>{log.type}</strong> - {log.severity}
//                   <p className="text-sm text-gray-400">{log.source_ip} → {log.destination_ip} | {log.timestamp}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NetworkSecurityDashboard;

// // import React, { useState } from "react";
// // import axios from "axios";

// // function App() {
// //   const [features, setFeatures] = useState([6.0, 3.0, 4.5, 1.5]); // Default input
// //   const [prediction, setPrediction] = useState(null);

// //   const handlePredict = async () => {
// //     try {
// //       const response = await axios.post("http://127.0.0.1:5000/predict", {
// //         features,
// //       });
// //       setPrediction(response.data.prediction);
// //     } catch (error) {
// //       console.error("Error making prediction", error);
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "center", padding: "20px" }}>
// //       <h2>ML Model Prediction</h2>

// //       <p>Enter Features (comma-separated):</p>
// //       <input
// //         type="text"
// //         value={features.join(",")}
// //         onChange={(e) =>
// //           setFeatures(e.target.value.split(",").map((num) => parseFloat(num)))
// //         }
// //       />
// //       <br /><br />
// //       <button onClick={handlePredict}>Predict</button>
      
// //       {prediction !== null && <h3>Prediction: {prediction}</h3>}

// //       <h3>Test Different Cases:</h3>
// //       <button onClick={() => setFeatures([6.0, 3.0, 4.5, 1.5])}>
// //         Class 1 (Versicolor)
// //       </button>
// //       <button onClick={() => setFeatures([7.5, 3.2, 6.5, 2.1])}>
// //         Class 2 (Virginica)
// //       </button>
// //       <button onClick={() => setFeatures([5.1, 3.5, 1.4, 0.2])}>
// //         Class 0 (Setosa)
// //       </button>
// //     </div>
// //   );
// // }

// // export default App;



import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MetricCard from "./MetricCard";
import TrafficChart from "./TrafficChart";
import ParticleBackground from "./ParticleBackground";
import { fetchRealTimeData, generateTimeSeriesData, generateThreatData } from "../data/fetchData";

const NetworkSecurityDashboard = () => {
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(500);
  const [scanInterval, setScanInterval] = useState("30 seconds");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [trafficData, setTrafficData] = useState(fetchRealTimeData());
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData());
  const [threatLog, setThreatLog] = useState([]);

  return (
    <div className="min-h-screen text-white flex relative">
      <ParticleBackground />
      <Sidebar 
        alertThreshold={alertThreshold} 
        setAlertThreshold={setAlertThreshold} 
        scanInterval={scanInterval} 
        setScanInterval={setScanInterval} 
      />

      <div className="ml-64 flex-1 p-6 transition-all">
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">🛡 Network Security Monitor</h1>
            <button
              onClick={() => setMonitoringActive(!monitoringActive)}
              className={`px-4 py-2 rounded ${monitoringActive ? "bg-green-600" : "bg-gray-600"}`}
            >
              {monitoringActive ? "Monitoring Active" : "Monitoring Inactive"}
            </button>
          </div>

          {/* Rest of your dashboard content */}
          <div className="flex gap-2 mb-6">
          {["dashboard", "logs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600" : "bg-gray-700"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <MetricCard title="Current Traffic" value={`${trafficData.total} Mb/s`} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
              <MetricCard title="Blocked Traffic" value={`${trafficData.blocked} Mb/s`} subtext="Threats Mitigated" />
              <MetricCard title="System Uptime" value="99.98%" subtext="Last 24 Hours" />
            </div>

            <div className="mt-6">
              <TrafficChart data={timeSeriesData} />
            </div>
          </>
        )}

        {activeTab === "logs" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Security Event Logs</h2>
            <div className="mb-4">
              <label>Filter by Severity: </label>
              <select className="bg-gray-700 p-2 rounded" onChange={(e) => setThreatLog(threatLog.filter(log => log.severity === e.target.value || e.target.value === "All"))}>
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="space-y-2">
              {threatLog.slice(-10).map((log, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded shadow">
                  <strong>{log.type}</strong> - {log.severity}
                  <p className="text-sm text-gray-400">{log.source_ip} → {log.destination_ip} | {log.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

        </div>
      </div>

  );
};

export default NetworkSecurityDashboard;