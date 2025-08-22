import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const categories = [
  {
    id: 'technology',
    name: 'Technology',
    subcategories: [
      { id: 'ai', name: 'AI & Machine Learning' },
      { id: 'programming', name: 'Programming' },
      { id: 'cybersecurity', name: 'Cybersecurity' },
      { id: 'gadgets', name: 'Gadgets' },
      { id: 'software', name: 'Software' }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    subcategories: [
      { id: 'uiux', name: 'UI/UX' },
      { id: 'web-design', name: 'Web Design' },
      { id: 'branding', name: 'Branding' },
      { id: 'graphic-design', name: 'Graphic Design' },
      { id: 'typography', name: 'Typography' }
    ]
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    subcategories: [
      { id: 'fitness', name: 'Fitness' },
      { id: 'nutrition', name: 'Nutrition' },
      { id: 'mental-health', name: 'Mental Health' },
      { id: 'yoga', name: 'Yoga' },
      { id: 'medical-news', name: 'Medical News' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    subcategories: [
      { id: 'destinations', name: 'Destinations' },
      { id: 'travel-tips', name: 'Travel Tips' },
      { id: 'adventure', name: 'Adventure' },
      { id: 'budget-travel', name: 'Budget Travel' },
      { id: 'food-culture', name: 'Food & Culture' }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    subcategories: [
      { id: 'study-tips', name: 'Study Tips' },
      { id: 'online-courses', name: 'Online Courses' },
      { id: 'programming-tutorials', name: 'Programming Tutorials' },
      { id: 'university-news', name: 'University News' },
      { id: 'career-advice', name: 'Career Advice' }
    ]
  }
];

const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevBlog
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2">
                    Home
                  </Link>
                </NavigationMenuItem>

                {categories.map((category) => (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {category.subcategories.map((subcategory) => (
                          <NavigationMenuLink key={subcategory.id} asChild>
                            <Link
                              to={`/blog/${category.id}/${subcategory.id}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{subcategory.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</Link>

              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="text-gray-900 font-medium">{category.name}</div>
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/blog/${category.id}/${subcategory.id}`}
                        className="block text-gray-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
