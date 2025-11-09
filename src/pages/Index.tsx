import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Globe, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import DestinationCard from '@/components/DestinationCard';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-travel.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    // Load saved search
    const savedSearch = localStorage.getItem('lastSearch');
    if (savedSearch) {
      setSearchQuery(savedSearch);
    }

    // Featured destinations
    const featuredDestinations = [
      {
        id: '1',
        title: 'Santorini Paradise',
        location: 'Greece',
        imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        description: 'Experience the stunning white-washed buildings and breathtaking sunsets of this iconic Greek island.'
      },
      {
        id: '2',
        title: 'Bali Dreams',
        location: 'Indonesia',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        description: 'Discover lush rice terraces, ancient temples, and pristine beaches in this tropical paradise.'
      },
      {
        id: '3',
        title: 'Swiss Alps Adventure',
        location: 'Switzerland',
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        description: 'Explore majestic mountain peaks, crystal-clear lakes, and charming alpine villages.'
      },
    ];

    setDestinations(featuredDestinations);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      localStorage.setItem('lastSearch', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Explore the World with
            <span className="block bg-gradient-sunset bg-clip-text text-transparent mt-2">
              Wanderlust
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover breathtaking destinations, share your adventures, and connect with fellow travelers
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-background/95 backdrop-blur-sm rounded-full p-2 shadow-large flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-gradient-hero hover:opacity-90 rounded-full px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-medium transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover Destinations</h3>
              <p className="text-muted-foreground">
                Explore amazing places from around the globe with our curated travel guides
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-medium transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-sunset mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Journey</h3>
              <p className="text-muted-foreground">
                Upload photos and stories from your adventures to inspire others
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card hover:shadow-medium transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rate & Review</h3>
              <p className="text-muted-foreground">
                Help fellow travelers by rating destinations and sharing your experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Destinations</h2>
            <Link to="/gallery">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Your Adventure Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of travelers and share your experiences
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
