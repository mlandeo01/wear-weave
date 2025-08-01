import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Heart, 
  Share2, 
  Edit, 
  Trash2,
  Eye,
  Grid,
  List,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock saved outfits data
const savedOutfits = [
  {
    id: "1",
    name: "Urban Chic",
    createdAt: "2024-01-15",
    items: [
      {
        id: "1",
        name: "White Button Shirt",
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
        price: 89
      },
      {
        id: "2",
        name: "High-Waisted Jeans",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
        price: 128
      },
      {
        id: "4",
        name: "Leather Boots",
        imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=200&fit=crop",
        price: 180
      }
    ],
    totalPrice: 397,
    isPublic: true,
    likes: 24,
    tags: ["casual", "everyday", "classic"]
  },
  {
    id: "2",
    name: "Date Night Elegance",
    createdAt: "2024-01-12",
    items: [
      {
        id: "3",
        name: "Silk Midi Dress",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
        price: 245
      },
      {
        id: "6",
        name: "Gold Necklace",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
        price: 120
      }
    ],
    totalPrice: 365,
    isPublic: false,
    likes: 0,
    tags: ["elegant", "date", "evening"]
  },
  {
    id: "3",
    name: "Cozy Weekend",
    createdAt: "2024-01-10",
    items: [
      {
        id: "5",
        name: "Cashmere Sweater",
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop",
        price: 199
      },
      {
        id: "2",
        name: "High-Waisted Jeans",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
        price: 128
      }
    ],
    totalPrice: 327,
    isPublic: true,
    likes: 12,
    tags: ["cozy", "weekend", "comfortable"]
  }
];

const SavedOutfits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(savedOutfits.flatMap(outfit => outfit.tags)));

  const filteredOutfits = savedOutfits.filter(outfit => {
    const matchesSearch = outfit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outfit.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || outfit.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleDeleteOutfit = (outfitId: string) => {
    console.log("Delete outfit:", outfitId);
    // TODO: Implement delete functionality
  };

  const handleShareOutfit = (outfitId: string) => {
    console.log("Share outfit:", outfitId);
    // TODO: Implement share functionality
  };

  const OutfitCard = ({ outfit }: { outfit: typeof savedOutfits[0] }) => (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Outfit Preview */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <div className="grid grid-cols-2 gap-1 p-2 h-full">
          {outfit.items.slice(0, 4).map((item, index) => (
            <div 
              key={item.id}
              className={`relative rounded-lg overflow-hidden ${
                outfit.items.length === 1 ? 'col-span-2' :
                outfit.items.length === 2 && index === 0 ? 'col-span-2' :
                outfit.items.length === 3 && index === 0 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        {/* Public/Private Badge */}
        <Badge 
          variant={outfit.isPublic ? "default" : "secondary"}
          className="absolute bottom-2 left-2"
        >
          {outfit.isPublic ? "Public" : "Private"}
        </Badge>
      </div>

      {/* Outfit Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground">{outfit.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {outfit.isPublic && (
              <>
                <Heart className="w-4 h-4" />
                <span>{outfit.likes}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            {outfit.items.length} items
          </span>
          <span className="font-semibold text-primary">
            ${outfit.totalPrice}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {outfit.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="fashion" size="sm" className="flex-1">
            <Eye className="w-4 h-4" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleShareOutfit(outfit.id)}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDeleteOutfit(outfit.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">My Outfits</h1>
              <p className="text-muted-foreground">
                {savedOutfits.length} saved outfits
              </p>
            </div>
            <Button asChild variant="fashion">
              <Link to="/outfit-builder">
                <Plus className="w-4 h-4" />
                Create New Outfit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search outfits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredOutfits.length > 0 ? (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No outfits found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedTag 
                ? "Try adjusting your search or filters"
                : "Create your first outfit to get started"
              }
            </p>
            <Button asChild variant="fashion">
              <Link to="/outfit-builder">
                <Plus className="w-4 h-4" />
                Create New Outfit
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedOutfits;