// src/components/AlertsPanel.tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface Alert {
  id: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  created_at: string;
}

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialAlerts = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) {
        setAlerts(data as Alert[]);
      }
      if (error) {
        console.error("Error fetching initial alerts:", error);
      }
      setLoading(false);
    };

    const alertsChannel = supabase
      .channel('alerts_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alerts' },
        (payload: RealtimePostgresChangesPayload<Alert>) => {
          if (payload.new) {
            setAlerts((currentAlerts) => [payload.new as Alert, ...currentAlerts.slice(0, 4)]);
            console.log('New Alert Received in Realtime:', payload.new);
          }
        }
      )
      .subscribe();

    fetchInitialAlerts();

    return () => {
      alertsChannel.unsubscribe();
    };
  }, []);

  return (
    <div className="alerts-panel">
      <h2>Recent Alerts</h2>
      {loading && <p>Loading alerts...</p>}
      {!loading && alerts.length === 0 && <p>No recent alerts.</p>}
      {!loading && alerts.map((alert) => (
        <div key={alert.id} className={`alert-item alert-${alert.severity.toLowerCase()}`}>
          <div className="alert-header">
            <span className="alert-type">{alert.type} - <b>{alert.severity}</b></span>
            <span className="alert-time">{new Date(alert.created_at).toLocaleTimeString()}</span>
          </div>
          <p className="alert-description">{alert.description}</p>
          <button 
                className="view-button"
                onClick={() => navigate(`/alerts/${alert.id}`)}
            >
                View
            </button>
        </div>
      ))}
      <button 
          className="view-all-button"
          onClick={() => navigate('/alerts/all')}
      >
          View All Alerts
      </button>
    </div>
  );
};

export default AlertsPanel;