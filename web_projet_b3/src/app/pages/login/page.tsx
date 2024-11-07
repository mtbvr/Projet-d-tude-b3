'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react';

export default function Page() {

    const inputRef = useRef<HTMLInputElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);
  
    useEffect(() => {
        const input = inputRef.current;
        const inputIcon = iconRef.current;
    
        if (!input || !inputIcon) return;  // Early return if refs are null
    
        const togglePasswordVisibility = (e: MouseEvent) => {
            e.preventDefault();
            inputIcon.setAttribute(
                'src',
                input.getAttribute('type') === 'password' ? '/assets/eye.svg' : '/assets/eye-off.svg' 
            );
            input.setAttribute(
                'type',
                input.getAttribute('type') === 'password' ? 'text' : 'password'
            );
        };
        inputIcon.addEventListener('click', togglePasswordVisibility);
        return () => {
            inputIcon.removeEventListener('click', togglePasswordVisibility);
        };
    },[]);
    return (
        <main className="flex flex-row justify-between bg-custom-green">
            <section>
                Connexion
            </section>
            <section>
                <h2>Inscription</h2>
                <form action="">
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="text" />
                    </div>
                    <div className="relative m-[30px]">
                        <input id="password" type="password" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Password" ref={inputRef} />
                        <label htmlFor="password" className="input__label absolute transition-all" > Password </label> 
                        <Image alt="Eye Icon" title="Eye Icon" src="../assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconRef} />
                    </div>
                </form>
            </section>
        </main>
    )
}