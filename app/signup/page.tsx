"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserProfile } from "@/lib/userProfiles";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user profile to localStorage
      saveUserProfile(userCredential.user);
      
      // Get redirect URL from query params or default to home
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Domino Spinner */}
        <div className="flex justify-center mb-6 animate-fadeIn">
          <div className="domino-spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start shopping</p>
        </div>

        {/* Form Container */}
        <div className="bg-[#181313] rounded-2xl border-2 border-gray-700/50 shadow-2xl p-8 backdrop-blur-sm animate-scaleIn">
          <form onSubmit={handleSignUp} className="flex flex-col gap-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#211C24] border-2 border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Password Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#211C24] border-2 border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#211C24] border-2 border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 animate-slideInLeft"
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
                <span className="px-2 bg-[#181313] text-gray-400">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link href="/signin" className="animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
              <button type="button" className="w-full border-2 border-gray-600/50 text-white py-3 rounded-lg font-semibold hover:bg-gray-700/50 hover:border-purple-500/50 active:scale-95 transition-all">
                Sign In
              </button>
            </Link>
          </form>
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

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-custom-gradient flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
