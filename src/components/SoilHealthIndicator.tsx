import { Progress } from "@/components/ui/progress";
import { Droplets, Zap, Thermometer, Beaker, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
// Import your Supabase client
import { supabase } from "@/lib/supabase"; 

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
    const fetchSoilData = async () => {
      setLoading(true);

      // 1. Fetch the LATEST soil analysis data
      const { data: latestSoil, error: soilError } = await supabase
        .from('soil_data')
        .select('ph_level, moisture_percent, temperature, nutrients_n, recorded_at') 
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single();
      
      if (soilError || !latestSoil) {
        console.error("Error fetching latest soil data:", soilError);
        setLoading(false);
        return;
      }
      
      // 2. Call the Recommendation function (RPC)
      // Pass the current nutrient value (assuming 'nutrients_n' from your table is the input)
      const { data: recData, error: recError } = await supabase
        .rpc('get_nutrient_recommendation', { 
            p_n_level: latestSoil.nutrients_n 
        });

      if (recData) {
        setRecommendation(recData);
      }
      if (recError) console.error("Error fetching recommendation:", recError);

      // 3. Transform fetched data into the SoilMetrics array format
      const newMetrics: SoilMetric[] = [
        {
          name: "Moisture",
          value: latestSoil.moisture_percent,
          optimal: "60-75%", // Hardcoded optimal for now; could fetch from 'crops' table later
          status: (latestSoil.moisture_percent >= 60 && latestSoil.moisture_percent <= 75) ? "Optimal" : "Fair",
          icon: <Droplets className="h-4 w-4" />,
          color: "text-sky-blue"
        },
        {
          name: "pH Level",
          value: latestSoil.ph_level,
          optimal: "6.0-7.5",
          status: (latestSoil.ph_level >= 6.0 && latestSoil.ph_level <= 7.5) ? "Optimal" : "Fair",
          icon: <Beaker className="h-4 w-4" />,
          color: "text-success",
          isDecimal: true
        },
        {
          name: "Temperature",
          value: latestSoil.temperature,
          optimal: "18-25°C",
          status: (latestSoil.temperature >= 18 && latestSoil.temperature <= 25) ? "Good" : "Fair",
          icon: <Thermometer className="h-4 w-4" />,
          color: "text-warning"
        },
        {
          name: "Nutrients",
          value: latestSoil.nutrients_n, // Assuming 0-100 scale for simplicity
          optimal: "80-100%",
          status: (latestSoil.nutrients_n >= 80) ? "Good" : "Fair",
          icon: <Zap className="h-4 w-4" />,
          color: "text-success"
        }
      ];

      setSoilMetrics(newMetrics);
      setLoading(false);
    };

    fetchSoilData();
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