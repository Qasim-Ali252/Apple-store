import React from "react";
import ProductsList from "./ProductsList";
import { text } from "stream/consumers";

const Products = () => {
  const productData = [
    {
      imageSrc: "/Group 1.svg",
      title: "Popular Products",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        bgColor:"white"
    },
    {
      imageSrc: "/ipadpro.svg",
      title: "Ipad Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
       bgColor:"#F6F6F6"
    },
    {
      imageSrc: "/samsunggalaxy.svg",
      title: "Samsung Galaxy",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        bgColor:"#EAEAEA"
    },
    {
      imageSrc: "/Macbook 1.svg",
      title: "Macbook Pro",
      description:
        "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
        bgColor:"#2C2C2C",
        textColor:"#FFFFFF"

    },
  ];

  return (
    <div className="w-[90rem] h-[40rem] flex justify-between ">
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
  );
};

export default Products;
