import React, { useState } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { CategoriesGetManyOutput } from '@/modules/categories/type';


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    }
const CategoriesSidebar = ({
    open,
    onOpenChange,
    }: Props) => {
    const trpc= useTRPC();
    const {data}= useQuery(trpc.categories.getMany.queryOptions());
    const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[1] | null>(null);
    const router = useRouter();

    //if we have parent categories, we will show them in the sidebar, otherwise show root categories
    const currentCategories = parentCategories ?? data ?? [];
    const backgroudColor = selectedCategory?.color || 'white';

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CategoriesGetManyOutput);
            setSelectedCategory(category);
        } else {
            if (parentCategories && selectedCategory) {
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                if (category.slug === 'all') {
                    router.push('/');
                } else {
                    router.push(`/${category.slug}`);
                }
                handleOpenChange(false);
            }
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="left" className="p-0 transition-none" style={{ backgroundColor: backgroudColor }}>
                <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <div className="flex flex-col overflow-y-auto pb-2 h-full gap-2">
                        {parentCategories && (
                            <button
                                onClick={handleBackClick}
                                className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
                            >
                                <ChevronLeftIcon className='size-4 mr-2' />
                                Back
                            </button>
                        )}

                        {currentCategories.map((category) => (
                            <button key={category.slug}
                                onClick={() => handleCategoryClick(category)}
                                className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer'>
                                {category.name}
                                {category.subcategories && category.subcategories.length > 0 && (
                                    <ChevronRightIcon className='size-4' />
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default CategoriesSidebar;
