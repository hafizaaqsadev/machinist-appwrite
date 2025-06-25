import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", form);
    alert("Signup successful!");
    navigate("/");
  };

  return (
    <div className="relative min-h-[80vh] bg-black items-center justify-center sm:pt-16">
          {/* Close Button */}
        <div className="flex justify-end items-center px-4 sm:px-6">
            <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white rounded-full p-1 hover:bg-gray-800"
        >
          <X size={30} />
        </button> 
        </div>
        {/* Login Form */}
      <div className=" bg-white min-h-[80vh] rounded-3xl flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to Machinist
            </h2>
            <h3 className="text-xl text-gray-800 font-semibold">
              Company
            </h3>
            <p className="text-sm text-gray-500 mt-2">Get started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-full text-center text-lg focus:outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-full text-center text-lg focus:outline-none"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-full text-center text-lg focus:outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-full text-center text-lg focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full text-lg hover:bg-gray-900 transition"
            >
              Signup
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Here you can see{" "}
            <a href="/terms-conditions" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>
          </div>
          <div className="text-center text-sm text-gray-600">
            Visit our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
