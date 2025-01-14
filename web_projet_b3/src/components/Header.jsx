'use client'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const Header = () => {

    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="flex items-center justify-between shadow-header bg-custom-blue">
            <a href="/" className='mx-auto'>
                <Image alt='Logo de Cyna' src='/images/logo-cyna-header.png' width={194} height={51} className='my-[9px]'/>
            </a>
            <button
                className="block p-2 text-white focus:outline-none ml-auto"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5"
                />
                </svg>
            </button>

            {menuOpen && (
                <div className="absolute right-4 top-[70px] bg-white shadow-lg rounded-lg w-48 py-2 z-50">
                {session ? (
                    <><a
                            href="/pages/account"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Account
                        </a>
                        <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => signOut()}>Sign Out</button></>
                ) : (
                    <>
                    <a
                        href="/pages/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Log In
                    </a>
                    <a
                        href="/pages/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Sign In
                    </a>
                    </>
                )}
                </div>
            )}
        </header>        
    )
}

export default Header;
