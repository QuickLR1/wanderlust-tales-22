import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Compass, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/america', label: 'America' },
    { path: '/europe', label: 'Europe' },
    { path: '/asia', label: 'Asia' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Compass className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Isain
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  className="rounded-full hidden sm:block"
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/auth" className="hidden sm:block">
                <Button variant="default" size="sm" className="bg-gradient-hero hover:opacity-90">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary py-2 ${
                        isActive(link.path) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="border-t border-border pt-4 mt-4 space-y-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            <User className="h-5 w-5 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="w-full justify-start"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <Button variant="default" className="w-full bg-gradient-hero hover:opacity-90">
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
