
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import BlogPost from "@/components/BlogPost";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPosts } from "@/data/mockPosts";
import { BlogPost as BlogPostType } from "@/components/BlogCard";

const categories = {
  'sports': { 
    name: 'Sports', 
    icon: '🏈',
    description: 'Sports news, updates, and analysis',
    subcategories: ['Football', 'Cricket', 'Tennis', 'Basketball', 'Olympics', 'eSports']
  },
  'world-news': { 
    name: 'World News', 
    icon: '🌍',
    description: 'Global news and current events',
    subcategories: ['Politics', 'International', 'Local', 'Environment', 'Conflict & War']
  },
  'technology': { 
    name: 'Technology', 
    icon: '💻',
    description: 'Tech news, reviews, and programming',
    subcategories: ['Gadgets', 'Software', 'Programming', 'AI & Machine Learning', 'Cybersecurity']
  },
  'design': { 
    name: 'Design', 
    icon: '🎨',
    description: 'UI/UX design, graphic design, and creative processes',
    subcategories: ['UI/UX', 'Graphic Design', 'Web Design', 'Typography', 'Branding']
  },
  'business': { 
    name: 'Business', 
    icon: '💼',
    description: 'Business news, startups, and financial insights',
    subcategories: ['Startups', 'Marketing', 'Finance', 'Crypto', 'Stock Market']
  },
  'health': { 
    name: 'Health & Wellness', 
    icon: '🧘',
    description: 'Health tips, fitness, and wellness advice',
    subcategories: ['Fitness', 'Nutrition', 'Mental Health', 'Yoga', 'Medical News']
  },
  'travel': { 
    name: 'Travel', 
    icon: '🧳',
    description: 'Travel guides, tips, and adventure stories',
    subcategories: ['Destinations', 'Travel Tips', 'Adventure', 'Budget Travel', 'Food & Culture']
  },
  'education': { 
    name: 'Education', 
    icon: '🎓',
    description: 'Learning resources, tutorials, and academic content',
    subcategories: ['Study Tips', 'Online Courses', 'Programming Tutorials', 'University News', 'Career Advice']
  },
  'lifestyle': { 
    name: 'Lifestyle', 
    icon: '🛍️',
    description: 'Fashion, relationships, and lifestyle tips',
    subcategories: ['Fashion', 'Relationships', 'Home Decor', 'Beauty', 'Hobbies']
  },
  'personal-blog': { 
    name: 'Personal Blog', 
    icon: '📚',
    description: 'Personal stories, experiences, and reflections',
    subcategories: ['Stories', 'Daily Life', 'Lessons Learned', 'Reflections']
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");

  const category = categoryId ? categories[categoryId as keyof typeof categories] : null;
  
  // Filter posts based on category
  const categoryPosts = mockPosts.filter(post => {
    return post.category === categoryId;
  });

  const filteredPosts = categoryPosts.filter((post) => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubcategory = selectedSubcategory === "all" || 
      post.tags.some(tag => tag.toLowerCase() === selectedSubcategory.toLowerCase());
    
    return matchesSearch && matchesSubcategory;
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
        <BlogPost 
          post={selectedPost} 
          onBack={() => setSelectedPost(null)}
          onSelectPost={setSelectedPost}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/categories">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-6">{category.description}</p>
          
          {/* Subcategories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Subcategories</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedSubcategory === "all" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedSubcategory("all")}
              >
                All
              </Badge>
              {category.subcategories.map((sub, index) => (
                <Link 
                  key={index}
                  to={`/blog/${categoryId}/${sub.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`}
                >
                  <Badge 
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {sub}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          <p className="text-gray-500">{filteredPosts.length} articles found</p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-6">
              We're working on adding more content to this category. Check back soon!
            </p>
            <Link to="/categories">
              <Button>Explore Other Categories</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onClick={setSelectedPost}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
