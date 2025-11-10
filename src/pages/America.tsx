import { useState } from "react";
import { MapPin, Star, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const America = () => {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  
  const destinations = [
    {
      name: "New York City",
      country: "USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      description: "The city that never sleeps, filled with iconic landmarks and endless entertainment.",
      rating: 4.9,
      visitors: "15M+"
    },
    {
      name: "Grand Canyon",
      country: "USA",
      image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&h=600&fit=crop",
      description: "One of the world's most spectacular natural wonders.",
      rating: 4.8,
      visitors: "6M+"
    },
    {
      name: "Rio de Janeiro",
      country: "Brazil",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop",
      description: "Famous for its beaches, carnival, and Christ the Redeemer statue.",
      rating: 4.7,
      visitors: "8M+"
    },
    {
      name: "Machu Picchu",
      country: "Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
      description: "Ancient Incan citadel set high in the Andes Mountains.",
      rating: 4.9,
      visitors: "1.5M+"
    },
    {
      name: "Toronto",
      country: "Canada",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop",
      description: "Diverse, multicultural city with the iconic CN Tower.",
      rating: 4.6,
      visitors: "4M+"
    },
    {
      name: "Cancun",
      country: "Mexico",
      image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&h=600&fit=crop",
      description: "Paradise beaches and ancient Mayan ruins.",
      rating: 4.7,
      visitors: "7M+"
    }
  ];

  const stats = [
    { icon: MapPin, value: "35", label: "Countries", color: "text-primary" },
    { icon: Star, value: "500+", label: "Destinations", color: "text-secondary" },
    { icon: Calendar, value: "Year-round", label: "Travel Season", color: "text-accent" },
    { icon: Users, value: "200M+", label: "Annual Visitors", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            Discover America
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            From vibrant cities to breathtaking natural wonders
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
          Popular Destinations
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

export default America;
