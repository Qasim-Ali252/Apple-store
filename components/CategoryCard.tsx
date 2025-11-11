import React from 'react';
import Link from 'next/link';


const categoryMap: Record<string, string> = {
  "Smart Phones": "smartphones",          
  "Stopwatch": "mens-watches",           
  "Camera": "lighting",                   
  "Headphones": "sunglasses",            
  "Computers": "laptops",                
  "Gaming": "automotive"                  
};

interface CategoryCardProps {
  imageSrc: string;
  label: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, label }) => {
  // Use the mapping to get the API-compatible category
  const formattedLabel = categoryMap[label] || label.toLowerCase();

  return (
    <Link href={`/products/${formattedLabel}`}>
      <div className='w-[10rem] h-[8rem] min-w-[8.4375rem] rounded-[15px] gap-2 bg-gray-light self-center flex items-center justify-center flex-col'>
        <img src={imageSrc} alt={label} />
        <div className='font-medium text-[16px] leading-6 text-black'>{label}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
