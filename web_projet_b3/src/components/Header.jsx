'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <header className="flex items-center justify-between shadow-header bg-component-bg z-99 w-full">
            <div className='flex flex-row w-full justify-between'>
                <Link href="/">
                    <Image alt='Logo de Cyna' src='/images/logo-cyna-header.png' width={194} height={51} className='my-[9px] ml-[40px]'/>
                </Link>
                <div className='flex flex-row'>
                    <button
                        className='block pr-4 hover:scale-125 transition-transform duration-200'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button
                        className="block pr-4 hover:scale-125 transition-transform duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                            <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button
                        className="block pr-4 hover:scale-125 transition-transform duration-200"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 right-0 w-2/3 max-w-xs h-full bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <button
                    className="absolute top-4 right-4 text-black hover:bg-red-error rounded-lg hover:border-[1px] hover:border-black"
                    onClick={handleMenuClose}
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="py-6 px-4">
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
                            {session.user?.isAdmin && (
                                <Link
                                    href="/pages/backoffice"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex justify-items-start gap-[10px]"
                                    onClick={handleMenuClose}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='none' stroke='currentColor' strokeWidth='1.5' width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M5.496 1.261l3.77 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.77-3.771c-.172.585-.254 1.189-.254 1.793 0 1.602.603 3.202 1.826 4.426 1.351 1.351 3.164 1.957 4.931 1.821.933-.072 1.852.269 2.514.931l7.621 7.611c.577.578 1.337.915 2.096.915 1.661 0 3.047-1.411 3.012-3.077-.016-.737-.352-1.47-.914-2.033l-7.621-7.612c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.834-4.427-1.834-.603 0-1.207.09-1.791.261zm15.459 18.692c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"/>
                                    </svg>
                                    Back Office
                                </Link>
                            )}
                            <div className='relative bg-custom-gray w-full h-[1px]'></div>
                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-red-700 flex justify-items-start gap-[10px] w-full" onClick={() => signOut()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                Sign out
                            </button>
                        </>
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
            </div>
        </header>
        );
    }
