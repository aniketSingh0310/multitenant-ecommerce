import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
  activeCategory: string | null;
  activeCategoryName: string | null;
  activeSubCategoryName: string | null;
}

const BreadCrumbNavigation = ({
  activeCategory,
  activeCategoryName,
  activeSubCategoryName,
}: Props) => {
  if (!activeCategoryName || activeCategory === "all") return null;
  
  
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {activeSubCategoryName ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-sm font-medium underline text-primary"
                >
                  <Link href={`${activeCategory}`}>{activeCategoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-lg font-medium text-primary">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium underline text-primary">
                  {activeSubCategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <>
            <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium  text-primary">
                  {activeCategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbNavigation;
