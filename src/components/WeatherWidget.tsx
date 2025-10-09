import { Cloud, Sun, CloudRain, Droplets, Wind, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Define the type for the current weather data fetched from your table
interface CurrentWeather {
    temperature: number;
    condition: string;
    humidity: number;
    wind_speed: number;
    visibility: number;
    // You might also have a field for 'icon_code' to determine the icon
}

// Define the type for the forecast data
interface ForecastDay {
    day_name: string; // e.g., 'Tomorrow', 'Thursday'
    temp_high: number;
    temp_low: number;
    condition: string;
}

// A simple utility to map a condition string (from DB) to a Lucide icon
const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) return <Sun className="h-8 w-8" />;
    if (lowerCondition.includes("rain")) return <CloudRain className="h-8 w-8" />;
    return <Cloud className="h-8 w-8" />;
};

export const WeatherWidget = () => {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => {
            setCurrentWeather({ temperature: 24, condition: "Partly Cloudy", humidity: 65, wind_speed: 12, visibility: 10 });
            setForecast([
                { day_name: "Today", temp_high: 26, temp_low: 18, condition: "Sunny" },
                { day_name: "Tomorrow", temp_high: 23, temp_low: 16, condition: "Rainy" },
                { day_name: "Thursday", temp_high: 25, temp_low: 17, condition: "Cloudy" }
            ]);
            setLoading(false);
        }, 700);
        return () => clearTimeout(t);
    }, []);

    // Display loading state if data is not yet available
    if (loading) {
        return (
            <div className="flex justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-sky-blue" />
                <span className="ml-2 text-sky-blue">Fetching Weather Data...</span>
            </div>
        );
    }

    // Display placeholder if no data is found after loading
    if (!currentWeather) {
        return <div className="p-4 text-center text-muted-foreground">Weather data unavailable.</div>;
    }

    // --- Rendering the Fetched Data ---
    return (
        <div className="space-y-4">
            {/* Current Weather */}
            <div className="text-center">
                <div className="flex justify-center mb-2 text-sky-blue">
                    {getWeatherIcon(currentWeather.condition)}
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
                    <div className="text-sm font-medium">{currentWeather.wind_speed} km/h</div>
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
                        <div className="text-sm text-muted-foreground">{day.day_name}</div>
                        <div className="flex items-center gap-2">
                            <div className="text-sky-blue">{getWeatherIcon(day.condition)}</div>
                            <div className="text-sm">
                                <span className="font-medium">{day.temp_high}°</span>
                                <span className="text-muted-foreground">/{day.temp_low}°</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};