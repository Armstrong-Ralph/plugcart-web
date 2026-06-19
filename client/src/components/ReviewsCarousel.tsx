import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviews = [] } = trpc.reviews.listApproved.useQuery();

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
        
        <Card className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="p-2 hover:bg-purple-100 rounded-lg transition"
            >
              <ChevronLeft size={24} className="text-purple-600" />
            </button>

            <div className="flex-1 px-8">
              <div className="flex gap-1 mb-4">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 italic">"{currentReview.reviewText}"</p>
              <p className="text-gray-900 font-bold">— {currentReview.customerName}</p>
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
              className="p-2 hover:bg-purple-100 rounded-lg transition"
            >
              <ChevronRight size={24} className="text-purple-600" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentIndex ? "bg-purple-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Have a great experience? Share your review!</p>
          <Link href="/submit-review">
            <a>
              <Button className="bg-purple-600 hover:bg-purple-700">Leave a Review</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
