import { Card } from "@/components/ui/card";
import { Target, Lightbulb, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About PlugCart</h1>
          <p className="text-lg text-gray-600">Your campus plug for everything you need</p>
        </div>

        {/* Story */}
        <Card className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            PlugCart was born from a simple idea: **make campus life easier for Babcock University students**. 
            What started as a personal project to source hard-to-find items has grown into a full-fledged ecosystem 
            of services designed specifically for students.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe that students deserve convenience, quality, and reliability. Whether you're looking for 
            the latest gadgets, premium skincare products, or just need someone to source that one specific item 
            you can't find anywhere else — PlugCart has got you covered.
          </p>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 rounded-lg shadow-md">
            <Target size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p>To be the ultimate plug for Babcock University students, providing quality products and services with unmatched convenience.</p>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600 to-purple-600 text-white p-8 rounded-lg shadow-md">
            <Lightbulb size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p>To expand PlugCart to other universities while maintaining the same commitment to quality and student-centric service.</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-lg shadow-md">
            <Users size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-3">Our Values</h3>
            <p>Reliability, Quality, Community, and Innovation. We put students first in everything we do.</p>
          </Card>
        </div>

        {/* Services Overview */}
        <Card className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "PlugCart Vendor",
                desc: "Curated shop for accessories, skincare, phones, and gadgets",
              },
              {
                title: "Ask the Plug",
                desc: "Custom sourcing service - request anything you need",
              },
              {
                title: "PlugCart Delivery",
                desc: "Fast, reliable delivery to Babcock campuses and beyond",
              },
              {
                title: "SkinPlug Education",
                desc: "Free skincare tips and wellness education",
              },
              {
                title: "PlugCart Perfumery",
                desc: "Premium fragrances and scent collections",
              },
              {
                title: "PlugCart Gadgets",
                desc: "Latest tech gadgets and accessories",
              },
            ].map((service, idx) => (
              <div key={idx} className="border-l-4 border-purple-600 pl-6">
                <h4 className="font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Future */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Looking Forward</h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            We're just getting started! Our goal is to expand PlugCart to other universities while maintaining 
            the same quality and student-focused approach. We're also planning to introduce more services, 
            better technology, and even more ways to make campus life easier.
          </p>
          <p className="text-purple-100 text-lg">
            Thank you for being part of the PlugCart family. Together, we're building something special.
          </p>
        </Card>
      </div>
    </div>
  );
}
