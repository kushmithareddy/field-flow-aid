import { Cloud, Sun, CloudRain, Droplets, Wind, Eye } from "lucide-react";

export const WeatherWidget = () => {
  // Sample weather data
  const currentWeather = {
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    visibility: 10,
    icon: <Cloud className="h-8 w-8" />
  };

  const forecast = [
    { day: "Today", high: 26, low: 18, icon: <Cloud className="h-6 w-6" /> },
    { day: "Tomorrow", high: 28, low: 20, icon: <Sun className="h-6 w-6" /> },
    { day: "Thursday", high: 22, low: 16, icon: <CloudRain className="h-6 w-6" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <div className="text-center">
        <div className="flex justify-center mb-2 text-sky-blue">
          {currentWeather.icon}
        </div>
        <div className="text-3xl font-bold text-foreground">{currentWeather.temperature}°C</div>
        <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <Droplets className="h-4 w-4 mx-auto text-sky-blue" />
          <div className="text-xs text-muted-foreground">Humidity</div>
          <div className="text-sm font-medium">{currentWeather.humidity}%</div>
        </div>
        <div className="space-y-1">
          <Wind className="h-4 w-4 mx-auto text-sky-blue" />
          <div className="text-xs text-muted-foreground">Wind</div>
          <div className="text-sm font-medium">{currentWeather.windSpeed} km/h</div>
        </div>
        <div className="space-y-1">
          <Eye className="h-4 w-4 mx-auto text-sky-blue" />
          <div className="text-xs text-muted-foreground">Visibility</div>
          <div className="text-sm font-medium">{currentWeather.visibility} km</div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">3-Day Forecast</div>
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="text-sm text-muted-foreground">{day.day}</div>
            <div className="flex items-center gap-2">
              <div className="text-sky-blue">{day.icon}</div>
              <div className="text-sm">
                <span className="font-medium">{day.high}°</span>
                <span className="text-muted-foreground">/{day.low}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};