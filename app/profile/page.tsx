"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";
import { useOrders } from "@/app/context/OrderContext";
import { auth } from "@/lib/firebase";
import { signOut, updateProfile, updatePassword } from "firebase/auth";
import { User, Mail, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const user = useUser();
  const router = useRouter();
  const { orders, getOrderCount } = useOrders();
  const [activeTab, setActiveTab] = useState("overview");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
  }, [user, router]);

  // Show loading while checking auth
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not logged in
  if (!user) {
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (user && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        setMessage("Profile updated successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      if (user) {
        await updatePassword(user, newPassword);
        setMessage("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update password. You may need to sign in again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold flex-shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {user.displayName || "User Profile"}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 break-all">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <nav className="space-y-1 sm:space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  activeTab === "overview"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  activeTab === "orders"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Orders</span>
              </button>

              <button
                onClick={() => router.push("/WishlistPage")}
                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  activeTab === "settings"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Account Overview</h2>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <h3 className="font-semibold text-sm sm:text-base">Email</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 break-all">{user.email}</p>
                  </div>

                  <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <h3 className="font-semibold text-sm sm:text-base">Display Name</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{user.displayName || "Not set"}</p>
                  </div>

                  <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <h3 className="font-semibold text-sm sm:text-base">Total Orders</h3>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{getOrderCount()}</p>
                  </div>

                  <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <h3 className="font-semibold text-sm sm:text-base">Wishlist Items</h3>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">-</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-sm sm:text-base text-blue-900 mb-2">Account Status</h3>
                  <p className="text-sm sm:text-base text-blue-700">Your account is active and verified.</p>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order History</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                    <button
                      onClick={() => router.push("/")}
                      className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                          <div>
                            <h3 className="font-semibold text-base sm:text-lg break-all">Order #{order.id}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded w-fit">
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 sm:space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 sm:gap-4">
                              <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-xs sm:text-sm truncate">{item.title}</p>
                                <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-sm sm:text-base flex-shrink-0">${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 sm:pt-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                          <div className="text-xs sm:text-sm text-gray-600">
                            <p>{order.shippingMethod}</p>
                            <p className="truncate max-w-full sm:max-w-xs">{order.shippingAddress}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-gray-600">Total</p>
                            <p className="text-lg sm:text-xl font-bold">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Account Settings</h2>

                {message && (
                  <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm sm:text-base text-green-800">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm sm:text-base text-red-800">{error}</p>
                  </div>
                )}

                {/* Update Profile */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Update Profile</h3>
                  <form onSubmit={handleUpdateProfile} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </button>
                  </form>
                </div>

                {/* Change Password */}
                <div className="pt-6 sm:pt-8 border-t">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Change Password</h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Change Password"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
