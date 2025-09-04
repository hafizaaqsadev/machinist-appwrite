// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { account } from "../appwrite";
import { useAuth } from "../context/AuthContext"; // ✅ proper context import

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ ab context se milega

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Login with email & password
      await account.createEmailPasswordSession(form.email, form.password);

      // ✅ Current user fetch
      const currentUser = await account.get();

      // ✅ Context update
      setUser(currentUser);

      // ✅ Redirect home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.message || "Login failed. Please check your credentials.");
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

      {/* Login Form */}
      <div className="bg-white min-h-[80vh] rounded-3xl flex items-center justify-center w-full max-w-md mx-auto p-6 shadow-lg">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-500 mt-2">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 disabled:opacity-50 transition"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
