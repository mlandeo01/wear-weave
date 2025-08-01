import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Heart, 
  Palette, 
  Settings, 
  Camera,
  Edit,
  Save,
  Mail,
  MapPin,
  Calendar,
  Award
} from "lucide-react";

// Mock user data
const userData = {
  id: "1",
  name: "Sarah Miller",
  email: "sarah@example.com",
  bio: "Fashion enthusiast and style curator. Love mixing vintage pieces with modern trends.",
  location: "New York, NY",
  joinDate: "January 2024",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8d9?w=200&h=200&fit=crop&crop=face",
  stats: {
    outfits: 12,
    favorites: 45,
    following: 23,
    followers: 156
  },
  preferences: {
    style: ["Minimalist", "Classic", "Bohemian"],
    colors: ["Black", "White", "Beige", "Navy"],
    brands: ["Everlane", "COS", "Reformation", "Acne Studios"],
    priceRange: "$100-$300"
  }
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    bio: userData.bio,
    location: userData.location
  });

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
    // TODO: Save to database
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      bio: userData.bio,
      location: userData.location
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Profile</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings and style preferences
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* User Info */}
              <h2 className="text-xl font-bold text-foreground mb-1">{userData.name}</h2>
              <p className="text-muted-foreground mb-4">{userData.email}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Outfits", value: userData.stats.outfits, icon: Palette },
                  { label: "Favorites", value: userData.stats.favorites, icon: Heart },
                  { label: "Following", value: userData.stats.following, icon: User },
                  { label: "Followers", value: userData.stats.followers, icon: Award }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-8 h-8 bg-fashion-rose/10 rounded-full flex items-center justify-center mx-auto mb-1">
                        <Icon className="w-4 h-4 text-fashion-rose" />
                      </div>
                      <div className="text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Member since {userData.joinDate}</span>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="fashion" onClick={handleSave}>
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="mt-1 text-foreground">{userData.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{userData.email}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userData.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-foreground">{userData.bio}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Style Preferences */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Style Preferences</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Preferred Styles
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.style.map((style) => (
                      <Badge key={style} variant="secondary" className="bg-fashion-rose/10 text-fashion-rose">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Favorite Colors
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Preferred Brands
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.brands.map((brand) => (
                      <Badge key={brand} variant="outline">
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range
                  </Label>
                  <Badge variant="secondary" className="bg-fashion-gold/10 text-fashion-gold">
                    {userData.preferences.priceRange}
                  </Badge>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4" />
                  Update Preferences
                </Button>
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;