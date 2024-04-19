'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { href : '/',label : 'Dashboard'},
        { href : '/issues', label : 'Issues'}
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/">
                <FaBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link,index) => (
                    <li key={index}>
                        <Link 
                            className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500' } 
                            hover:text-zinc-800 transition-colors`}
                            href={link.href}>
                                {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}

export default NavBar