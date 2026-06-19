import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";

// Sample products - In production, these would come from Paystack API
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Gaming Thumbsleeves", price: 2000, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Gaming+Thumbsleeves" },
  { id: 2, name: "Gaming Gloves", price: 5000, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Gaming+Gloves" },
  { id: 3, name: "Claw Clips", price: 1000, category: "Accessories", image: "https://via.placeholder.com/300x300?text=Claw+Clips" },
  { id: 4, name: "Satin Hair Scrunchies", price: 500, category: "Hair", image: "https://via.placeholder.com/300x300?text=Hair+Scrunchies" },
  { id: 5, name: "Face Facts Cleanser", price: 11000, category: "Skincare", image: "https://via.placeholder.com/300x300?text=Cleanser" },
  { id: 6, name: "Eyeliner Stamp", price: 1500, category: "Makeup", image: "https://via.placeholder.com/300x300?text=Eyeliner" },
  { id: 7, name: "Mist Spray Bottle", price: 2500, category: "Gadgets", image: "https://via.placeholder.com/300x300?text=Spray+Bottle" },
  { id: 8, name: "Type C Cord", price: 1500, category: "Gadgets", image: "https://via.placeholder.com/300x300?text=Type+C+Cord" },
];

const CATEGORIES = ["All", "Accessories", "Skincare", "Hair", "Makeup", "Gadgets"];

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = (product: typeof SAMPLE_PRODUCTS[0]) => {
    // In production, this would integrate with Paystack
    alert(`Added ${product.name} to cart. Paystack integration coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PlugCart Shop</h1>
          <p className="text-lg text-gray-600">Browse our curated collection of products</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-purple-200 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-600">₦{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleCheckout(product)}
                      className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No products found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
