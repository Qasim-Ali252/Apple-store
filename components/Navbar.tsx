// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { FaHeart } from "react-icons/fa";

import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { useUser } from "@/lib/useUser";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ProfileSwitcher from "@/components/ProfileSwitcher";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();
  const user = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Toggle function for the mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Search function
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=5`);
      const data = await response.json();
      setSearchResults(data.products || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProductClick = (category: string, id: number) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/products/${category}/${id}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSwitchAccount = () => {
    setShowUserMenu(false);
    setShowProfileSwitcher(true);
  };

  return (
    <>
    {/* Navbar */}
    <nav className="w-full flex max-w-[1800px] xl:w-[90%] mx-auto items-center xl:px-0 px-8 bg-white justify-between h-[5.5rem] relative z-20 border-b lg:border-b-0 border-gray-200">

      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" onClick={isOpen ? toggleMenu : undefined}>
          <div className="gap-[0.625rem] w-[4.09rem] h-[1.43rem]">
            {/* NOTE: You should use the Next/Image component for local assets */}
            <img src="/Logo Vector.svg" alt="Logo" className="h-full w-auto" />
          </div>
        </Link>
      </div>

      {/* Desktop Menu & Search */}
      <div className="hidden lg:flex items-center gap-10">
        
        {/* Search Bar (Desktop Only) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 mr-1 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="bg-gray-200 pl-10 pr-4 py-2 rounded-lg w-[23.25rem] h-[3.5rem] focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.category, product.id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.title}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <span className="font-semibold text-sm">${product.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="flex items-center xl:gap-[3.25rem] gap-11">
          <Link href="/" className="text-black hover:text-gray-700 font-medium text-base transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-black/70 hover:text-black font-medium text-base transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-black/70 hover:text-black font-medium text-base transition-colors">
            Contact Us
          </Link>
          <Link href="/blog" className="text-black/70 hover:text-black font-medium text-base transition-colors">
            Blog
          </Link>
        </div>
      </div>

      {/* Desktop Icons (Wishlist, Cart, User) */}
      {/* These should be visible on MD screens and hidden on mobile, as they are now in the mobile menu */}
      <div className="hidden lg:flex items-center gap-[1.5rem]">
        
        {/* ❤️ Wishlist Icon (Desktop) */}
        <Link href="/WishlistPage">
          <div className="relative cursor-pointer">
            <FaHeart className={`w-6 h-6 transition-all duration-200 ${wishlist.length > 0 ? "text-red-500" : "text-gray-700 hover:text-black"}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-200 text-black font-medium text-[12px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </div>
        </Link>

        {/* 🛒 Cart (Desktop) */}
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-200 text-black font-medium text-[12px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>

        {/* 👤 User (Desktop) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
            className="flex items-center gap-2"
          >
            <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {user ? (
                <>
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push('/profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleSwitchAccount}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Switch Account
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push('/signin');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push('/signup');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* ☰ Mobile Menu Button (Always on right on mobile) */}
      <button
        className="lg:hidden focus:outline-none z-30"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-8 h-8 text-black" /> : <Menu className="w-8 h-8 text-black" />}
      </button>

      {/* 📱 Mobile Dropdown Menu */}
      {/* Added fixed/absolute positioning and transition for slide-down effect */}
     <div
  className={`rounded-s-xl absolute right-0 w-[80%] bg-white z-10 transform transition-transform duration-300 ease-in-out lg:hidden ${
    // The key change is using h-screen (100vh) and offsetting the top margin
    isOpen ? "top-[5.5rem]  translate-x-0 opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
        <div className="flex flex-col p-6 space-y-6">
          
          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-gray-200 pl-10 pr-4 py-3 rounded-lg text-base focus:outline-none"
            />
            
            {/* Mobile Search Results */}
            {showResults && searchQuery.length >= 2 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          handleProductClick(product.category, product.id);
                          toggleMenu();
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-contain rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.title}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <span className="font-semibold text-sm">${product.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">No products found</div>
                )}
              </div>
            )}
          </div>

          <hr className="border-gray-200" />
          
          {/* Mobile Nav Links */}
          <Link href="/" onClick={toggleMenu} className="block text-xl text-gray-700 hover:text-black font-semibold">
            Home
          </Link>
          <Link href="/about" onClick={toggleMenu} className="block text-xl text-gray-700 hover:text-black font-semibold">
            About
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="block text-xl text-gray-700 hover:text-black font-semibold">
            Contact Us
          </Link>
          <Link href="/blog" onClick={toggleMenu} className="block text-xl text-gray-700 hover:text-black font-semibold">
            Blog
          </Link>

          <hr className="border-gray-200" />

          {/* ⚡ Mobile Icons (Wishlist, Cart, User) */}
          <div className="flex flex-col space-y-4">
            {/* Wishlist */}
            <Link href="/WishlistPage" onClick={toggleMenu} className="flex items-center text-lg text-gray-700 hover:text-black">
              <div className="relative mr-4">
                <FaHeart className={`w-6 h-6 ${wishlist.length > 0 ? "text-red-500" : "text-gray-700"}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-200 text-black font-medium text-[12px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {wishlist.length}
                  </span>
                )}
              </div>
              Wishlist
            </Link>

            {/* Cart */}
            <Link href="/cart" onClick={toggleMenu} className="flex items-center text-lg text-gray-700 hover:text-black">
              <div className="relative mr-4">
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-200 text-black font-medium text-[12px] w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
              Shopping Cart
            </Link>

            {/* User */}
            {user ? (
              <>
                <div className="border-t border-gray-200 pt-4">
                  {/* <div className="px-2 mb-3">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                  </div> */}
                  
                  <button
                    onClick={() => {
                      toggleMenu();
                      router.push('/profile');
                    }}
                    className="flex items-center text-lg text-gray-700 hover:text-black w-full"
                  >
                    <User className="w-6 h-6 mr-4" />
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      toggleMenu();
                      handleSwitchAccount();
                    }}
                    className="flex items-center text-lg text-gray-700 hover:text-black w-full mt-4"
                  >
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Switch Account
                  </button>

                  <button
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                    className="flex items-center text-lg text-red-600 hover:text-red-700 w-full mt-4"
                  >
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => {
                      toggleMenu();
                      router.push('/signin');
                    }}
                    className="flex items-center text-lg text-gray-700 hover:text-black w-full"
                  >
                    <User className="w-6 h-6 mr-4" />
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      toggleMenu();
                      router.push('/signup');
                    }}
                    className="flex items-center text-lg text-gray-700 hover:text-black w-full mt-4"
                  >
                    <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

      {/* Profile Switcher Modal */}
      {showProfileSwitcher && (
        <ProfileSwitcher
          onClose={() => setShowProfileSwitcher(false)}
          currentUserEmail={user?.email || undefined}
        />
      )}
    </>
  );
};

export default Navbar;