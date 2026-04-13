import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaShoppingBasket,
  FaCheck,
  FaLinkedin,
} from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Yug Upadhyay",
    role: "Product & Development",
    linkedin: "https://www.linkedin.com/in/yug-upadhyay-2a91b8316/",
  },
  {
    id: 2,
    name: "Yashvi Muchala",
    role: "Design & Research",
    linkedin: "https://www.linkedin.com/in/yashvi-muchhala-307183323/",
  },
  {
    id: 3,
    name: "Prem Desai",
    role: "Frontend Engineering",
    linkedin: "https://www.linkedin.com/in/prem-desai-aa442426a/",
  },
  {
    id: 4,
    name: "Om Solanki",
    role: "Backend Engineering",
    linkedin: "https://www.linkedin.com/in/om-solanki-8bb903376/",
  }
];

const AboutPage = () => {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-[#f8f4eb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="inline-block bg-amber-100 text-amber-900 text-xs font-semibold rounded-full px-3 py-1 mb-6 shadow-sm border border-amber-200">
              <span className="uppercase tracking-wider">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
              About CropCart
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10">
              Bringing the farm to your screen with a cleaner way to discover,
              trust, and order local produce.
            </p>
          </div>
        </div>
      </section>

      <div className="container  mx-auto px-4 py-12">
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="bg-white/70 backdrop-blur-md shadow-xl p-10 rounded-3xl max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-4xl font-extrabold text-amber-800 mb-6 leading-tight">
                    Our Mission
                  </h2>
                  <p className="text-gray-800 text-lg mb-4">
                    CropCart exists to make local buying simple and trustworthy.
                    We help families access fresh produce while giving growers a
                    fair and direct digital channel.
                  </p>
                  <p className="text-gray-800 text-lg">
                    Our platform focuses on clean discovery, clear pricing, and
                    direct communication so both customers and farmers get a
                    better, more transparent experience.
                  </p>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <div className="w-60 h-60 bg-amber-100 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                    <FaLeaf className="text-amber-700 text-8xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-amber-700 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Farmers build profiles and list produce. Customers discover
                trusted local options through a clean and simple interface.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in animate-delay-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBasket className="text-amber-700 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order</h3>
              <p className="text-gray-600">
                Buyers filter products, review details, and place direct orders
                using pickup or delivery preferences.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center shadow-md animate-fade-in animate-delay-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-amber-700 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600">
                Receive quality produce and stay connected with growers for
                updates, trust, and repeat purchases.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">
                For Consumers
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>Access to fresher, more nutritious produce</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>
                    Knowledge about where your food comes from and how it's
                    grown
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>
                    Support for local economy and sustainable farming practices
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>
                    Reduced environmental impact from shorter supply chains
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>Direct communication with farmers</span>
                </li>
              </ul>
            </div>
            <div className="glass p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">
                For Farmers
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>
                    Higher profit margins by selling directly to consumers
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>Stable local market for products</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>Reduced waste through better demand planning</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>
                    Opportunity to showcase sustainable farming practices
                  </span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-amber-700 mt-1 mr-2" />
                  <span>Direct feedback from customers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Core Team
          </h2>
          <p className="text-center text-gray-600 text-xl mb-16">
            The people building and shaping CropCart
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="glass p-5 rounded-2xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200"
              >
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl mb-4 border border-amber-200">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="text-base font-semibold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors text-sm"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
            Whether you are a farmer growing your digital reach or a buyer
            looking for quality local produce, CropCart is built for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-primary px-8 py-3 text-lg font-bold shadow-md"
            >
              Sign Up Now
            </Link>
            <Link
              to="/products"
              className="btn btn-outline px-8 py-3 text-lg font-bold"
            >
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
