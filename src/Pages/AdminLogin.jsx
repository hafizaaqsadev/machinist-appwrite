import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setRole } = useAuth();

  // Hardcoded admin credentials
  const admins = [
    { email: "admin@example.com", password: "admin123" },
    { email: "aqsa@admin.com", password: "admin123" },
    { email: "usman@admin.com", password: "admin123" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find admin by email & password (case-insensitive email)
    const foundAdmin = admins.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );

    if (foundAdmin) {
      // Set user & role in AuthContext
      setUser({ email: foundAdmin.email, role: "admin" });
      setRole("admin");

      toast.success(`Welcome Admin! 🚀`);
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid admin credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
