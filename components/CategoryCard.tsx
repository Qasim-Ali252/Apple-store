import Link from 'next/link';

const categoryMap: Record<string, string> = {
  "Smart Phones": "smartphones",
  "Stopwatch": "mens-watches",
  "Camera": "groceries",
  "Headphones": "sunglasses",
  "Computers": "laptops",
  "Gaming": "sports-accessories",
  "Laptops": "laptops",
  "Tools": "laptops"
};

interface CategoryCardProps {
  imageSrc: string;
  icon?: React.ReactNode;
  label: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, icon, label }) => {
  const formattedLabel = categoryMap[label] || label.toLowerCase();

  return (
    <Link href={`/products/${formattedLabel}`}>
      <div className="w-full sm:w-[10rem] h-[7rem] sm:h-[8rem]  sm:min-w-[8.4375rem] rounded-[15px] gap-2 bg-gray-light flex items-center justify-center flex-col hover:bg-gray-300 transition-colors cursor-pointer p-4">
        {icon ? (
          <div className="text-gray-800 text-3xl sm:text-4xl">
            {icon}
          </div>
        ) : (
          <img 
            src={imageSrc} 
            alt={label} 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
        )}
        <div className="font-medium text-sm sm:text-base leading-6 text-black text-center">
          {label}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
