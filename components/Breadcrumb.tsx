"use client";

import { useParams,useRouter } from "next/navigation";  

const Breadcrumb = () => {
    const router = useRouter();
    const params = useParams();
    const category = params.category;
    const handlehomeclick = () => {
        router.push("/");
    }
    const handlecatalogclick = () => {
        router.push("/products");
    }
  return (
    <div className='w-[90rem] h-[6.5rem]  gap-[16px] flex  pt-10 pr-40 pb-10 pl-40'>
        <span
        onClick={handlehomeclick}
        className="text-[16px] leading-4 font-medium tracking-normal text-[#A4A4A4] cursor-pointer hover:text-black"
        >Home {">"}</span>

        <span
        onClick={handlecatalogclick}
        className="text-[16px] leading-4 font-medium tracking-normal text-[#A4A4A4] cursor-pointer hover:text-black"
        >Catalog {">"}</span>

        <span
        className="text-[16px] leading-4 font-medium tracking-normal text-black"
        >{category} </span>
    </div>
  )
}

export default Breadcrumb
