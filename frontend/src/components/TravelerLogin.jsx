import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function TravelerLogin() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Find traveler by email or phone
    const { data, error: fetchError } = await supabase
      .from("travellers")
      .select("id, password, email, phone")
      .or(`email.eq.${form.identifier},phone.eq.${form.identifier}`)
      .maybeSingle();
    setLoading(false);
    if (fetchError || !data) {
      setError("Invalid credentials");
      return;
    }
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(form.password, data.password);
    if (!passwordMatch) {
      setError("Invalid credentials");
      return;
    }
    localStorage.setItem("travellerId", data.id);
    navigate("/traveler");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Log In</h2>
        <p className="text-gray-500 mb-6">Choose your account type and login</p>
        <div className="flex mb-6">
          <button type="button" className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-600 font-medium mr-2 bg-gray-50">Individual</button>
          <button type="button" className="flex-1 py-3 rounded-lg border-2 border-blue-600 text-blue-700 font-semibold bg-blue-50">Traveler</button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="Enter your email/ phone number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Forgot Password?</a>
          </div>
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg mt-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In as Traveler"}
          </button>
        </form>
      </div>
    </div>
  );
}
