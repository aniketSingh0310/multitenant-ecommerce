import React from "react";
import CategoryDropdown from "./catogory-dropdown";
import { CustomCategory } from "@/app/(app)/(home)/types";

interface Props {
  data: CustomCategory[];
}
const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
