import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import Button from "../components/ui/Button";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (!formData.password) {
      setError("Password is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      login(
        response.data.access_token,
        response.data.user
      );

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue using TalentIQ"
      icon={<LogIn size={30} />}
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
        >
          Login
        </Button>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;