
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import BlogCard from "@/components/BlogCard";
import BlogPost from "@/components/BlogPost";
import Footer from "@/components/Footer";
import { mockPosts } from "@/data/mockPosts";
import { BlogPost as BlogPostType } from "@/components/BlogCard";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  const filteredPosts = mockPosts.filter((post) => {
    return selectedCategory === "all" || post.category === selectedCategory;
  });

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={() => {}} searchQuery="" />
        <BlogPost 
          post={selectedPost} 
          onBack={() => setSelectedPost(null)} 
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={() => {}} searchQuery="" />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of developers and creators.
          </p>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600">Try adjusting your category filter.</p>
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

export default Index;
