"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const signup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e: any) {
      setError(e.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start shopping</p>
        </div>

        {/* Form Container */}
        <div className="bg-[#2a2a2a] rounded-2xl border-2 border-gray-700 shadow-2xl p-8 backdrop-blur-sm animate-scaleIn">
          <div className="flex flex-col gap-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Password Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && signup()}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Sign Up Button */}
            <button
              onClick={signup}
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/30 animate-slideInLeft"
              style={{ animationDelay: '0.4s' }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative animate-slideInLeft" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#2a2a2a] text-gray-400">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link href="/signin" className="animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
              <button className="w-full border-2 border-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 hover:border-gray-500 active:scale-95 transition-all">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <Link href="/" className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
