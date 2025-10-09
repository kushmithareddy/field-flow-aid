import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, Thermometer, Beaker, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Define a type for the dynamic data that will be fetched and processed
interface SoilMetric {
  name: string;
  value: number | string; // Value can be a number (for %) or string (for pH)
  optimal: string;
  status: string;
  icon: JSX.Element;
  color: string;
  isDecimal?: boolean;
}

export const SoilHealthIndicator = () => {
  const [soilMetrics, setSoilMetrics] = useState<SoilMetric[]>([]);
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // --- Utility Functions (Keep the original logic) ---
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
    if (metric.name === "pH Level") {
      // Scale pH (max 14) to 100% for the progress bar display
      return (parseFloat(metric.value) / 14) * 100; 
    }
    // Scale Nutrients (0-100%)
    if (metric.name === "Nutrients") {
        return metric.value;
    }
    // Scale Moisture (0-100%)
    if (metric.name === "Moisture") {
        return metric.value;
    }
    // For Temperature, you'll need a specific scale if you want a meaningful bar
    // For now, we'll return a placeholder value for Temp
    return 50; 
  };
  
  // --- Data Fetching and Logic ---
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const newMetrics: SoilMetric[] = [
        { name: "Moisture", value: 45, optimal: "40-60%", status: "Good", icon: <Droplets className="h-4 w-4" />, color: "text-accent" },
        { name: "pH Level", value: "6.8", optimal: "6.0-7.0", status: "Optimal", icon: <Beaker className="h-4 w-4" />, color: "text-success", isDecimal: true },
        { name: "Temperature", value: 22, optimal: "18-25°C", status: "Good", icon: <Thermometer className="h-4 w-4" />, color: "text-warning" },
        { name: "Nutrients", value: 78, optimal: "70-90%", status: "Good", icon: <Zap className="h-4 w-4" />, color: "text-success" },
      ];
      setSoilMetrics(newMetrics);
      setRecommendation("Apply balanced NPK fertilizer next week.");
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // --- Rendering ---
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Soil Analysis</div>
      
      {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-primary">Analyzing Soil...</span>
          </div>
      ) : (
          soilMetrics.map((metric, index) => (
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
          ))
      )}

      <div className="mt-4 p-3 bg-earth-light/20 rounded-lg border border-earth-brown/20">
        <div className="text-sm font-medium text-earth-brown mb-1">Recommendation</div>
        <div className="text-xs text-muted-foreground">
          {recommendation || "No specific recommendation generated."}
        </div>
      </div>
    </div>
  );
};