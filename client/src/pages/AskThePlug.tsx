import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { MessageCircle, FileText } from "lucide-react";

export default function AskThePlug() {
  const [mode, setMode] = useState<"chat" | "form">("chat");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    itemDescription: "",
  });
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "Hey! 👋 Welcome to Ask the Plug. What can I help you source today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const createRequest = trpc.customRequests.create.useMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRequest.mutateAsync(formData);
      toast.success("Request submitted! We'll get back to you soon.");
      setFormData({ name: "", email: "", whatsapp: "", itemDescription: "" });
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    }
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");

    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Got it! You're looking for "${chatInput}". We'll source that for you. Please use the form to provide your contact details so we can reach out with pricing and availability.`,
        },
      ]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ask the Plug</h1>
          <p className="text-lg text-gray-600 mb-8">
            Need something specific? We'll source it for you. Choose your preferred way to reach out.
          </p>

          {/* Mode Toggle */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => setMode("chat")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                mode === "chat"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-600"
              }`}
            >
              <MessageCircle size={20} />
              Chat Mode
            </button>
            <button
              onClick={() => setMode("form")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                mode === "form"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-600"
              }`}
            >
              <FileText size={20} />
              Form Mode
            </button>
          </div>
        </div>

        {/* Chat Mode */}
        {mode === "chat" && (
          <Card className="p-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="What do you need? (e.g., iPhone 15 Pro, Skincare set, etc.)"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                className="flex-1"
              />
              <Button onClick={handleChatSubmit} className="bg-purple-600 hover:bg-purple-700">
                Send
              </Button>
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              After chatting, please fill out the form below with your contact details so we can reach you.
            </p>
          </Card>
        )}

        {/* Form Mode */}
        {mode === "form" && (
          <Card className="p-8 max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">WhatsApp Number</label>
                <Input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+234 (or local number)"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">What do you need?</label>
                <Textarea
                  required
                  value={formData.itemDescription}
                  onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                  placeholder="Describe in detail what you're looking for..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={createRequest.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
              >
                {createRequest.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Card>
        )}

        {/* Always show form section */}
        {mode === "chat" && (
          <Card className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Request</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">WhatsApp Number</label>
                <Input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+234 (or local number)"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">What do you need?</label>
                <Textarea
                  required
                  value={formData.itemDescription}
                  onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                  placeholder="Describe in detail what you're looking for..."
                  rows={3}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={createRequest.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
              >
                {createRequest.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
