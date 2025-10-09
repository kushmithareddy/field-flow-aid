import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Leaf, 
  Cloud, 
  Shield, 
  Truck, 
  MessageCircle,
  TrendingUp,
  Droplets,
  Thermometer,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { WeatherWidget } from "@/components/WeatherWidget";
import { CropStatusChart } from "@/components/CropStatusChart";
import { SoilHealthIndicator } from "@/components/SoilHealthIndicator";
import AlertsPanel from "@/components/AlertsPanel";

const Dashboard = () => {
  // ...existing code...

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* ...existing code... */}

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {/* ...existing code... */}

        {/* Main Content Grid */}
        {/* ...existing code... */}

        {/* Alerts Panel */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertsPanel />
          </CardContent>
        </Card>

        {/* Crop Status Chart */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle>Crop Status</CardTitle>
          </CardHeader>
          <CardContent>
            <CropStatusChart />
          </CardContent>
        </Card>

        {/* Soil Health Indicator */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle>Soil Health</CardTitle>
          </CardHeader>
          <CardContent>
            <SoilHealthIndicator />
          </CardContent>
        </Card>

        {/* Weather Widget */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle>Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherWidget />
          </CardContent>
        </Card>

        {/* Modules Grid */}
        {/* ...existing code... */}
      </div>
    </div>
  );
};

export default Dashboard;