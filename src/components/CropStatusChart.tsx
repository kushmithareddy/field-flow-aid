import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface CropData {
  name: string;
  health: number;
  growth: string;
  icon: JSX.Element;
  color: string;
}

const SAMPLE_CROP_DATA: CropData[] = [
  { name: "Wheat", health: 85, growth: "Excellent", icon: <Leaf className="h-5 w-5" />, color: "text-success" },
  { name: "Corn", health: 72, growth: "Good", icon: <TrendingUp className="h-5 w-5" />, color: "text-accent" },
  { name: "Soybeans", health: 58, growth: "Fair", icon: <AlertTriangle className="h-5 w-5" />, color: "text-warning" },
  { name: "Tomatoes", health: 91, growth: "Excellent", icon: <Leaf className="h-5 w-5" />, color: "text-success" },
];

export const CropStatusChart = () => {
  const [cropData, setCropData] = useState<CropData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading sample data
    const t = setTimeout(() => {
      setCropData(SAMPLE_CROP_DATA);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const getHealthColor = (health: number) => {
    if (health >= 85) return "bg-success";
    if (health >= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Crop Health Overview</div>
      {loading ? (
        <div className="flex justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-primary">Loading Crop Health...</span>
        </div>
      ) : (
        cropData.map((crop, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={crop.color}>{crop.icon}</div>
                <span className="text-sm font-medium text-foreground">{crop.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">{crop.health}%</div>
            </div>
            <Progress value={crop.health} className={`h-2 ${getHealthColor(crop.health)}`} />
            <div className="text-xs text-muted-foreground">{crop.growth} condition</div>
          </div>
        ))
      )}
      <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-center gap-2 text-success text-sm">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">Overall health improved by 8% this week</span>
        </div>
      </div>
    </div>
  );
};