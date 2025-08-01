import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Save, 
  Trash2, 
  Download, 
  Share2, 
  Palette,
  Shirt,
  User,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import ClothingCard, { ClothingItem } from "@/components/ClothingCard";
import { toast } from "sonner";

// Available clothing items for outfit building
const availableItems: ClothingItem[] = [
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

interface OutfitSlot {
  category: string;
  item: ClothingItem | null;
  icon: React.ComponentType<any>;
}

const OutfitBuilder = () => {
  const [outfitName, setOutfitName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const canvasRef = useRef<HTMLDivElement>(null);

  const [outfitSlots, setOutfitSlots] = useState<OutfitSlot[]>([
    { category: "Tops", item: null, icon: Shirt },
    { category: "Bottoms", item: null, icon: User },
    { category: "Shoes", item: null, icon: ShoppingBag },
    { category: "Accessories", item: null, icon: Sparkles },
  ]);

  const categories = ["All", "Tops", "Bottoms", "Dresses", "Shoes", "Outerwear", "Accessories"];

  const filteredItems = selectedCategory === "All" 
    ? availableItems 
    : availableItems.filter(item => item.category === selectedCategory);

  const handleAddToOutfit = (item: ClothingItem) => {
    const slotIndex = outfitSlots.findIndex(slot => 
      slot.category === item.category || 
      (item.category === "Dresses" && slot.category === "Tops")
    );

    if (slotIndex !== -1) {
      const newSlots = [...outfitSlots];
      newSlots[slotIndex] = { ...newSlots[slotIndex], item };
      setOutfitSlots(newSlots);
      toast.success(`Added ${item.name} to outfit!`);
    } else {
      toast.error(`No slot available for ${item.category}`);
    }
  };

  const handleRemoveFromOutfit = (slotIndex: number) => {
    const newSlots = [...outfitSlots];
    newSlots[slotIndex] = { ...newSlots[slotIndex], item: null };
    setOutfitSlots(newSlots);
    toast.success("Item removed from outfit");
  };

  const handleSaveOutfit = () => {
    const outfitItems = outfitSlots.filter(slot => slot.item).map(slot => slot.item);
    if (outfitItems.length === 0) {
      toast.error("Add at least one item to save the outfit");
      return;
    }
    
    if (!outfitName.trim()) {
      toast.error("Please enter an outfit name");
      return;
    }

    // TODO: Save to database
    console.log("Saving outfit:", { name: outfitName, items: outfitItems });
    toast.success(`Outfit "${outfitName}" saved successfully!`);
  };

  const handleClearOutfit = () => {
    setOutfitSlots(prev => prev.map(slot => ({ ...slot, item: null })));
    setOutfitName("");
    toast.success("Outfit cleared");
  };

  const getTotalPrice = () => {
    return outfitSlots
      .filter(slot => slot.item)
      .reduce((total, slot) => total + (slot.item?.price || 0), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-fashion-rose to-fashion-gold rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Style Lab</h1>
          </div>
          <p className="text-muted-foreground">
            Mix and match clothing items to create your perfect outfit
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Outfit Canvas */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-primary">Your Outfit</h3>
                <Badge variant="secondary" className="bg-fashion-rose/10 text-fashion-rose">
                  ${getTotalPrice()}
                </Badge>
              </div>

              {/* Outfit Name Input */}
              <div className="mb-6">
                <Input
                  placeholder="Name your outfit..."
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  className="text-center font-medium"
                />
              </div>

              {/* Outfit Slots */}
              <div ref={canvasRef} className="space-y-4 mb-6">
                {outfitSlots.map((slot, index) => {
                  const Icon = slot.icon;
                  return (
                    <div
                      key={slot.category}
                      className="relative group border-2 border-dashed border-border rounded-lg p-4 hover:border-fashion-rose/50 transition-colors"
                    >
                      {slot.item ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={slot.item.imageUrl}
                            alt={slot.item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{slot.item.name}</h4>
                            <p className="text-xs text-muted-foreground">{slot.item.brand}</p>
                            <p className="text-sm font-semibold text-primary">${slot.item.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromOutfit(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Icon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{slot.category}</p>
                          <p className="text-xs text-muted-foreground/70">Drag items here</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  variant="fashion" 
                  className="w-full"
                  onClick={handleSaveOutfit}
                  disabled={outfitSlots.every(slot => !slot.item) || !outfitName.trim()}
                >
                  <Save className="w-4 h-4" />
                  Save Outfit
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleClearOutfit}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Clothing Library */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-4">Clothing Library</h3>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
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

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  onAddToOutfit={handleAddToOutfit}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No items in this category</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later for new items
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitBuilder;