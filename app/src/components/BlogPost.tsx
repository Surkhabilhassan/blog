
import { ArrowLeft, Calendar, User, Clock, Share, Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost as BlogPostType } from "./BlogCard";
import { mockPosts } from "@/data/mockPosts";

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
  onSelectPost?: (post: BlogPostType) => void;
}

const BlogPost = ({ post, onBack, onSelectPost }: BlogPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 10);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      content: "Great article! Very informative and well-written.",
      date: "2 hours ago"
    },
    {
      id: 2,
      author: "Mike Chen",
      content: "Thanks for sharing this. I learned a lot from reading it.",
      date: "5 hours ago"
    },
    {
      id: 3,
      author: "Emily Davis",
      content: "This is exactly what I was looking for. Bookmarked!",
      date: "1 day ago"
    }
  ]);

  // Get related articles from the same category (excluding current post)
  const relatedArticles = mockPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const getCategoryColor = (category: string) => {
    const colors = {
      programming: 'bg-blue-100 text-blue-700',
      ai: 'bg-purple-100 text-purple-700',
      design: 'bg-pink-100 text-pink-700',
      personal: 'bg-green-100 text-green-700',
      tutorial: 'bg-orange-100 text-orange-700',
      technology: 'bg-blue-100 text-blue-700',
      health: 'bg-green-100 text-green-700',
      travel: 'bg-yellow-100 text-yellow-700',
      business: 'bg-purple-100 text-purple-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        content: newComment,
        date: "Just now"
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleRelatedArticleClick = (relatedPost: BlogPostType) => {
    if (onSelectPost) {
      onSelectPost(relatedPost);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6 hover:bg-gray-100 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to posts
      </Button>

      {/* Hero section */}
      <div className="mb-8">
        <Badge className={`${getCategoryColor(post.category)} border-0 font-medium mb-4`}>
          {post.category}
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{post.readTime}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Like and Comment buttons */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-2 ${isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-red-600'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length} Comments</span>
          </Button>
        </div>
      </div>

      {/* Featured image */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <img
          src={`https://images.unsplash.com/${post.imageUrl}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
          {post.excerpt}
        </div>
        
        <div className="text-gray-700 leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleRelatedArticleClick(article)}
              >
                <img
                  src={`https://images.unsplash.com/${article.imageUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <Badge className={`${getCategoryColor(article.category)} border-0 font-medium mb-2 text-xs`}>
                  {article.category}
                </Badge>
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
        
        {/* Add Comment */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Add a Comment</h4>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Author bio */}
      <div className="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-xl font-bold mb-3">About the Author</h3>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-lg">{post.author}</h4>
            <p className="text-gray-600 mt-2">
              Passionate developer and writer sharing insights about technology, programming, and personal growth. 
              Always learning and helping others along the way.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
