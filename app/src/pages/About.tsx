
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Zap } from "lucide-react";
import { useState } from "react";

const About = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DevBlog
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A modern platform where developers share knowledge, insights, and experiences. 
            Join our community of passionate creators and learners.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                DevBlog was created to bridge the gap between experienced developers and those just starting their journey. 
                We believe that knowledge sharing accelerates innovation and builds stronger communities.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our platform provides a space for developers to share tutorials, insights, career advice, and personal experiences 
                that can help others grow in their tech careers.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Join Our Community
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>5,000+</CardTitle>
                  <CardDescription>Active Writers</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>50,000+</CardTitle>
                  <CardDescription>Articles Published</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Heart className="w-8 h-8 text-pink-600 mb-2" />
                  <CardTitle>1M+</CardTitle>
                  <CardDescription>Monthly Readers</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-orange-600 mb-2" />
                  <CardTitle>100+</CardTitle>
                  <CardDescription>Topics Covered</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Community First</CardTitle>
                <CardDescription>
                  We prioritize building a supportive and inclusive community where everyone can learn and grow together.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Quality Content</CardTitle>
                <CardDescription>
                  We maintain high standards for content quality, ensuring every article provides real value to our readers.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Open Knowledge</CardTitle>
                <CardDescription>
                  We believe knowledge should be accessible to everyone, regardless of their background or experience level.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to share your knowledge or learn from others, DevBlog is the perfect platform for you. 
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Writing
            </Button>
            <Button variant="outline" size="lg">
              Explore Articles
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
