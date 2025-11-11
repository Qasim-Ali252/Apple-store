import React from 'react';

interface CardListProps {
  imageSrc: string;
  title: string;
  price: string;
}

const CardList: React.FC<CardListProps> = ({ imageSrc, title, price }) => {
  return (
    <div className="w-[268px] h-[432px] min-w-[200px] flex flex-col justify-between items-center px-[16px] py-[24px] gap-[16px] rounded-[9px] bg-gray-lighter shadow-sm relative">
      
      {/* Heart icon (placeholder) */}
      <button className="absolute top-[16px] right-[16px]">
        <img src="/Like.png" alt="" />
      </button>

      {/* Product Image */}
      <img src={imageSrc} alt={title} className="w-auto h-[180px] object-contain mix-blend-multiply rounded-3xl" />

      {/* Product Title */}
      <h3 className="text-center text-[14px] text-[#2C2C2C] leading-tight">
        {title}
      </h3>
 
      {/* Product Price */}
      <p className="text-center text-[20px] font-semibold text-black">{price}</p>

      {/* Buy Button */}
      <button className="w-[183px] h-[48px] bg-black text-white rounded-[8px] text-[14px] font-medium">
        Buy Now
      </button>
    </div>
  );
};

export default CardList;
