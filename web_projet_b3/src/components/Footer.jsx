import Link from 'next/link'
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black border-t-2 border-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Law and order</h2>
                        <ul>
                            <li className="mb-2">
                                <Link href="/pages/legal" legacyBehavior>
                                    <a className="text-white hover:underline">Legal notices</a>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/pages/CGU" legacyBehavior>
                                    <a className="text-white hover:underline">General conditions of use</a>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/pages/CGV" legacyBehavior>
                                    <a className="text-white hover:underline">General conditions of sale</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Help</h2>
                        <ul>
                            <li className="mb-2">
                                <Link href="/pages/contact" legacyBehavior>
                                    <a className="text-white hover:underline">Contact us</a>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/pages/support" legacyBehavior>
                                    <a className="text-white hover:underline">Support</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Follow us</h2>
                        <ul>
                            <li className="mb-2">
                                <Link href="https://www.facebook.com" passHref legacyBehavior>
                                    <a className="text-white hover:underline">Facebook</a>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="https://www.instagram.com" passHref legacyBehavior>
                                    <a className="text-white hover:underline">Instagram</a>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="https://www.linkedin.com" passHref legacyBehavior>
                                    <a className="text-white hover:underline">LinkedIn</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center opacity-75 mt-8">
                    <p>© 2025 - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;