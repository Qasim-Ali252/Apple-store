import React from 'react';
import Link from 'next/link';


const categoryMap: Record<string, string> = {
  "Smart Phones": "smartphones",          
  "Stopwatch": "mens-watches",           
  "Camera": "groceries",                   
  "Headphones": "sunglasses",            
  "Computers": "laptops",                
  "Gaming": "sports-accessories",  
  "Laptops" : "laptops" ,             
  "Tools" : "laptops"              
};

interface CategoryCardProps {
  imageSrc: string;
  icon?: React.ReactNode;
  label: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc,icon, label }) => {
  // Use the mapping to get the API-compatible category
  const formattedLabel = categoryMap[label] || label.toLowerCase();

  return (
    <Link href={`/products/${formattedLabel}`}>
      <div className='w-[10rem] h-[8rem] min-w-[8.4375rem] rounded-[15px] gap-2 bg-gray-light self-center flex items-center justify-center flex-col'>
        {
          icon ? (
            <div className='text-gray-800'>
              {icon}
            </div>
          ) : (

          
        
        <img src={imageSrc} alt={label} />
        )}
        <div className='font-medium text-[16px] leading-6 text-black'>{label}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
