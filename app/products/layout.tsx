// app/products/[category]/layout.tsx
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/filters/FilterSideBar";
import CategoryTopBar from "@/components/CategoryTopBar";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
        {/* <div className="">
             <Breadcrumb /> 
             
             <div className="flex">
            <FilterSidebar />
            <CategoryTopBar />
             {children}

             </div>
           
            
        </div> */}

        <Breadcrumb/>

        <div className="flex gap-8 mt-4  w-[1440px] h-[1560px]">
            <div className="flex ml-40 gap-8 w-[1119px] h-[1480px]">

            
          <div >
            <FilterSidebar />
          </div>

          <div >
            <CategoryTopBar />
             <div>{children}</div>
          </div>
          </div>
        </div>
     
    </div>
  );
}
