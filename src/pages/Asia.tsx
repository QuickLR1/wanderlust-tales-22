import { useState } from "react";
import { MapPin, Star, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Asia = () => {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  
  const destinations = [
    {
      name: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      description: "Where ancient traditions blend seamlessly with cutting-edge technology.",
      rating: 4.9,
      visitors: "14M+"
    },
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      description: "Tropical paradise with stunning beaches and spiritual temples.",
      rating: 4.8,
      visitors: "6M+"
    },
    {
      name: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      description: "Luxury, innovation, and architectural marvels in the desert.",
      rating: 4.7,
      visitors: "16M+"
    },
    {
      name: "Bangkok",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
      description: "Vibrant street life, ornate temples, and incredible cuisine.",
      rating: 4.6,
      visitors: "24M+"
    },
    {
      name: "Singapore",
      country: "Singapore",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
      description: "The garden city with futuristic architecture and diverse culture.",
      rating: 4.8,
      visitors: "19M+"
    },
    {
      name: "Seoul",
      country: "South Korea",
      image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop",
      description: "K-pop culture, historic palaces, and innovative technology.",
      rating: 4.7,
      visitors: "13M+"
    }
  ];

  const stats = [
    { icon: MapPin, value: "48", label: "Countries", color: "text-primary" },
    { icon: Star, value: "1000+", label: "Destinations", color: "text-secondary" },
    { icon: Calendar, value: "All Year", label: "Travel Season", color: "text-accent" },
    { icon: Users, value: "350M+", label: "Annual Visitors", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            Experience Asia
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            Diverse cultures, ancient wonders, and modern marvels
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-hero bg-clip-text text-transparent">
          Top Asian Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
                  {destination.country}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardDescription>{destination.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{destination.visitors}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDestination(destination)}>Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedDestination?.name}</DialogTitle>
            <DialogDescription className="text-base">{selectedDestination?.country}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedDestination?.image}
              alt={selectedDestination?.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">{selectedDestination?.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-medium">Rating: {selectedDestination?.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium">Visitors: {selectedDestination?.visitors}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Asia;
