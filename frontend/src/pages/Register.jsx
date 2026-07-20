import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Enter a valid email.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <div className="flex flex-col items-center">

            <div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center">

              <UserPlus className="text-cyan-400" size={30} />

            </div>

            <h1 className="mt-6 text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-center text-slate-400">
              Join TalentIQ and start optimizing your resume with AI.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={20}
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="mt-8 text-center text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Login
            </Link>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Register;