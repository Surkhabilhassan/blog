
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import BlogPost from "@/components/BlogPost";
import Footer from "@/components/Footer";
import { mockPosts } from "@/data/mockPosts";
import { BlogPost as BlogPostType } from "@/components/BlogCard";

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  // Filter posts by category and subcategory
  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = post.category.toLowerCase() === categoryId?.toLowerCase();
    const matchesSubcategory = post.tags?.some(tag => 
      tag.toLowerCase().replace(/\s+/g, '-') === subcategoryId?.toLowerCase() ||
      tag.toLowerCase() === subcategoryId?.toLowerCase().replace(/-/g, ' ')
    );
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  // Get category and subcategory names for display
  const getCategoryName = (catId: string) => {
    const categoryMap: { [key: string]: string } = {
      'technology': 'Technology',
      'design': 'Design',
      'health': 'Health & Wellness',
      'travel': 'Travel',
      'education': 'Education',
      'sports': 'Sports',
      'world-news': 'World News',
      'business': 'Business',
      'lifestyle': 'Lifestyle',
      'personal-blog': 'Personal Blog'
    };
    return categoryMap[catId] || catId;
  };

  const getSubcategoryName = (subId: string) => {
    const subcategoryMap: { [key: string]: string } = {
      'ai': 'AI & Machine Learning',
      'programming': 'Programming',
      'cybersecurity': 'Cybersecurity',
      'gadgets': 'Gadgets',
      'software': 'Software',
      'uiux': 'UI/UX',
      'ui-ux': 'UI/UX',
      'web-design': 'Web Design',
      'branding': 'Branding',
      'graphic-design': 'Graphic Design',
      'typography': 'Typography',
      'fitness': 'Fitness',
      'nutrition': 'Nutrition',
      'mental-health': 'Mental Health',
      'yoga': 'Yoga',
      'medical-news': 'Medical News',
      'destinations': 'Destinations',
      'travel-tips': 'Travel Tips',
      'adventure': 'Adventure',
      'budget-travel': 'Budget Travel',
      'food-culture': 'Food & Culture',
      'study-tips': 'Study Tips',
      'online-courses': 'Online Courses',
      'programming-tutorials': 'Programming Tutorials',
      'university-news': 'University News',
      'career-advice': 'Career Advice'
    };
    return subcategoryMap[subId || ''] || subId;
  };

  const categoryName = getCategoryName(categoryId || '');
  const subcategoryName = getSubcategoryName(subcategoryId || '');

  // Show blog post if one is selected
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <span>Blog</span>
            <span className="mx-2">›</span>
            <span>{categoryName}</span>
            <span className="mx-2">›</span>
            <span className="text-blue-600 font-medium">{subcategoryName}</span>
          </nav>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {subcategoryName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest articles and insights about {subcategoryName.toLowerCase()}
          </p>
          <div className="mt-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              {filteredPosts.length} Articles
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                onClick={setSelectedPost}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              We haven't published any articles in this subcategory yet. Check back soon!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;
