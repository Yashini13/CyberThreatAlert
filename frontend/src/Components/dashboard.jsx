

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

  // Function to simulate fluctuating traffic data
  const simulateTrafficData = () => {
    return {
      total: (Math.random() * 1000).toFixed(2),
      incoming: (Math.random() * 500).toFixed(2),
      outgoing: (Math.random() * 500).toFixed(2),
      blocked: (Math.random() * 100).toFixed(2),
    };
  };

  // Function to simulate fluctuating threat logs
  const simulateThreatLogs = () => {
    return [
      {
        type: "DDoS Attack",
        severity: "Critical",
        source_ip: "192.168.0.1",
        destination_ip: "10.0.0.1",
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        type: "SQL Injection",
        severity: "High",
        source_ip: "192.168.0.2",
        destination_ip: "10.0.0.2",
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
  };

  // System Health Data: Adding Total Attacks
  const getSystemHealthData = () => {
    const cpuCores = navigator.hardwareConcurrency; // Number of logical CPU cores
    const memory = window.performance.memory || { totalJSHeapSize: 0, usedJSHeapSize: 0 }; // Memory usage in MB

    // Count the number of attacks from the logs
    const totalAttacks = threatLog.length;

    return {
      cpu: cpuCores,
      memory: {
        total: memory.totalJSHeapSize / 1024 / 1024, // in MB
        used: memory.usedJSHeapSize / 1024 / 1024, // in MB
      },
      totalAttacks, // Adding total attacks here
    };
  };

  const [systemHealth, setSystemHealth] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (monitoringActive) {
        setTrafficData(simulateTrafficData());
        setTimeSeriesData(generateTimeSeriesData());
        setThreatLog(simulateThreatLogs());
        setSystemHealth(getSystemHealthData()); // Update system health data
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [monitoringActive, threatLog]);

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
              {monitoringActive ? "Scanning Inactive" : "Scanning Active"}
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            {["dashboard", "logs", "system Health"].map((tab) => (
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
                <MetricCard title="Total Packets Analysed" value={`${trafficData.total} Mb/s`} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
                <MetricCard title="Blocked Traffic" value={`${trafficData.blocked} Mb/s`} subtext="Threats Mitigated" />
                <MetricCard title="System Uptime" value="99.98%" subtext="Last 24 Hours" />
                <MetricCard title="Current Traffic" value={`${trafficData.total} Mb/s`} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
                <MetricCard title="Source Ports" value={'30'} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
                <MetricCard title="Destination Ports" value={`${trafficData.total} Mb/s`} subtext={`↑ ${trafficData.incoming} Mb/s | ↓ ${trafficData.outgoing} Mb/s`} />
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

          {activeTab === "system Health" && systemHealth && (
            <div>
              <h2 className="text-2xl font-bold mb-4">System Health Monitoring</h2>

              {/* CPU Usage */}
              <div className="p-4 bg-gray-800 rounded shadow mb-4">
                <h3 className="font-bold text-xl">CPU Cores</h3>
                <p className="text-gray-400">Total CPU Cores: {systemHealth.cpu}</p>
              </div>

              {/* Memory Usage */}
              <div className="p-4 bg-gray-800 rounded shadow mb-4">
                <h3 className="font-bold text-xl">Memory Usage</h3>
                <p className="text-gray-400">Total Memory: {systemHealth.memory.total.toFixed(2)} MB</p>
                <p className="text-gray-400">Used Memory: {systemHealth.memory.used.toFixed(2)} MB</p>
              </div>

              {/* Total Attacks */}
              <div className="p-4 bg-gray-800 rounded shadow">
                <h3 className="font-bold text-xl">Total Attacks Detected</h3>
                <p className="text-gray-400">Total Attacks: {systemHealth.totalAttacks}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurityDashboard;
