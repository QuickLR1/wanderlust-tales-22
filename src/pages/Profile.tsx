import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Star } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const getUserRatings = () => {
    const ratings = JSON.parse(localStorage.getItem('destinationRatings') || '{}');
    return Object.keys(ratings).length;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">My Profile</h1>
          <p className="text-lg text-muted-foreground">
            Manage your account and view your travel activity
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">Travel Enthusiast</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Travel Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-hero rounded-xl text-white">
                  <Star className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">{getUserRatings()}</p>
                  <p className="text-sm opacity-90">Destinations Rated</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-sunset rounded-xl text-white">
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">1</p>
                  <p className="text-sm opacity-90">Active Traveler</p>
                </div>
                
                <div className="text-center p-6 bg-primary rounded-xl text-white">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-3xl font-bold">
                    {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                  <p className="text-sm opacity-90">Days as Member</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="destructive"
              onClick={() => {
                signOut();
                navigate('/');
              }}
              className="w-full sm:w-auto"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
