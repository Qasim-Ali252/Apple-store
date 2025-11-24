"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

interface Address {
  id: string;
  name: string;
  fullAddress: string;
  phone: string;
  isDefault: boolean;
}

interface AddressFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("address1");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [saveAsBilling, setSaveAsBilling] = useState(false);
  
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });

  const [cardData, setCardData] = useState({
    cardholderName: "",
    cardNumber: "",
    expDate: "",
    cvv: ""
  });

  // Sample addresses - you can replace with real data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "address1",
      name: "2118 Thornridge",
      fullAddress: "2118 Thornridge Cir Syracuse, Connecticut 35624",
      phone: "(209) 555-0104",
      isDefault: true
    },
    {
      id: "address2",
      name: "Headoffice",
      fullAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      phone: "(704) 555-0127",
      isDefault: false
    }
  ]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/cart");
    }
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setEditingAddressId(null);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: ""
    });
  };

  const handleEditAddress = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setEditingAddressId(id);
      setShowAddressForm(true);
      // Parse the address back into form fields
      setFormData({
        name: address.name,
        street: address.fullAddress.split(',')[0],
        city: address.fullAddress.split(',')[1]?.trim() || "",
        state: address.fullAddress.split(',')[2]?.trim() || "",
        zipCode: address.fullAddress.split(' ').pop() || "",
        phone: address.phone
      });
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveAddress = () => {
    if (!formData.name || !formData.street || !formData.city || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
    
    if (editingAddressId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId 
          ? { ...addr, name: formData.name, fullAddress, phone: formData.phone }
          : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        id: `address${addresses.length + 1}`,
        name: formData.name,
        fullAddress,
        phone: formData.phone,
        isDefault: false
      };
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress.id);
    }

    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 sm:mb-12 overflow-x-auto">
          {/* Step 1 - Address */}
          <div className="flex items-center flex-shrink-0">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              currentStep >= 1 ? "bg-black text-white" : "bg-gray-300 text-gray-600"
            }`}>
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <div className="ml-2 sm:ml-3 hidden sm:block">
              <div className="text-xs text-gray-500">Step 1</div>
              <div className={`text-sm font-medium ${currentStep >= 1 ? "text-black" : "text-gray-400"}`}>
                Address
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${currentStep >= 2 ? "bg-black" : "bg-gray-300"}`}></div>

          {/* Step 2 - Shipping */}
          <div className="flex items-center flex-shrink-0">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              currentStep >= 2 ? "bg-black text-white" : "bg-gray-300 text-gray-600"
            }`}>
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <div className="ml-2 sm:ml-3 hidden sm:block">
              <div className="text-xs text-gray-500">Step 2</div>
              <div className={`text-sm font-medium ${currentStep >= 2 ? "text-black" : "text-gray-400"}`}>
                Shipping
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 ${currentStep >= 3 ? "bg-black" : "bg-gray-300"}`}></div>

          {/* Step 3 - Payment */}
          <div className="flex items-center flex-shrink-0">
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base ${
              currentStep >= 3 ? "bg-black text-white" : "bg-gray-300 text-gray-600"
            }`}>
              3
            </div>
            <div className="ml-2 sm:ml-3 hidden sm:block">
              <div className="text-xs text-gray-500">Step 3</div>
              <div className={`text-sm font-medium ${currentStep >= 3 ? "text-black" : "text-gray-400"}`}>
                Payment
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: Address Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Select Address</h2>
              
              {!showAddressForm ? (
                <>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAddress === address.id
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAddress(address.id)}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Radio Button */}
                          <div className="flex items-center h-6 flex-shrink-0">
                            <input
                              type="radio"
                              checked={selectedAddress === address.id}
                              onChange={() => setSelectedAddress(address.id)}
                              className="w-4 h-4 sm:w-5 sm:h-5 accent-black"
                            />
                          </div>

                          {/* Address Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="font-semibold text-base sm:text-lg">{address.name}</h3>
                              {address.isDefault && (
                                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-black text-white text-xs rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-1">{address.fullAddress}</p>
                            <p className="text-sm sm:text-base text-gray-500">{address.phone}</p>
                          </div>

                          {/* Edit & Delete Icons */}
                          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(address.id);
                              }}
                              className="text-gray-600 hover:text-black"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}
                              className="text-gray-600 hover:text-red-600"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address Button */}
                  <button
                    onClick={handleAddAddress}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Add New Address</span>
                  </button>
                </>
              ) : (
                /* Add/Edit Address Form */
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-6">
                    {editingAddressId ? "Edit Address" : "Add New Address"}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Address Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="e.g., Home, Office"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleFormChange}
                        placeholder="Enter street address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleFormChange}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleFormChange}
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* Zip Code and Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleFormChange}
                          placeholder="Zip Code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="(123) 456-7890"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleCancelForm}
                        className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAddress}
                        className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                      >
                        {editingAddressId ? "Update Address" : "Save Address"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Shipping */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Select Shipping Method</h2>
              <div className="space-y-4">
                {/* Standard Delivery */}
                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedShipping === "standard" 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedShipping("standard")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={selectedShipping === "standard"}
                        onChange={() => setSelectedShipping("standard")}
                        className="w-5 h-5 accent-black" 
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold">Standard Delivery</h3>
                        <p className="text-sm text-gray-600">3-5 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold">$29.00</span>
                  </div>
                </div>
                
                {/* Express Delivery */}
                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedShipping === "express" 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedShipping("express")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={selectedShipping === "express"}
                        onChange={() => setSelectedShipping("express")}
                        className="w-5 h-5 accent-black" 
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold">Express Delivery</h3>
                        <p className="text-sm text-gray-600">1-2 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold">$49.00</span>
                  </div>
                </div>

                {/* Schedule Delivery */}
                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedShipping === "scheduled" 
                      ? "border-black bg-gray-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedShipping("scheduled")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={selectedShipping === "scheduled"}
                        onChange={() => setSelectedShipping("scheduled")}
                        className="w-5 h-5 accent-black" 
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold mb-1">Schedule Delivery</h3>
                        <p className="text-sm text-gray-600 mb-3">Pick a date when you want to get your delivery</p>
                        
                        {/* Date Picker - Only show when this option is selected */}
                        {selectedShipping === "scheduled" && (
                          <div className="mt-3">
                            <input
                              type="date"
                              value={scheduledDate}
                              onChange={(e) => setScheduledDate(e.target.value)}
                              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Tomorrow
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold">$15.00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-8">
              
              {/* Left Side - Summary */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                      </div>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-sm text-gray-600">
                    {addresses.find(a => a.id === selectedAddress)?.fullAddress}
                  </p>
                </div>

                {/* Shipment Method */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Shipment method</h3>
                  <p className="text-sm text-gray-600">
                    {selectedShipping === "standard" && "Standard Delivery - $29.00"}
                    {selectedShipping === "express" && "Express Delivery - $49.00"}
                    {selectedShipping === "scheduled" && `Schedule Delivery - $15.00 (${scheduledDate})`}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated shipping & Handling</span>
                    <span className="font-medium">
                      ${selectedShipping === "standard" ? "29" : selectedShipping === "express" ? "49" : "15"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>
                      ${(
                        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                        50 +
                        (selectedShipping === "standard" ? 29 : selectedShipping === "express" ? 49 : 15)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Payment Form */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Payment</h2>
                
                {/* Payment Method Tabs */}
                <div className="flex gap-2 sm:gap-4 mb-6 border-b overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setSelectedPayment("credit")}
                    className={`pb-3 px-3 sm:px-4 font-medium text-sm sm:text-base whitespace-nowrap transition-colors ${
                      selectedPayment === "credit"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    onClick={() => setSelectedPayment("paypal")}
                    className={`pb-3 px-3 sm:px-4 font-medium text-sm sm:text-base whitespace-nowrap transition-colors ${
                      selectedPayment === "paypal"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    onClick={() => setSelectedPayment("paypal-credit")}
                    className={`pb-3 px-3 sm:px-4 font-medium text-sm sm:text-base whitespace-nowrap transition-colors ${
                      selectedPayment === "paypal-credit"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    PayPal Credit
                  </button>
                </div>

                {/* Credit Card Form */}
                {selectedPayment === "credit" && (
                  <div className="space-y-6">
                    {/* Card Visual */}
                    <div className="bg-gradient-to-br from-gray-800 to-black text-white p-6 rounded-xl h-48 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-10 bg-yellow-400 rounded"></div>
                        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                          <circle cx="18" cy="24" r="12" fill="#EB001B" />
                          <circle cx="30" cy="24" r="12" fill="#FF5F00" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xl tracking-widest mb-2">
                          {cardData.cardNumber || "0000  0000  0000  0000"}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>{cardData.cardholderName || "Cardholder"}</span>
                          <span>{cardData.expDate || "MM/YY"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardData.cardholderName}
                          onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                          placeholder="Enter cardholder name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            if (value.length <= 16 && /^\d*$/.test(value)) {
                              const formatted = value.match(/.{1,4}/g)?.join('  ') || value;
                              setCardData({ ...cardData, cardNumber: formatted });
                            }
                          }}
                          placeholder="0000  0000  0000  0000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exp.Date
                          </label>
                          <input
                            type="text"
                            value={cardData.expDate}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 4) {
                                const formatted = value.length >= 2 
                                  ? `${value.slice(0, 2)}/${value.slice(2)}` 
                                  : value;
                                setCardData({ ...cardData, expDate: formatted });
                              }
                            }}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 3) {
                                setCardData({ ...cardData, cvv: value });
                              }
                            }}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          />
                        </div>
                      </div>

                      {/* Same as billing address checkbox */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="billing"
                          checked={saveAsBilling}
                          onChange={(e) => setSaveAsBilling(e.target.checked)}
                          className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="billing" className="text-sm text-gray-700">
                          Same as billing address
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Options */}
                {(selectedPayment === "paypal" || selectedPayment === "paypal-credit") && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">You will be redirected to PayPal to complete your payment</p>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                      Continue with PayPal
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12 ${currentStep === 3 ? "lg:col-start-2" : ""}`}>
            <button
              onClick={handleBack}
              className="w-full sm:flex-1 py-3 sm:py-3.5 border-2 border-black rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 active:scale-95 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="w-full sm:flex-1 py-3 sm:py-3.5 bg-black text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 active:scale-95 transition-all"
            >
              {currentStep === 3 ? "Pay" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
