import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DestinationCard from '@/components/DestinationCard';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);

  useEffect(() => {
    // Comprehensive travel destinations
    const allDestinations = [
      {
        id: '1',
        title: 'Santorini Paradise',
        location: 'Greece',
        category: 'beach',
        imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        description: 'Experience the stunning white-washed buildings and breathtaking sunsets of this iconic Greek island.'
      },
      {
        id: '2',
        title: 'Bali Dreams',
        location: 'Indonesia',
        category: 'tropical',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        description: 'Discover lush rice terraces, ancient temples, and pristine beaches in this tropical paradise.'
      },
      {
        id: '3',
        title: 'Swiss Alps Adventure',
        location: 'Switzerland',
        category: 'mountains',
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        description: 'Explore majestic mountain peaks, crystal-clear lakes, and charming alpine villages.'
      },
      {
        id: '4',
        title: 'Maldives Escape',
        location: 'Maldives',
        category: 'beach',
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
        description: 'Luxurious overwater bungalows and crystal-clear turquoise waters await in this tropical paradise.'
      },
      {
        id: '5',
        title: 'Tokyo Nights',
        location: 'Japan',
        category: 'city',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        description: 'Immerse yourself in the vibrant blend of traditional culture and modern innovation.'
      },
      {
        id: '6',
        title: 'Iceland Aurora',
        location: 'Iceland',
        category: 'nature',
        imageUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800',
        description: 'Witness the magical Northern Lights dancing over volcanic landscapes and glacial lagoons.'
      },
      {
        id: '7',
        title: 'Patagonia Trek',
        location: 'Argentina',
        category: 'mountains',
        imageUrl: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800',
        description: 'Hike through dramatic mountain ranges, glaciers, and pristine wilderness.'
      },
      {
        id: '8',
        title: 'Amalfi Coast',
        location: 'Italy',
        category: 'beach',
        imageUrl: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=800',
        description: 'Colorful cliffside villages, Mediterranean cuisine, and stunning coastal views.'
      },
      {
        id: '9',
        title: 'New York City',
        location: 'USA',
        category: 'city',
        imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        description: 'The city that never sleeps offers endless entertainment, culture, and iconic landmarks.'
      },
    ];

    setDestinations(allDestinations);
    setFilteredDestinations(allDestinations);

    // Load saved filters
    const savedSearch = localStorage.getItem('gallerySearch');
    const savedCategory = localStorage.getItem('galleryCategory');
    if (savedSearch) setSearchQuery(savedSearch);
    if (savedCategory) setSelectedCategory(savedCategory);
  }, []);

  useEffect(() => {
    // Filter destinations
    let filtered = destinations;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.title.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query)
      );
    }

    setFilteredDestinations(filtered);

    // Save filters
    localStorage.setItem('gallerySearch', searchQuery);
    localStorage.setItem('galleryCategory', selectedCategory);
  }, [searchQuery, selectedCategory, destinations]);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Travel Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of stunning destinations from around the world
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="mountains">Mountains</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="tropical">Tropical</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No destinations found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
