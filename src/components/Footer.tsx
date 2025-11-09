import { useState } from "react";
import { MapPin, Users, Globe, Camera } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Footer = () => {
  const stats = [
    { icon: MapPin, value: "1,247", label: "Destinations" },
    { icon: Users, value: "45,892", label: "Travelers" },
    { icon: Globe, value: "156", label: "Countries" },
    { icon: Camera, value: "98,432", label: "Photos" },
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign In' button in the navigation bar, then switch to the Sign Up tab. Fill in your details including name, email, and a secure password to create your account."
    },
    {
      question: "Can I save my favorite destinations?",
      answer: "Yes! Once you're logged in, you can rate destinations which will be saved to your profile. Your ratings and preferences are stored locally on your device."
    },
    {
      question: "How does the search feature work?",
      answer: "Use the search bar on the Gallery page to filter destinations by name. You can also filter by category. Your last search is automatically saved for your convenience."
    },
    {
      question: "Is the website mobile-friendly?",
      answer: "Absolutely! Our website is fully responsive and works seamlessly across all devices including desktop, tablet, and mobile phones."
    },
    {
      question: "How do I switch between light and dark mode?",
      answer: "Click the sun/moon icon in the navigation bar to toggle between light and dark themes. Your preference is saved automatically."
    }
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 hover:scale-105 transition-transform duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto mx-auto block">
                Frequently Asked Questions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Frequently Asked Questions</DialogTitle>
                <DialogDescription>
                  Find answers to common questions about our travel blog
                </DialogDescription>
              </DialogHeader>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Info */}
        <div className="text-center border-t border-border pt-8">
          <p className="text-foreground font-medium mb-2">
            Team FC Ertis
          </p>
          <p className="text-muted-foreground mb-1">
            Members: Bexultan, Adil, Tamerlan
          </p>
          <p className="text-muted-foreground text-sm">
            Group SE-2402
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
