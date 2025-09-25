import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, AlertTriangle } from "lucide-react";

export const CropStatusChart = () => {
  const cropData = [
    {
      name: "Corn",
      health: 92,
      growth: "Excellent",
      icon: <Leaf className="h-4 w-4" />,
      color: "text-success"
    },
    {
      name: "Wheat",
      health: 87,
      growth: "Good",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-success"
    },
    {
      name: "Soybeans",
      health: 76,
      growth: "Fair",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-warning"
    },
    {
      name: "Tomatoes",
      health: 94,
      growth: "Excellent",
      icon: <Leaf className="h-4 w-4" />,
      color: "text-success"
    }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return "bg-gradient-success";
    if (health >= 75) return "bg-gradient-to-r from-crop-yellow to-crop-yellow/80";
    return "bg-gradient-to-r from-warning to-warning/80";
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Crop Health Overview</div>
      
      {cropData.map((crop, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={crop.color}>{crop.icon}</div>
              <span className="text-sm font-medium text-foreground">{crop.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">{crop.health}%</div>
          </div>
          <Progress value={crop.health} className="h-2" />
          <div className="text-xs text-muted-foreground">{crop.growth} condition</div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-center gap-2 text-success text-sm">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">Overall health improved by 8% this week</span>
        </div>
      </div>
    </div>
  );
};