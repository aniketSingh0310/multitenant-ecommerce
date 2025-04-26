import { Footer } from '@/components/global/footer';
import { Navbar } from '@/components/global/navbar';
import React from 'react'

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className='flex flex-col min-h-screen'>
         <Navbar/>
         <div className='flex-1 bg-[#F4F4FO]'>
            {children}
         </div>
         <Footer/>
        </div>
    )
}

export default Layout;