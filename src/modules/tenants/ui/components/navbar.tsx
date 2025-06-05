"use client"
import { Button } from '@/components/ui/button';
import { generateTenantUrl } from '@/lib/utils';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const CheckoutButton = dynamic(
  () => import("@/modules/checkout/ui/components/checkout-button"),
  { ssr: false ,
  loading: () => <Button disabled className="flex-1 bg-white text-black  "><ShoppingCart/> Checkout</Button> 
  }
);
interface Props {
  slug: string;
}
const Navbar = ({slug}:Props) => {

  const trpc = useTRPC();
  const {data}= useSuspenseQuery(trpc.tenants.getOne.queryOptions({slug}))
  return (
    <nav className='h-20 border-b font-medium bg-white'>
        <div className='max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-12'>
          <Link href={generateTenantUrl(slug)} className='flex items-center gap-2'>
        {data.image?.url &&(
          <Image
            src={data.image.url}
            alt={data.name}
            width={40}
            height={40}
            className='rounded-full border size-[40px] shrink-0'
          />
        )}
        <p className='text-xl'>{data.name}</p>
          </Link>
          <CheckoutButton tenantSlug={slug}/>
        </div>
    </nav>
  )
}

export default Navbar


export const NavbarSkeleton = () => {
  return (
    <nav className='h-20 border-b font-medium bg-white'>
      <div className='max-w-(--breakpoint-xl) mx-auto h-full flex items-center justify-between px-4 lg:px-12'>
       <div/>
       <Button disabled className="flex-1 bg-white text-black  "><ShoppingCart/> Checkout</Button>
      </div>
    </nav>
  )
}