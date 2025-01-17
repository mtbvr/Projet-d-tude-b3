'use client'
import Image from 'next/image'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const Header = () => {

    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <header className="flex items-center justify-between shadow-header bg-custom-blue z-99">
            <Link href="/" className='mx-auto'>
                <Image alt='Logo de Cyna' src='/images/logo-cyna-header.png' width={194} height={51} className='my-[9px]'/>
            </Link>
            <button
                className="block pr-4 hover:scale-125 transition-transform duration-200"
                onClick={() => {
                    toggleMenu();
                  }}
                aria-label="Toggle menu"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>

            {menuOpen && (
                <div className="absolute right-4 top-[75px] bg-white shadow-lg rounded-lg w-max min-w-[240px] py-2 z-50 border-[1px] border-custom-gray">
                {session ? (
                    <>
                        <p className='px-4'>{session.user?.firstname} {session.user?.lastname}</p>
                        <p className='px-4 text-custom-gray'>{session.user?.email}</p>
                        <div className='relative bg-custom-gray w-full h-[1px] mt-[8px]'></div>
                        <Link
                            href="/pages/account"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex justify-items-start gap-[10px]"
                            onClick={handleMenuClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                            My profile
                        </Link>
                        <Link
                            href="/pages/setting"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex justify-items-start gap-[10px]"
                            onClick={handleMenuClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            Setting
                        </Link>
                        <div className='relative bg-custom-gray w-full h-[1px]'></div>
                        <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-red-700 flex justify-items-start gap-[10px] w-full" onClick={() => signOut()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            Sign out
                        </button></>
                ) : (
                    <>
                    <Link
                        onClick={handleMenuClose}
                        href="/pages/login?action=login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Log In
                    </Link>
                    <Link
                        onClick={handleMenuClose}
                        href="/pages/login?action=signup"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Sign In
                    </Link>
                    </>
                )}
                </div>
            )}
        </header>        
    )
}

export default Header;
