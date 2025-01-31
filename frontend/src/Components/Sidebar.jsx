

// // const Sidebar = ({ alertThreshold, setAlertThreshold, scanInterval, setScanInterval }) => (
// //     <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 border-r border-gray-700">
// //       <h2 className="text-xl font-bold mb-6">🔧 Configuration</h2>
// //       <div className="space-y-6">
// //         <div>
// //           <h3 className="text-lg font-semibold mb-2">Monitoring Settings</h3>
// //           <input
// //             type="range"
// //             min="0"
// //             max="1000"s
// //             value={alertThreshold}
// //             onChange={(e) => setAlertThreshold(Number(e.target.value))}
// //             className="w-full bg-gray-700"
// //           />
// //           <select 
// //             value={scanInterval}
// //             onChange={(e) => setScanInterval(e.target.value)}
// //             className="mt-2 w-full bg-gray-700 p-2 rounded"
// //           >
// //             <option>30 seconds</option>
// //             <option>1 minute</option>
// //             <option>5 minutes</option>
// //           </select>
// //         </div>
// //       </div>
// //     </div>
// //   );
  
// //   export default Sidebar;

// // Sidebar.js
// import React, { useState } from "react";
// import { FiMenu, FiSliders, FiClock, FiShield } from "react-icons/fi";

// const Sidebar = ({ alertThreshold, setAlertThreshold, scanInterval, setScanInterval }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div
//       className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-all ${
//         isOpen ? "w-64 p-6" : "w-20 p-2"
//       } border-r border-gray-700`}
//     >
//       <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-6 flex items-center">
//         <FiMenu size={24} />
//       </button>

//       <h2 className={`text-xl font-bold ${isOpen ? "mb-6" : "hidden"}`}>🔧 Configuration</h2>

//       <div className="space-y-6">
//         <div>
//           <h3 className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}>Monitoring Settings</h3>
//           <div className="flex items-center gap-2">
//             <FiShield size={20} />
//             {isOpen && <span>Alert Threshold</span>}
//           </div>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={alertThreshold}
//             onChange={(e) => setAlertThreshold(Number(e.target.value))}
//             className="w-full bg-gray-700 mt-2"
//           />

//           <div className="flex items-center gap-2 mt-4">
//             <FiClock size={20} />
//             {isOpen && <span>Scan Interval</span>}
//           </div>
//           <select
//             value={scanInterval}
//             onChange={(e) => setScanInterval(e.target.value)}
//             className="mt-2 w-full bg-gray-700 p-2 rounded"
//           >
//             <option>30 seconds</option>
//             <option>1 minute</option>
//             <option>5 minutes</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// // // NetworkSecurityDashboard.js
// // import React, { useState } from "react";
// // import Sidebar from "./Sidebar";
// // import MetricCard from "./Components/MetricCard";
// // import TrafficChart from "./Components/TrafficChart";

// // const NetworkSecurityDashboard = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [alertThreshold, setAlertThreshold] = useState(500);
// //   const [scanInterval, setScanInterval] = useState("30 seconds");

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white flex">
// //       <Sidebar 
// //         alertThreshold={alertThreshold} 
// //         setAlertThreshold={setAlertThreshold} 
// //         scanInterval={scanInterval} 
// //         setScanInterval={setScanInterval} 
// //       />

// //       <div className={`flex-1 p-6 transition-all ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
// //         <header className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold">🛡 Network Security Monitor</h1>
// //         </header>

// //         <div className="grid grid-cols-3 gap-4">
// //           <MetricCard title="Current Traffic" value="350 Mb/s" subtext="Real-time Network Load" />
// //           <MetricCard title="Blocked Threats" value="45" subtext="Potential Attacks Stopped" />
// //           <MetricCard title="System Uptime" value="99.98%" subtext="Last 24 Hours" />
// //         </div>

// //         <div className="mt-6">
// //           <TrafficChart />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NetworkSecurityDashboard;



// Sidebar.js
import React, { useState } from "react";
import { FiMenu, FiSliders, FiClock, FiShield, FiFilter, FiAlertTriangle } from "react-icons/fi";

const Sidebar = ({ alertThreshold, setAlertThreshold, scanInterval, setScanInterval }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-all ${
        isOpen ? "w-64 p-6" : "w-20 p-2"
      } border-r border-gray-700`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-6 flex items-center">
        <FiMenu size={24} />
      </button>

      <h2 className={`text-xl font-bold ${isOpen ? "mb-6" : "hidden"}`}>🔧 Configuration</h2>

      <div className="space-y-6">
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}>Monitoring Settings</h3>
          <div className="flex items-center gap-2">
            <FiShield size={20} />
            {isOpen && <span>Alert Threshold</span>}
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(Number(e.target.value))}
            className="w-full bg-gray-700 mt-2"
          />

          <div className="flex items-center gap-2 mt-4">
            <FiClock size={20} />
            {isOpen && <span>Scan Interval</span>}
          </div>
          <select
            value={scanInterval}
            onChange={(e) => setScanInterval(e.target.value)}
            className="mt-2 w-full bg-gray-700 p-2 rounded"
          >
            <option>30 seconds</option>
            <option>1 minute</option>
            <option>5 minutes</option>
          </select>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}>Filter Settings</h3>
          <div className="flex items-center gap-2">
            <FiFilter size={20} />
            {isOpen && <span>Protocols to Monitor</span>}
          </div>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> HTTP/HTTPS
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> TCP
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> UDP
            </label>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-semibold mb-2 ${isOpen ? "block" : "hidden"}`}>Alert Settings</h3>
          <div className="flex items-center gap-2">
            <FiAlertTriangle size={20} />
            {isOpen && <span>Alert Types</span>}
          </div>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Port Scan
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> DDoS Attack
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Brute Force
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;