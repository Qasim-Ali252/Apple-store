"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getSavedProfiles, removeUserProfile, saveUserProfile } from "@/lib/userProfiles";
import { User, X } from "lucide-react";

interface ProfileSwitcherProps {
  onClose: () => void;
  currentUserEmail?: string;
}

export default function ProfileSwitcher({ onClose, currentUserEmail }: ProfileSwitcherProps) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(getSavedProfiles());
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileSelect = (email: string) => {
    setSelectedProfile(email);
    setPassword("");
    setError("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile || !password) return;

    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, selectedProfile, password);
      
      // Save/update user profile in localStorage
      saveUserProfile(userCredential.user);
      
      onClose();
      router.push("/");
    } catch (err: any) {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfile = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeUserProfile(email);
    setProfiles(getSavedProfiles());
    if (selectedProfile === email) {
      setSelectedProfile(null);
      setPassword("");
    }
  };

  const filteredProfiles = profiles.filter(p => p.email !== currentUserEmail);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Switch Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No saved accounts found</p>
              <button
                onClick={() => {
                  onClose();
                  router.push("/signin");
                }}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Sign in with another account
              </button>
            </div>
          ) : !selectedProfile ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Select an account to switch to:
              </p>
              <div className="space-y-2">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile.email}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group cursor-pointer"
                    onClick={() => handleProfileSelect(profile.email)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {profile.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{profile.email}</p>
                        <p className="text-xs text-gray-500">
                          Last login: {new Date(profile.lastLogin).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveProfile(profile.email, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                      title="Remove account"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => {
                    onClose();
                    router.push("/signin");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Sign in with another account</span>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {selectedProfile.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedProfile}</p>
                  <p className="text-xs text-gray-500">Enter password to continue</p>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProfile(null);
                    setPassword("");
                    setError("");
                  }}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !password}
                  className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
