import { useState, useEffect } from 'react';

export function LiveTelemetry() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="telemetry-bar">
      <div className="telemetry-item">
        <span className="telemetry-pulse" />
        <span className="telemetry-label">SYSTEM ONLINE</span>
      </div>
      <div className="telemetry-sep">/</div>
      <div className="telemetry-item">
        <span className="telemetry-dim">LOC:</span>
        <span className="telemetry-val">BENGALURU [12.97°N, 77.59°E]</span>
      </div>
      <div className="telemetry-sep">/</div>
      <div className="telemetry-item">
        <span className="telemetry-dim">IST:</span>
        <span className="telemetry-val font-mono">{timeStr || '11:48:00 AM'}</span>
      </div>
    </div>
  );
}
