import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClothingCard, { ClothingItem } from "@/components/ClothingCard";
import { Sparkles, TrendingUp, Palette, Users } from "lucide-react";
import heroImage from "@/assets/fashion-hero.jpg";

// Mock data for trending outfits
const trendingOutfits = [
  {
    id: "1",
    name: "Urban Chic",
    items: 3,
    likes: 124,
    creator: "Sarah M.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"
  },
  {
    id: "2", 
    name: "Minimalist Elegance",
    items: 4,
    likes: 89,
    creator: "Alex K.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop"
  },
  {
    id: "3",
    name: "Casual Friday",
    items: 5,
    likes: 156,
    creator: "Emma L.",
    image: "https://images.unsplash.com/photo-1544957992-20349e67893a?w=400&h=500&fit=crop"
  }
];

// Mock data for popular clothing items
const popularItems: ClothingItem[] = [
  {
    id: "1",
    name: "Classic White Button Shirt",
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    category: "Tops",
    price: 89,
    brand: "Everlane",
    websiteLink: "https://everlane.com",
    colors: ["#FFFFFF", "#F8F9FA", "#E9ECEF"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "High-Waisted Denim Jeans",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    category: "Bottoms",
    price: 128,
    brand: "Levi's",
    websiteLink: "https://levi.com",
    colors: ["#4A4A4A", "#2C3E50", "#34495E"],
    sizes: ["26", "27", "28", "29", "30", "31", "32"]
  },
  {
    id: "3",
    name: "Silk Midi Dress",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Dresses",
    price: 245,
    brand: "Reformation",
    websiteLink: "https://reformation.com",
    colors: ["#E74C3C", "#8B4513", "#2E8B57"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "4",
    name: "Leather Ankle Boots",
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=500&fit=crop",
    category: "Shoes",
    price: 180,
    brand: "Dr. Martens",
    websiteLink: "https://drmartens.com",
    colors: ["#000000", "#8B4513", "#A0522D"],
    sizes: ["6", "7", "8", "9", "10", "11"]
  }
];

const Home = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (item: ClothingItem) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item.id)) {
        newFavorites.delete(item.id);
      } else {
        newFavorites.add(item.id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Welcome to StyleMix
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Mix. Match.
            <span className="bg-gradient-to-r from-fashion-rose to-fashion-gold bg-clip-text text-transparent block">
              Create Magic.
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover endless style possibilities with our AI-powered outfit builder. 
            Browse thousands of pieces and create looks that are uniquely you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="premium" size="lg" className="text-lg px-8">
              <Link to="/outfit-builder">Start Creating</Link>
            </Button>
            <Button asChild variant="elegant" size="lg" className="text-lg px-8">
              <Link to="/browse">Browse Styles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Fashion Items", value: "50K+", icon: Sparkles },
              { label: "Style Combinations", value: "1M+", icon: Palette },
              { label: "Happy Users", value: "25K+", icon: Users },
              { label: "Trending Looks", value: "500+", icon: TrendingUp }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-fashion-rose to-fashion-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Outfits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Trending Outfits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what's hot right now. Get inspired by outfits created by our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {trendingOutfits.map((outfit) => (
              <div 
                key={outfit.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{outfit.name}</h3>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>by {outfit.creator}</span>
                    <div className="flex items-center gap-3">
                      <span>{outfit.items} items</span>
                      <span>{outfit.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline">
              <Link to="/saved-outfits">View All Trending</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Popular Right Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shop the most loved pieces by our community. These items are flying off the virtual shelves!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {popularItems.map((item) => (
              <ClothingCard
                key={item.id}
                item={item}
                onToggleFavorite={handleToggleFavorite}
                isFavorited={favorites.has(item.id)}
                onAddToOutfit={(item) => console.log('Add to outfit:', item)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="fashion">
              <Link to="/browse">Explore All Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-fashion-rose to-fashion-gold">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Perfect Look?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of fashion enthusiasts who are already creating amazing outfits.
          </p>
          <Button asChild variant="elegant" size="lg" className="text-lg px-8">
            <Link to="/outfit-builder">Start Your Style Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;