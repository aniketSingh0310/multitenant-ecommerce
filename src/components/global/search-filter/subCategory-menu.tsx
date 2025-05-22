
import { CategoriesGetManyOutput } from "@/modules/categories/type";
import Link from "next/link";

interface Props {
    category: CategoriesGetManyOutput[1];
    isOpen: boolean;
    position?: { top: number; left: number };
}

const SubcategoryDropdown = ({ category, isOpen, position }: Props) => {
    const backgroundColor = category.color || "bg-white";
    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null;
    }

    return (
        <div
            className="fixed z-100"
            style={{
                top: position?.top,
                left: position?.left,
            }}>
            <div className="h-3 w-6`0"></div>
            <div
                style={{ backgroundColor }}
                className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_4px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]">

                <div>
                    {category.subcategories?.map((subcategory) => (
                        <Link
                            key={subcategory.slug}
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium">
                        {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubcategoryDropdown;