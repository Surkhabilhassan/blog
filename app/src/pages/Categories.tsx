
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { 
    id: 'sports', 
    name: 'Sports', 
    icon: '🏈',
    description: 'Sports news, updates, and analysis', 
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200', 
    posts: 45,
    subcategories: ['Football', 'Cricket', 'Tennis', 'Basketball', 'Olympics', 'eSports']
  },
  { 
    id: 'world-news', 
    name: 'World News', 
    icon: '🌍',
    description: 'Global news and current events', 
    color: 'bg-red-100 text-red-700 hover:bg-red-200', 
    posts: 62,
    subcategories: ['Politics', 'International', 'Local', 'Environment', 'Conflict & War']
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    icon: '💻',
    description: 'Tech news, reviews, and programming', 
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200', 
    posts: 78,
    subcategories: ['Gadgets', 'Software', 'Programming', 'AI & Machine Learning', 'Cybersecurity', 'Tech Reviews']
  },
  { 
    id: 'design', 
    name: 'Design', 
    icon: '🎨',
    description: 'UI/UX design, graphic design, and creative processes', 
    color: 'bg-pink-100 text-pink-700 hover:bg-pink-200', 
    posts: 34,
    subcategories: ['UI/UX', 'Graphic Design', 'Web Design', 'Typography', 'Branding']
  },
  { 
    id: 'business', 
    name: 'Business', 
    icon: '💼',
    description: 'Business news, startups, and financial insights', 
    color: 'bg-green-100 text-green-700 hover:bg-green-200', 
    posts: 56,
    subcategories: ['Startups', 'Marketing', 'Finance', 'Crypto', 'Stock Market']
  },
  { 
    id: 'health-wellness', 
    name: 'Health & Wellness', 
    icon: '🧘',
    description: 'Health tips, fitness, and wellness advice', 
    color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200', 
    posts: 42,
    subcategories: ['Fitness', 'Nutrition', 'Mental Health', 'Yoga', 'Medical News']
  },
  { 
    id: 'travel', 
    name: 'Travel', 
    icon: '🧳',
    description: 'Travel guides, tips, and adventure stories', 
    color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200', 
    posts: 38,
    subcategories: ['Destinations', 'Travel Tips', 'Adventure', 'Budget Travel', 'Food & Culture']
  },
  { 
    id: 'education', 
    name: 'Education', 
    icon: '🎓',
    description: 'Learning resources, tutorials, and academic content', 
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200', 
    posts: 51,
    subcategories: ['Study Tips', 'Online Courses', 'Programming Tutorials', 'University News', 'Career Advice']
  },
  { 
    id: 'lifestyle', 
    name: 'Lifestyle', 
    icon: '🛍️',
    description: 'Fashion, relationships, and lifestyle tips', 
    color: 'bg-rose-100 text-rose-700 hover:bg-rose-200', 
    posts: 29,
    subcategories: ['Fashion', 'Relationships', 'Home Decor', 'Beauty', 'Hobbies']
  },
  { 
    id: 'personal-blog', 
    name: 'Personal Blog', 
    icon: '📚',
    description: 'Personal stories, experiences, and reflections', 
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200', 
    posts: 33,
    subcategories: ['Stories', 'Daily Life', 'Lessons Learned', 'Reflections']
  }
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover articles across various topics and find content that interests you most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-sm font-normal text-gray-500">
                      {category.posts} posts
                    </span>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {category.subcategories.slice(0, 4).map((sub, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.subcategories.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors ${category.color} group-hover:scale-105 transform transition-transform`}>
                    View Articles
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
