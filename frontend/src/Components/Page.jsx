import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';

const NetworkSecurityDashboard = () => {
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [alertCount, setAlertCount] = useState(3);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [threatLog, setThreatLog] = useState([]);
  
  // Configuration states
  const [alertThreshold, setAlertThreshold] = useState(500);
  const [scanInterval, setScanInterval] = useState('30 seconds');
  const [protocolsToMonitor, setProtocolsToMonitor] = useState(['HTTP/HTTPS', 'TCP', 'UDP']);
  const [alertTypes, setAlertTypes] = useState(['Port Scan', 'DDoS Attack', 'Brute Force']);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data generation functions
  const generateTrafficData = () => ({
    incoming: Math.floor(Math.random() * 100) + 50,
    outgoing: Math.floor(Math.random() * 80) + 30,
    total: Math.floor(Math.random() * 150) + 100,
    blocked: Math.floor(Math.random() * 40) + 10
  });

  const generateTimeSeriesData = () => {
    const data = [];
    const now = new Date();
    for (let i = 19; i >= 0; i--) {
      data.push({
        time: new Date(now - i * 60000),
        traffic: Math.floor(Math.random() * 1000) + 500,
        anomalyScore: Math.random()
      });
    }
    return data;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-6">🔧 Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Monitoring Settings</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(e.target.value)}
              className="w-full bg-gray-700"
            />
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

          {/* Additional configuration options */}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">🛡 Network Security Monitor</h1>
            <p className="text-gray-400">Real-time network traffic analysis and threat detection</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMonitoringActive(!monitoringActive)}
              className={`px-4 py-2 rounded ${
                monitoringActive ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {monitoringActive ? 'Monitoring Active' : 'Monitoring Inactive'}
            </button>
            <div className="text-gray-400">
              Last Update: {Math.floor((new Date() - lastUpdate) / 1000)}s ago
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['dashboard', 'threat-hunting', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4">
                {/* Traffic Metric */}
                <MetricCard
                  title="Current Traffic"
                  value={`${generateTrafficData().total} Mb/s`}
                  subtext={`↑ ${generateTrafficData().incoming} Mb/s | ↓ ${generateTrafficData().outgoing} Mb/s`}
                />
                {/* Additional metric cards */}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded">
                  <h3 className="text-xl mb-4">Network Traffic Trend</h3>
                  <LineChart width={600} height={400} data={generateTimeSeriesData()}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="traffic" stroke="#0ea5e9" />
                    <Line type="monotone" dataKey="anomalyScore" stroke="#ef4444" />
                  </LineChart>
                </div>
                {/* Additional charts */}
              </div>
            </>
          )}
          
          {/* Additional tab content */}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtext }) => (
  <div className="bg-gray-800 p-4 rounded shadow">
    <h3 className="text-blue-400 text-lg mb-2">{title}</h3>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-gray-400 text-sm">{subtext}</div>
  </div>
);

export default NetworkSecurityDashboard;