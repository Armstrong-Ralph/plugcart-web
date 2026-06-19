import { Link } from "wouter";
import { Instagram, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-purple-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">PlugCart</h3>
            <p className="text-purple-100">Your ultimate campus plug for everything you need.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-purple-100">
              <li>
                <Link href="/shop">
                  <a className="hover:text-white transition">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/ask-the-plug">
                  <a className="hover:text-white transition">Ask the Plug</a>
                </Link>
              </li>
              <li>
                <Link href="/delivery">
                  <a className="hover:text-white transition">Delivery</a>
                </Link>
              </li>
              <li>
                <Link href="/skinplug">
                  <a className="hover:text-white transition">SkinPlug</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://wa.me/2349044688783" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition" title="WhatsApp">
                <MessageCircle size={24} />
              </a>
              <a href="https://instagram.com/plugcartng" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition" title="Instagram">
                <Instagram size={24} />
              </a>
              <a href="mailto:plugcartng@gmail.com" className="hover:text-purple-200 transition" title="Email">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-purple-100 text-sm">plugcartng@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-purple-500 pt-8">
          <p className="text-center text-purple-100 font-semibold text-lg">
            Built for Babcock University Students FOR Babcock University Students
          </p>
          <p className="text-center text-purple-200 text-sm mt-4">
            © 2026 PlugCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
