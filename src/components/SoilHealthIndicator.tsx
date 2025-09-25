import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, Thermometer, Beaker } from "lucide-react";

export const SoilHealthIndicator = () => {
  const soilMetrics = [
    {
      name: "Moisture",
      value: 68,
      optimal: "60-75%",
      status: "Good",
      icon: <Droplets className="h-4 w-4" />,
      color: "text-sky-blue"
    },
    {
      name: "pH Level",
      value: 6.8,
      optimal: "6.0-7.5",
      status: "Optimal",
      icon: <Beaker className="h-4 w-4" />,
      color: "text-success",
      isDecimal: true
    },
    {
      name: "Temperature",
      value: 22,
      optimal: "18-25°C",
      status: "Good",
      icon: <Thermometer className="h-4 w-4" />,
      color: "text-warning"
    },
    {
      name: "Nutrients",
      value: 84,
      optimal: "80-100%",
      status: "Good",
      icon: <Zap className="h-4 w-4" />,
      color: "text-success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimal": return "text-success";
      case "Good": return "text-success";
      case "Fair": return "text-warning";
      case "Poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getProgressValue = (metric: any) => {
    if (metric.isDecimal) {
      // Convert pH to percentage for progress bar
      return (metric.value / 14) * 100;
    }
    return metric.value;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Soil Analysis</div>
      
      {soilMetrics.map((metric, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={metric.color}>{metric.icon}</div>
              <span className="text-sm font-medium text-foreground">{metric.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {metric.isDecimal ? metric.value : `${metric.value}%`}
            </div>
          </div>
          <Progress value={getProgressValue(metric)} className="h-2" />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Optimal: {metric.optimal}</span>
            <span className={getStatusColor(metric.status)}>{metric.status}</span>
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-earth-light/20 rounded-lg border border-earth-brown/20">
        <div className="text-sm font-medium text-earth-brown mb-1">Recommendation</div>
        <div className="text-xs text-muted-foreground">
          Consider adding nitrogen-rich fertilizer to boost nutrient levels. 
          Soil moisture is within optimal range.
        </div>
      </div>
    </div>
  );
};