import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Destination {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    // Load saved rating
    const ratings = JSON.parse(localStorage.getItem('destinationRatings') || '{}');
    if (ratings[destination.id]) {
      setRating(ratings[destination.id]);
    }
  }, [destination.id]);

  const handleRating = (value: number) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to rate destinations');
      return;
    }

    setRating(value);
    const ratings = JSON.parse(localStorage.getItem('destinationRatings') || '{}');
    ratings[destination.id] = value;
    localStorage.setItem('destinationRatings', JSON.stringify(ratings));
    toast.success('Rating saved!');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg mb-1">{destination.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {destination.location}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
        <div className="flex items-center space-x-1 pt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
