import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bug, Droplets, CloudRain, TrendingDown } from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: "weather",
      severity: "high",
      title: "Heavy Rain Warning",
      message: "Heavy rainfall expected in next 6 hours. Consider harvesting ready crops.",
      time: "2 hours ago",
      icon: <CloudRain className="h-4 w-4" />
    },
    {
      id: 2,
      type: "pest",
      severity: "medium",
      title: "Pest Activity Detected",
      message: "Increased aphid activity in corn field sector 3. Treatment recommended.",
      time: "5 hours ago",
      icon: <Bug className="h-4 w-4" />
    },
    {
      id: 3,
      type: "soil",
      severity: "low",
      title: "Low Soil Moisture",
      message: "Soil moisture in wheat field dropped below optimal levels.",
      time: "1 day ago",
      icon: <Droplets className="h-4 w-4" />
    },
    {
      id: 4,
      type: "market",
      severity: "medium",
      title: "Price Drop Alert",
      message: "Corn prices decreased by 8% in the last week. Monitor market trends.",
      time: "2 days ago",
      icon: <TrendingDown className="h-4 w-4" />
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case "high": return "border-l-destructive";
      case "medium": return "border-l-warning";
      case "low": return "border-l-secondary";
      default: return "border-l-muted";
    }
  };

  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No active alerts</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border-l-4 bg-card rounded-r-lg shadow-soft ${getSeverityBorder(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-muted-foreground mt-0.5">
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                    <Badge variant="secondary" className={`text-xs ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-2">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  Dismiss
                </Button>
                <Button size="sm" className="h-8 px-3 text-xs">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
      
      {alerts.length > 0 && (
        <div className="text-center pt-2">
          <Button variant="outline" size="sm">
            View All Alerts
          </Button>
        </div>
      )}
    </div>
  );
};