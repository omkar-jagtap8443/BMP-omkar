
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const initialState = {
  name: "",
  phone: "",
  email: "",
  altPhone: "",
  city: "",
  state: "",
  password: "",
  confirmPassword: "",
};

export default function TravelerSignUp() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (Object.values(form).some((v) => !v)) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const hashedPassword = await bcrypt.hash(form.password, 10);
      const { data, error: supaError } = await supabase
        .from("travellers")
        .insert([
          {
            name: form.name,
            phone: form.phone,
            email: form.email,
            alt_phone: form.altPhone,
            city: form.city,
            state: form.state,
            password: hashedPassword,
          },
        ])
        .select();
      setLoading(false);
      if (supaError) {
        setError(supaError.message);
        return;
      }
      localStorage.setItem("travellerId", data[0].id);
      navigate("/traveler");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Sign Up</h2>
        <p className="text-gray-500 mb-6">Choose your account type and create an account</p>
        <div className="flex mb-6">
          <button type="button" className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-600 font-medium mr-2 bg-gray-50">Individual</button>
          <button type="button" className="flex-1 py-3 rounded-lg border-2 border-blue-600 text-blue-700 font-semibold bg-blue-50">Traveler</button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name (As per Adhar card)"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number (linked to Adhar card)"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="altPhone"
              value={form.altPhone}
              onChange={handleChange}
              placeholder="Alternate Phone Number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" required className="mr-2" />
            <span className="text-gray-600 text-sm">I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a></span>
          </div>
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg mt-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
