import { Card } from "@/components/ui/card";
import { MapPin, Truck, DollarSign } from "lucide-react";

const deliveryZones = [
  {
    name: "Babcock University Main Campus",
    fee: "FREE",
    description: "Complimentary delivery to all students on main campus",
    icon: Truck,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Babcock University Iperu Campus",
    fee: "₦1,500",
    description: "Fast delivery to Iperu campus location",
    icon: MapPin,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Other Locations",
    fee: "Invoice-Based",
    description: "Custom delivery fees calculated based on location and order size",
    icon: DollarSign,
    color: "from-orange-500 to-red-600",
  },
];

export default function Delivery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PlugCart Delivery</h1>
          <p className="text-lg text-gray-600">Fast, reliable delivery to your doorstep</p>
        </div>

        {/* Delivery Zones */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {deliveryZones.map((zone, idx) => {
            const Icon = zone.icon;
            return (
              <Card key={idx} className={`bg-gradient-to-br ${zone.color} p-8 text-white rounded-lg shadow-lg hover:shadow-xl transition`}>
                <Icon size={48} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">{zone.name}</h3>
                <p className="text-white/90 mb-6">{zone.description}</p>
                <div className="text-4xl font-bold">{zone.fee}</div>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <Card className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Delivery Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Place Order", desc: "Shop and complete your purchase" },
              { step: 2, title: "Confirm Details", desc: "Provide delivery location" },
              { step: 3, title: "Process", desc: "We prepare your order" },
              { step: 4, title: "Delivery", desc: "Receive at your location" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ */}
        <Card className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does delivery take?",
                a: "Main campus: 1-2 hours. Iperu: 2-3 hours. Other locations depend on distance.",
              },
              {
                q: "Can I track my order?",
                a: "Yes! You'll receive updates via WhatsApp and email.",
              },
              {
                q: "What if I'm not available for delivery?",
                a: "Contact us via WhatsApp and we'll arrange a convenient time.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
