
import { Button } from "@/components/ui/button";

const categories = [
  { id: 'all', name: 'All Posts', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  { id: 'technology', name: 'Technology', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { id: 'design', name: 'Design', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  { id: 'business', name: 'Business', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { id: 'personal-blog', name: 'Personal', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
  { id: 'education', name: 'Education', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  { id: 'health-wellness', name: 'Health', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { id: 'travel', name: 'Travel', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-full transition-all duration-200 ${
            selectedCategory === category.id 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
              : category.color
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
