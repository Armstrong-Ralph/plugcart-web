import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Star } from "lucide-react";

export default function SubmitReview() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    rating: 5,
    reviewText: "",
  });

  const createReview = trpc.reviews.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview.mutateAsync(formData);
      toast.success("Thank you! Your review has been submitted and will appear after approval.");
      setFormData({ customerName: "", email: "", rating: 5, reviewText: "" });
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Review</h1>
          <p className="text-lg text-gray-600">Help other students discover PlugCart. Your feedback matters!</p>
        </div>

        <Card className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
              <Input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g., John Doe"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Your Review</label>
              <Textarea
                required
                value={formData.reviewText}
                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                placeholder="Tell us about your experience with PlugCart..."
                rows={6}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={createReview.isPending}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            >
              {createReview.isPending ? "Submitting..." : "Submit Review"}
            </Button>

            <p className="text-sm text-gray-600 text-center">
              Your review will be displayed on our homepage after approval. Thank you for your feedback!
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
