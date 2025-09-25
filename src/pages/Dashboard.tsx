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
import { AlertsPanel } from "@/components/AlertsPanel";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Crops",
      value: "1,247",
      icon: <Leaf className="h-5 w-5" />,
      change: "+12%",
      positive: true
    },
    {
      title: "Healthy Plants",
      value: "1,186",
      icon: <TrendingUp className="h-5 w-5" />,
      change: "+5%",
      positive: true
    },
    {
      title: "Soil Moisture",
      value: "68%",
      icon: <Droplets className="h-5 w-5" />,
      change: "-3%",
      positive: false
    },
    {
      title: "Avg Temperature",
      value: "24°C",
      icon: <Thermometer className="h-5 w-5" />,
      change: "+2°C",
      positive: true
    }
  ];

  const modules = [
    {
      title: "Crop Monitoring",
      description: "Real-time crop health and growth tracking",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/crop-monitoring",
      color: "bg-gradient-success"
    },
    {
      title: "Soil Health",
      description: "Soil analysis and health recommendations",
      icon: <Leaf className="h-6 w-6" />,
      href: "/soil-health",
      color: "bg-gradient-earth"
    },
    {
      title: "Weather Forecast",
      description: "7-day weather predictions and alerts",
      icon: <Cloud className="h-6 w-6" />,
      href: "/weather",
      color: "bg-gradient-to-r from-sky-blue to-sky-blue/80"
    },
    {
      title: "Pest & Disease",
      description: "Early detection and prevention alerts",
      icon: <Shield className="h-6 w-6" />,
      href: "/pest-alerts",
      color: "bg-gradient-to-r from-warning to-warning/80"
    },
    {
      title: "Supply Chain",
      description: "Market prices and supply management",
      icon: <Truck className="h-6 w-6" />,
      href: "/supply-chain",
      color: "bg-gradient-primary"
    },
    {
      title: "Expert Consultation",
      description: "Connect with agricultural specialists",
      icon: <MessageCircle className="h-6 w-6" />,
      href: "/consultation",
      color: "bg-gradient-to-r from-accent to-accent/80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">AgriSmart</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              <p className="font-medium text-foreground">Welcome back!</p>
              <p className="text-muted-foreground">Green Valley Farm</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.positive ? 'text-success' : 'text-warning'}`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="text-accent">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Widget */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-sky-blue" />
                Weather Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherWidget />
            </CardContent>
          </Card>

          {/* Crop Status */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-success" />
                Crop Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CropStatusChart />
            </CardContent>
          </Card>

          {/* Soil Health */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-earth-brown" />
                Soil Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SoilHealthIndicator />
            </CardContent>
          </Card>
        </div>

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

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link key={index} to={module.href}>
              <Card className="shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;