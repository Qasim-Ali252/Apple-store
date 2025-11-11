import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryList: React.FC = () => {
  const categories = [
    { imageSrc: '/Phones.png', label: 'Smart Phones' },
    { imageSrc: '/Smart Watches.png', label: 'Stopwatch' },
    { imageSrc: '/Cameras.png', label: 'Camera' },
    { imageSrc: '/Headphones.png', label: 'Headphones' },
    { imageSrc: '/Computers.png', label: 'Computers' },
    { imageSrc: '/Gaming.png', label: 'Gaming' },
  ];

  return (
    <div className='w-[90rem] h-[22rem] gap-[32px] bg-white flex flex-col justify-center items-center'>
      {/* Heading */}
      <div className='flex justify-between w-[70rem] mb-6'>
        <div className='font-medium text-[24px] leading-8 tracking-[1%] text-black'>
          Browse By Category
        </div>
        <div className='w-[80px] h-[32px] gap-[16px] flex'>
          <img className='w-[32px] h-[32px]' src='/leftArrow.png' alt='left' />
          <img className='w-[32px] h-[32px]' src='/Arrow.svg' alt='right' />
        </div>
      </div>

      {/* Category Cards */}
      <div className='w-[70rem] h-[8rem] gap-8 flex'>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            imageSrc={category.imageSrc}
            label={category.label}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
