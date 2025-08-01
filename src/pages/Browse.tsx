import { useState, useMemo } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ClothingCard, { ClothingItem } from "@/components/ClothingCard";

// Extended mock clothing data
const allClothingItems: ClothingItem[] = [
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
  },
  {
    id: "5",
    name: "Cashmere V-Neck Sweater",
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    category: "Tops",
    price: 199,
    brand: "COS",
    websiteLink: "https://cosstores.com",
    colors: ["#D2B48C", "#F5DEB3", "#DEB887"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "6",
    name: "Pleated Midi Skirt",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a13804?w=400&h=500&fit=crop",
    category: "Bottoms",
    price: 95,
    brand: "& Other Stories",
    websiteLink: "https://stories.com",
    colors: ["#000000", "#8B4513", "#2F4F4F"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "7",
    name: "Wool Overcoat",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
    category: "Outerwear",
    price: 350,
    brand: "Acne Studios",
    websiteLink: "https://acnestudios.com",
    colors: ["#2F4F4F", "#000000", "#8B4513"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "8",
    name: "Gold Chain Necklace",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    category: "Accessories",
    price: 120,
    brand: "Mejuri",
    websiteLink: "https://mejuri.com",
    colors: ["#FFD700", "#DAA520"],
    sizes: ["One Size"]
  }
];

const categories = ["All", "Tops", "Bottoms", "Dresses", "Shoes", "Outerwear", "Accessories"];
const brands = ["All", ...Array.from(new Set(allClothingItems.map(item => item.brand)))];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity }
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    return allClothingItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || item.brand === selectedBrand;
      const matchesPrice = item.price >= selectedPriceRange.min && item.price <= selectedPriceRange.max;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedBrand, selectedPriceRange]);

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

  const handleAddToOutfit = (item: ClothingItem) => {
    console.log('Add to outfit:', item);
    // TODO: Implement add to outfit functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Browse Collection</h1>
          <p className="text-muted-foreground">
            Discover {allClothingItems.length} curated fashion pieces from top brands
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-primary">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                <Select 
                  value={selectedPriceRange.label} 
                  onValueChange={(value) => {
                    const range = priceRanges.find(r => r.label === value);
                    if (range) setSelectedPriceRange(range);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedBrand("All");
                  setSelectedPriceRange(priceRanges[0]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground">
                  Showing {filteredItems.length} of {allClothingItems.length} items
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results Grid */}
            {filteredItems.length > 0 ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredItems.map((item) => (
                  <ClothingCard
                    key={item.id}
                    item={item}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorited={favorites.has(item.id)}
                    onAddToOutfit={handleAddToOutfit}
                    className={viewMode === "list" ? "flex flex-row max-w-none" : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedBrand("All");
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;