import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-stone-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaLeaf className="text-amber-400 text-2xl" />
              <h3 className="text-xl font-bold">CropCart</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Bringing the farm to your screen with clean sourcing, fresh
              produce, and direct farmer access.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Farmers", path: "/farmers" },
                { label: "About", path: "/about" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-amber-400 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1" />
                <span>India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-400" />
                <span>Available on request</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400" />
                <span>hello@cropcart.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe for updates on fresh produce and local farmers.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} CropCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
