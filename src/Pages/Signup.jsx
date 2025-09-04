// src/Pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { account } from "../appwrite";
import { ID } from "appwrite";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth(); // AuthContext se state update ke liye

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ 1. Account create (Appwrite v11 format)
      await account.create(
        ID.unique(),
        form.email,
        form.password,
        form.name
      );

      // ✅ 2. Auto-login
      await account.createEmailPasswordSession(form.email, form.password);

      // ✅ 3. Fetch current user
      const currentUser = await account.get();
      setUser(currentUser);

      navigate("/"); // Home page
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] bg-black flex items-center justify-center sm:pt-16">
      {/* Close Button */}
      <div className="flex justify-end items-center px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-white rounded-full p-1 hover:bg-gray-800"
        >
          <X size={30} />
        </button>
      </div>

      {/* Signup Form */}
      <div className="bg-white min-h-[80vh] rounded-3xl flex items-center justify-center w-full max-w-md mx-auto p-6">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to Machinist
            </h2>
            <p className="text-sm text-gray-500 mt-2">Get started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none"
              required
            />

            {error && <p className="text-red-600 text-center text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
