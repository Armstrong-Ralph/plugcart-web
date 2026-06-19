import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

const articles = [
  {
    slug: "prevent-acne-breakouts",
    title: "SkinPlug 101 - Ep 1: How to Prevent Acne & Breakouts",
    excerpt: "Learn the secrets to preventing acne and breakouts with practical tips from personal skincare research.",
    category: "Skincare",
    date: "June 2026",
  },
  {
    slug: "find-your-skin-type",
    title: "SkinPlug 101 - Ep 2: Find Your Skin Type in 60 Seconds",
    excerpt: "Discover your skin type (Dry, Oily, Combo, Sensitive) and learn what your skin actually needs.",
    category: "Skincare",
    date: "June 2026",
  },
];

export default function SkinPlug() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-purple-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-900">SkinPlug</h1>
          </div>
          <p className="text-lg text-gray-600">
            Free skincare education and wellness tips. Learn from personal research and experience.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/skinplug/${article.slug}`}>
              <a className="group">
                <Card className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition">
                    Read More <ArrowRight size={20} className="ml-2" />
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg shadow-lg mt-12">
          <h2 className="text-2xl font-bold mb-4">More Episodes Coming Soon</h2>
          <p className="text-purple-100 mb-6">
            We're working on more skincare tips, wellness guides, and educational content. Stay tuned!
          </p>
          <p className="text-sm text-purple-200">
            Subscribe to our WhatsApp for updates on new episodes.
          </p>
        </Card>
      </div>
    </div>
  );
}
