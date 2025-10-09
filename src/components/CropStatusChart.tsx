import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
// Import your Supabase client
import { supabase } from "@/lib/supabase"; 

// Define the structure for the data you will fetch and process
interface DynamicCropData {
  name: string;
  health: number; // Calculated percentage (0-100)
  growth: string; // Calculated status (Excellent, Good, Fair, etc.)
  // Note: Icon and color will be determined dynamically
}

// Define the structure for the raw data needed for calculation
interface CropOptimalData {
    name: string;
    optimal_ph_min: number;
    optimal_ph_max: number;
    // Add other optimal parameters needed for calculation (e.g., moisture, temp)
}

export const CropStatusChart = () => {
  const [cropData, setCropData] = useState<DynamicCropData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Utility Functions (Keep the original logic) ---
  const getHealthColor = (health: number) => {
    if (health >= 90) return "bg-success"; // Simplified for demonstration
    if (health >= 75) return "bg-warning";
    return "bg-error";
  };
  
  const getIconAndColor = (growth: string) => {
      switch (growth) {
          case 'Excellent':
              return { icon: <Leaf className="h-4 w-4" />, color: "text-success" };
          case 'Good':
              return { icon: <TrendingUp className="h-4 w-4" />, color: "text-success" };
          case 'Fair':
              return { icon: <AlertTriangle className="h-4 w-4" />, color: "text-warning" };
          default:
              return { icon: <AlertTriangle className="h-4 w-4" />, color: "text-error" };
      }
  };

  // --- Data Fetching and Calculation Logic ---
  useEffect(() => {
    const fetchCropHealth = async () => {
      setLoading(true);

      // 1. Fetch ALL crop optimal conditions
      const { data: crops, error: cropError } = await supabase
        .from('crops') 
        .select('name, optimal_ph_min, optimal_ph_max'); 
        // NOTE: Select other optimal parameters (temp, moisture) here!

      // 2. Fetch the LATEST soil data (assuming all crops are in one farm/area)
      const { data: soil, error: soilError } = await supabase
        .from('soil_data')
        .select('ph_level, moisture_percent, nutrients_n') // Fetch all current params
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single();
      
      if (cropError || soilError || !crops || !soil) {
        console.error("Error fetching data:", cropError || soilError);
        setLoading(false);
        return;
      }
      
      // 3. Process/Calculate the Dynamic Health Score
      const calculatedData: DynamicCropData[] = crops.map((crop: CropOptimalData) => {
          // --- Custom Calculation Logic Here ---
          // This is the core intelligence of your app. For simplicity, we'll only check pH.
          const currentPH = soil.ph_level;
          const optimalRange = crop.optimal_ph_max - crop.optimal_ph_min;
          const healthScore = Math.max(0, 100 - (Math.abs(currentPH - ((crop.optimal_ph_min + crop.optimal_ph_max) / 2)) / (optimalRange / 2)) * 30); // Placeholder calculation
          
          let growthStatus = 'Poor';
          if (healthScore >= 90) growthStatus = 'Excellent';
          else if (healthScore >= 75) growthStatus = 'Good';
          else if (healthScore >= 60) growthStatus = 'Fair';
          
          return {
              name: crop.name,
              health: Math.round(Math.min(100, healthScore)), // Cap at 100
              growth: growthStatus,
          };
      });

      setCropData(calculatedData);
      setLoading(false);
    };

    fetchCropHealth();
  }, []);

  // --- Rendering ---
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-foreground">Crop Health Overview</div>
      
      {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-primary">Loading Crop Health...</span>
          </div>
      ) : (
        cropData.map((crop, index) => {
          const { icon, color } = getIconAndColor(crop.growth);

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={color}>{icon}</div>
                  <span className="text-sm font-medium text-foreground">{crop.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">{crop.health}%</div>
              </div>
              {/* NOTE: Progress bar color logic is now handled by the component's internal styles */}
              <Progress value={crop.health} className={`h-2 ${getHealthColor(crop.health)}`} /> 
              <div className="text-xs text-muted-foreground">{crop.growth} condition</div>
            </div>
          );
        })
      )}

      {/* This section still needs to be made dynamic by calculating the actual change */}
      <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
        <div className="flex items-center gap-2 text-success text-sm">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium">Overall health improved by 8% this week</span>
        </div>
      </div>
    </div>
  );
};