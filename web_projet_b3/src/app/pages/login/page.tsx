/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios';
import Image from 'next/image'
import { signIn } from 'next-auth/react'; 
import React, { useEffect, useRef, useState, useCallback } from 'react';

const regex2char = /^[a-zA-Z0-9]{2,}$/;
const regexmail = /^(?!\.)("?(?=\S)(?:(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:\\[\x00-\x7F]|[^\x22\x5C])*\")*)@(?=\S)(?=\S)(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9-]{2,}\.?|\[(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\]))$/;
const regexmdp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const createUser = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
        const response = await axios.post('/api/users/adduser', { firstname, lastname, email, password });
        console.log('Utilisateur créé avec succès:', response.data);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
}

const connectUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('/api/users/loguser', { email, password });
        console.log('Utilisateur connecté avec succès:', response.data);
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            console.error('NextAuth error:', result.error);
            return { success: false, error: result.error };
        }

        return { success: true };
    } catch (error: unknown) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        if (axios.isAxiosError(error)) {
            return { success: false, error: error.response?.data.error || 'Erreur inconnue' };
        } else {
            return { success: false, error: 'Erreur inconnue' };
        }
    }
}

export default function Page() {
    const [isSignin, setIsSignin] = useState(true);

    useEffect(() => { 
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search); 
            const action = queryParams.get('action'); 
            if (action === 'login') { 
                setIsSignin(false); 
            } else { 
                setIsSignin(true); 
            };
        }
    }, []);

    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const iconPasswordRef = useRef<HTMLImageElement>(null);
    const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);
    const iconConfirmPasswordRef = useRef<HTMLImageElement>(null);
    const inputPasswordLoginRef = useRef<HTMLInputElement>(null);
    const iconPasswordLoginRef = useRef<HTMLImageElement>(null);

    const handleSignin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const firstname = (document.getElementById("firstnamesignin") as HTMLInputElement).value;
        const warningname = document.getElementById("firstnamewarning");
        const lastname = (document.getElementById("lastnamesignin") as HTMLInputElement)?.value;
        const warninglastname = document.getElementById("lastnamewarning");
        const email = (document.getElementById("emailsignin") as HTMLInputElement)?.value;
        const warningmail = document.getElementById("emailwarning");
        const password = (document.getElementById("passwordsignin") as HTMLInputElement)?.value;
        const warningpd = document.getElementById("passwordwarning");
        const confirmPassword = (document.getElementById("passwordConfirmsignin") as HTMLInputElement)?.value;
        const warningpdconf = document.getElementById("passwordconfirmwarning");

        if (!regex2char.test(firstname)) {
            warningname?.classList.remove("hidden");
            (document.getElementById("firstnamesignin") as HTMLInputElement).value = "";
            return;
        } else {
            warningname?.classList.add("hidden");
        }

        if (!regex2char.test(lastname)) {
            warninglastname?.classList.remove("hidden");
            (document.getElementById("lastnamesignin") as HTMLInputElement).value = "";
            return;
        } else {
            warninglastname?.classList.add("hidden");
        }

        if (!regexmail.test(email)) {
            warningmail?.classList.remove("hidden");
            (document.getElementById("emailsignin") as HTMLInputElement).value = "";
            return;
        } else {
            warningmail?.classList.add("hidden")
        }

        if (!regexmdp.test(password)) {
            warningpd?.classList.remove("hidden");
            (document.getElementById("passwordsignin") as HTMLInputElement).value = "";
            return;
        } else {
            warningpd?.classList.add("hidden")
        }

        if (password != confirmPassword) {
            warningpdconf?.classList.remove("hidden");
            (document.getElementById("passwordConfirmsignin") as HTMLInputElement).value = "";
            return;
        } else {
            warningpdconf?.classList.add("hidden");
        }


        const newUser = await createUser(firstname, lastname, email, password);
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            console.error('Login failed after registration:', result.error);
        } else {
            console.log('User signed in successfully');
        }
    }, [])

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (document.getElementById("emaillogin") as HTMLInputElement).value;
        const emailWarning = document.getElementById("emaillogwarning");
        const password = (document.getElementById("passwordlogin") as HTMLInputElement).value;
        const pdWarning = document.getElementById("pdlogwarning");

        if (emailWarning) emailWarning.classList.add("hidden");
        if (pdWarning) pdWarning.classList.add("hidden");

        const result = await connectUser(email, password);
        if (!result.success) {
            if (result.error === 'Utilisateur non trouvé') {
                if (emailWarning) emailWarning.classList.remove("hidden");
            } else if (result.error === 'Mot de passe incorrect') {
                if (pdWarning) pdWarning.classList.remove("hidden");
            } else {
                console.error('Erreur inattendue:', result.error);
            }
        } 
    }, [])

    useEffect(() => {
        const inputPassword = inputPasswordRef.current;
        const iconPassword = iconPasswordRef.current;
        const inputConfirmPassword = inputConfirmPasswordRef.current;
        const iconConfirmPassword = iconConfirmPasswordRef.current;
        const inputPasswordLogin = inputPasswordLoginRef.current;
        const iconPasswordLogin = iconPasswordLoginRef.current;
    
        const togglePasswordVisibility = (input: HTMLInputElement, icon: HTMLImageElement) => {
          icon.setAttribute(
            'src',
            input.getAttribute('type') === 'password' ? '/assets/eye.svg' : '/assets/eye-off.svg'
          );
          input.setAttribute(
            'type',
            input.getAttribute('type') === 'password' ? 'text' : 'password'
          );
        };
    
        const handlePasswordClick = () => inputPassword && iconPassword && togglePasswordVisibility(inputPassword, iconPassword);
        const handleConfirmPasswordClick = () => inputConfirmPassword && iconConfirmPassword && togglePasswordVisibility(inputConfirmPassword, iconConfirmPassword);
        const handlePasswordLoginClick = () => inputPasswordLogin && iconPasswordLogin && togglePasswordVisibility(inputPasswordLogin, iconPasswordLogin);
    
        if (iconPassword) iconPassword.addEventListener('click', handlePasswordClick);
        if (iconConfirmPassword) iconConfirmPassword.addEventListener('click', handleConfirmPasswordClick);
        if (iconPasswordLogin) iconPasswordLogin.addEventListener('click', handlePasswordLoginClick);
    
        return () => {
          if (iconPassword) iconPassword.removeEventListener('click', handlePasswordClick);
          if (iconConfirmPassword) iconConfirmPassword.removeEventListener('click', handleConfirmPasswordClick);
          if (iconPasswordLogin) iconPasswordLogin.removeEventListener('click', handlePasswordLoginClick);
        };
      }, [isSignin, handleLogin, handleSignin]);

    return (
        <main className="flex flex-row justify-center">
            <section className='w-full'>
                {isSignin ? (
                    <article className='mx-auto border-[1px] border-custom-gray rounded-lg my-[20px] bg-white w-[85%] md:w-[500px]'>
                        <Image 
                            src="/images/cyna_min_logo.jpg"
                            width={65}
                            height={65}
                            title='Cyna logo'
                            alt='Cyna logo'
                            className='mx-auto mt-[12px]'
                        />
                        <h2 className='text-center font-semibold text-2xl'>Sign Up!</h2>
                        <form action="" onSubmit={handleSignin}>
                                <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                    <input id="firstnamesignin" type="text" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Firstname" />
                                    <label htmlFor="firstnamesignin" className="input__label absolute transition-all" > Firstname </label>
                                    <span id='firstnamewarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Votre prénom doit contenir au moins 2 charactères alphanumériques.</span>
                                </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="lastnamesignin" type="text" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Lastname" />
                                <label htmlFor="lastnamesignin" className="input__label absolute transition-all" > Lastname </label>
                                <span id='lastnamewarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Votre nom doit contenir au moins 2 charactères alphanumériques</span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="emailsignin" type="email" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Email" />
                                <label htmlFor="emailsignin" className="input__label absolute transition-all" > Email </label>
                                <span id='emailwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Veuillez entrer un email valide</span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="passwordsignin" type="password" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Password" ref={inputPasswordRef} />
                                <label htmlFor="passwordsignin" className="input__label absolute transition-all" > Password </label> 
                                <Image 
                                    alt="Eye Icon" 
                                    title="Eye Icon" 
                                    src="/assets/eye-off.svg" 
                                    className="input__icon" 
                                    width={25} 
                                    height={25} 
                                    ref={iconPasswordRef} 
                                />
                                <span id='passwordwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Votre mot de passe doit contenir au minimum 8 caractères dont une majuscule, une miniscule, un chiffre ainsi qu&apos;un caractère spécial</span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="passwordConfirmsignin" type="password" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Confirm Password" ref={inputConfirmPasswordRef} />
                                <label htmlFor="passwordConfirmsignin" className="input__label absolute transition-all" > Confirm Password </label> 
                                <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconConfirmPasswordRef} />
                                <span id='passwordconfirmwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Vos 2 mots de passe doivent être identiques</span>
                            </div>
                            <button type="submit" className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]">
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Sign-Up
                                </span>
                            </button>
                        </form>
                        <p className="mb-[12px] relative text-center pt-[20px] pb-[10px]">Already have an account?&nbsp; 
                            <a onClick={() => setIsSignin(false)} className='font-semibold cursor-pointer' onKeyDown={(e) => { if (e.key === 'Enter') setIsSignin(false); }} tabIndex={0} role="button">
                                 Log in
                            </a>
                        </p>
                    </article>
                ) : (
                    <article className='mx-auto border-[1px] border-custom-gray rounded-lg my-[20px] bg-white w-[85%] md:w-[500px]'>
                        <Image 
                            src="/images/cyna_min_logo.jpg"
                            width={65}
                            height={65}
                            title='Cyna logo'
                            alt='Cyna logo'
                            className='mx-auto mt-[12px]'
                        />
                        <h2 className='text-center font-semibold text-2xl'>Welcome back!</h2>
                        <form action="" onSubmit={handleLogin}>
                            <div className="relative m-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="emaillogin" type="email" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Email" />
                                <label htmlFor="emaillogin" className="input__label absolute transition-all" > Email </label>
                                <span id='emaillogwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Email non enregistré</span>
                            </div>
                            <div className="relative m-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="passwordlogin" type="password" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Password" ref={inputPasswordLoginRef} />
                                <label htmlFor="passwordlogin" className="input__label absolute transition-all" > Password </label> 
                                <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconPasswordLoginRef} />
                                <span id='pdlogwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Erreur de mot de passe</span>
                            </div>
                            <button type="submit" className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]">
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Sign-In
                                </span>
                            </button>
                        </form>
                        <p className="relative text-center pt-[20px] pb-[10px]">No account?&nbsp;
                            <span onClick={() => setIsSignin(true)} className='font-semibold cursor-pointer' onKeyDown={(e) => { if (e.key === 'Enter') setIsSignin(true); }} tabIndex={0} role="button">
                                Sign up
                            </span>
                        </p>
                    </article>
                )}
            </section>
        </main>
    )
}
