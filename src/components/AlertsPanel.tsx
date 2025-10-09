import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Alert {
  id: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  created_at: string;
}

const SAMPLE_ALERTS: Alert[] = [
  { id: '1', type: 'Pest Alert', severity: 'High', description: 'Aphid infestation detected in Field A', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '2', type: 'Weather Warning', severity: 'Medium', description: 'Heavy rainfall expected in next 48 hours', created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
  { id: '3', type: 'Soil Health', severity: 'Low', description: 'pH levels slightly below optimal in Field B', created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: '4', type: 'Irrigation', severity: 'Medium', description: 'Water pressure low in Zone 3', created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
  { id: '5', type: 'Disease Alert', severity: 'High', description: 'Fungal infection signs in wheat crop', created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
];

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sample data
    setTimeout(() => {
      setAlerts(SAMPLE_ALERTS);
      setLoading(false);
    }, 500);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4">
      {loading && <p className="text-muted-foreground">Loading alerts...</p>}
      {!loading && alerts.length === 0 && <p className="text-muted-foreground">No recent alerts.</p>}
      {!loading && alerts.map((alert) => (
        <div key={alert.id} className="p-4 border border-border rounded-lg bg-card hover:shadow-soft transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-card-foreground">{alert.type}</span>
              <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity}</Badge>
            </div>
            <span className="text-sm text-muted-foreground">{new Date(alert.created_at).toLocaleTimeString()}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel;