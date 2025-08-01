import { useState } from "react";
import { Heart, ShoppingBag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ClothingItem {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  brand: string;
  websiteLink: string;
  colors?: string[];
  sizes?: string[];
}

interface ClothingCardProps {
  item: ClothingItem;
  onAddToOutfit?: (item: ClothingItem) => void;
  onToggleFavorite?: (item: ClothingItem) => void;
  isFavorited?: boolean;
  className?: string;
}

const ClothingCard = ({ 
  item, 
  onAddToOutfit, 
  onToggleFavorite, 
  isFavorited = false,
  className 
}: ClothingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Image Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-accent/50 animate-pulse" />
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(item);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200",
            isFavorited 
              ? "bg-fashion-rose text-white" 
              : "bg-white/80 text-muted-foreground hover:text-fashion-rose"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
        </button>

        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm"
        >
          {item.category}
        </Badge>

        {/* Hover Actions */}
        <div className={cn(
          "absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          {onAddToOutfit && (
            <Button
              size="sm"
              variant="elegant"
              onClick={(e) => {
                e.stopPropagation();
                onAddToOutfit(item);
              }}
              className="flex-1"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Outfit
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              window.open(item.websiteLink, '_blank');
            }}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate text-sm">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {item.brand}
            </p>
          </div>
          <div className="text-right ml-2">
            <p className="font-semibold text-primary">
              ${item.price}
            </p>
          </div>
        </div>

        {/* Colors */}
        {item.colors && item.colors.length > 0 && (
          <div className="flex gap-1 mb-2">
            {item.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-border/50"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {item.colors.length > 4 && (
              <div className="w-4 h-4 rounded-full bg-muted border border-border/50 flex items-center justify-center text-xs text-muted-foreground">
                +{item.colors.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Sizes */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.sizes.slice(0, 3).map((size) => (
              <Badge key={size} variant="outline" className="text-xs py-0 px-1">
                {size}
              </Badge>
            ))}
            {item.sizes.length > 3 && (
              <Badge variant="outline" className="text-xs py-0 px-1">
                +{item.sizes.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingCard;