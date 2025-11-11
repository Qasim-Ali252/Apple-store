import React from "react";

interface ProductsListProps {
  imageSrc: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ imageSrc, title, description,bgColor='white', textColor='black' }) => {
  return (
  <div
      className="w-[22.5rem] h-[40rem] min-w-[17.5rem] gap-[24px] flex flex-col items-center"
      style={{ backgroundColor: bgColor }} // This is the line you need to add
    >

      {/* Image */}
      <img className="w-[22.5rem] mt-5 h-[20.44rem]" src={imageSrc} alt={title} />

      <div className="w-[18.5rem] h-[13rem] gap-[16px] mt-6">
        {/* Title */}
        <div className="text-[33px] font-light leading-10"
        style={{ color: textColor }}
        >{title}</div>

        {/* Description */}
        <div className="mt-4 mb-4 font-medium text-[14px] leading-6"
          style={{ color: textColor }}
        >
          {description}
        </div>

        {/* Button */}
        <button className="flex items-center mt-4 justify-center gap-2 px-14 py-4 border rounded-md  text-base font-medium"
        style={{ color: textColor, borderColor: textColor }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
