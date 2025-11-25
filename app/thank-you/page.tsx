"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-2xl">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-[90px] font-bold text-gray-900 mb-6 leading-none">
          Thank You!
        </h1>
        
        <p className="text-xl text-gray-600 mb-4">
          Thank you for shopping with us
        </p>
        
        <p className="text-lg text-gray-500 mb-8">
          Your order has been placed successfully. We'll send you a confirmation email shortly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/profile"
            className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
