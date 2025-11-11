"use client";
import React , { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FilterSectionProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
};

const FilterSection: React.FC<FilterSectionProps> = ({title, children}) => {
   const [open , setOpen] = useState(true);

  return (
    <div className='border-b pb-3  '>
       <button onClick={() => setOpen(!open)} className='flex justify-between items-center w-full '> {title}
       <ChevronDown className={open ? 'rotate-180' : ''} />
       </button>
       
       {open && <div className='mt-2'>{children}</div>}
    </div>
  )
}

export default FilterSection;
