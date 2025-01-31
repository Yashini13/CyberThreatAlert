export const fetchRealTimeData = () => ({
    incoming: Math.floor(Math.random() * 100) + 50,
    outgoing: Math.floor(Math.random() * 80) + 30,
    total: Math.floor(Math.random() * 150) + 100,
    blocked: Math.floor(Math.random() * 40) + 10
  });
  
  export const generateTimeSeriesData = () => {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(now - i * 60000).toLocaleTimeString(),
      traffic: Math.floor(Math.random() * 1000) + 500,
      anomalyScore: Math.random()
    }));
  };
  

  const generateThreatData = () => {
    return {
      type: "DDoS Attack",
      severity: "High",
      source_ip: "192.168.1.100",
      destination_ip: "192.168.1.1",
      timestamp: new Date().toISOString()
    };
  };
  
  export { generateThreatData };
  