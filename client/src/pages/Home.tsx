import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageSquare, Truck, BookOpen, Sparkles, Zap } from "lucide-react";
import ReviewsCarousel from "@/components/ReviewsCarousel";

const LOGO_URL = "/manus-storage/file_00000000220c720aac73f69664d32e91_a5efb635.png";

const services = [
  {
    icon: ShoppingBag,
    title: "PlugCart Vendor",
    description: "Shop curated accessories, skincare, phones, and gadgets",
    href: "/shop",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Ask the Plug",
    description: "Request anything you need - we'll source it for you",
    href: "/ask-the-plug",
    color: "from-pink-500 to-purple-600",
  },
  {
    icon: Truck,
    title: "PlugCart Delivery",
    description: "Fast delivery to Babcock campuses and beyond",
    href: "/delivery",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: BookOpen,
    title: "SkinPlug Education",
    description: "Free skincare tips and wellness education",
    href: "/skinplug",
    color: "from-green-500 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "PlugCart Perfumery",
    description: "Premium fragrances and scent collections",
    href: "/shop",
    color: "from-yellow-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "PlugCart Gadgets",
    description: "Latest tech gadgets and accessories",
    href: "/shop",
    color: "from-orange-500 to-purple-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to PlugCart
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Whatever you need, we got the plug. Your ultimate campus companion for shopping, sourcing, and learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <a>
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 w-full sm:w-auto">
                      Start Shopping
                    </Button>
                  </a>
                </Link>
                <Link href="/ask-the-plug">
                  <a>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 w-full sm:w-auto">
                      Ask the Plug
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img src={LOGO_URL} alt="PlugCart Logo" className="w-80 h-auto drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Everything you need in one place</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} href={service.href}>
                  <a className="group">
                    <div className={`bg-gradient-to-br ${service.color} p-8 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 h-full text-white`}>
                      <Icon size={48} className="mb-4 group-hover:scale-110 transition" />
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-purple-100 mb-6">{service.description}</p>
                      <span className="inline-block text-sm font-semibold group-hover:translate-x-2 transition">
                        Explore →
                      </span>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of Babcock University students who trust PlugCart for their needs.
          </p>
          <Link href="/shop">
            <a>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Shop Now
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
