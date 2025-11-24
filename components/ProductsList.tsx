import React from "react";

interface ProductsListProps {
  imageSrc: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  imageSrc,
  title,
  description,
  bgColor = "white",
  textColor = "black"
}) => {
  return (
    <div
      className="w-full h-auto min-h-[500px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col items-center justify-between p-4 sm:p-6 rounded-lg hover:shadow-lg transition-shadow"
      style={{ backgroundColor: bgColor }}
    >
      {/* Image */}
      <img
        className="w-full max-w-[300px] sm:max-w-[350px] h-auto object-contain mt-2 sm:mt-4"
        src={imageSrc}
        alt={title}
      />

      <div className="w-full max-w-[300px] flex flex-col gap-4 mt-4 sm:mt-6">
        {/* Title */}
        <h3
          className="text-2xl sm:text-3xl font-light leading-tight text-center"
          style={{ color: textColor }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-medium text-xs sm:text-sm leading-relaxed text-center"
          style={{ color: textColor }}
        >
          {description}
        </p>

        {/* Button */}
        <button
          className="flex items-center justify-center gap-2 px-8 sm:px-12 py-3 sm:py-4 border rounded-md text-sm sm:text-base font-medium hover:opacity-80 active:scale-95 transition-all mx-auto"
          style={{ color: textColor, borderColor: textColor }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
