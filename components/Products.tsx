"use client";

import React, { useState } from "react";
import ProductsList from "./ProductsList";

const Products = () => {
  const productData = [
    {
      imageSrc: "/Group 1.svg",
      title: "Popular Products",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      bgColor: "white"
    },
    {
      imageSrc: "/ipadpro.svg",
      title: "Ipad Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      bgColor: "#F6F6F6"
    },
    {
      imageSrc: "/samsunggalaxy.svg",
      title: "Samsung Galaxy",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      bgColor: "#EAEAEA"
    },
    {
      imageSrc: "/Macbook 1.svg",
      title: "Macbook Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      bgColor: "#2C2C2C",
      textColor: "#FFFFFF"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 py-6 sm:py-8">
      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {productData.map((product, index) => (
          <ProductsList
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            description={product.description}
            bgColor={product.bgColor}
            textColor={product.textColor}
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {productData.map((product, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{
                  animation: currentIndex === index ? "fadeInSlide 0.5s ease-out" : "none"
                }}
              >
                <ProductsList
                  imageSrc={product.imageSrc}
                  title={product.title}
                  description={product.description}
                  bgColor={product.bgColor}
                  textColor={product.textColor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {productData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? "bg-black w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
