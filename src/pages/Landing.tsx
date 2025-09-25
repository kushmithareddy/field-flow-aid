import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, BarChart3, Cloud, Shield, Truck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Landing = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Crop Monitoring",
      description: "Track your crops with advanced analytics and interactive charts"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Soil Health Analytics",
      description: "Monitor soil conditions and get actionable insights for better yields"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Weather Forecast",
      description: "Get accurate weather predictions to plan your farming activities"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Pest & Disease Alerts",
      description: "Early detection system for pests and diseases with instant notifications"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Supply Chain Management",
      description: "Track market prices and manage your supply chain efficiently"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Expert Consultation",
      description: "Connect with agricultural experts for personalized advice"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">AgriSmart</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Agriculture landscape" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Smart Agriculture
              <span className="block text-accent">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your farming with real-time monitoring, predictive analytics, 
              and expert guidance. Join thousands of farmers using AgriSmart to 
              increase yields and optimize their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary text-lg px-8 py-4 shadow-medium hover:shadow-strong transition-all">
                  Start Your Journey
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Everything You Need for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and insights to help you make data-driven decisions 
              and maximize your agricultural productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardHeader>
                  <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join AgriSmart today and take your farming to the next level
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-medium">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">AgriSmart</span>
          </div>
          <p className="opacity-80">© 2024 AgriSmart. Empowering farmers with technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;