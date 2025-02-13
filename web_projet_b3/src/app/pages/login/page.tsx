/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios';
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'; 
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

const userExist = async (email: string) => {
    try {
        const response = await axios.post('/api/users/userexist', { email });
        return response.data.exists;
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
        return false;
    }
};


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

        return { success: true, message: 'Utilisateur connecté avec succès' };
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
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();

    if (session) {
        window.location.href = '/pages/account';
    }

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
        setLoading(true);
        const firstname = (document.getElementById("firstnamesignin") as HTMLInputElement)?.value;
        const warningname = document.getElementById("firstnamewarning");
        const lastname = (document.getElementById("lastnamesignin") as HTMLInputElement)?.value;
        const warninglastname = document.getElementById("lastnamewarning");
        const email = (document.getElementById("emailsignin") as HTMLInputElement)?.value;
        const warningmail = document.getElementById("emailwarning");
        const password = (document.getElementById("passwordsignin") as HTMLInputElement)?.value;
        const warningpd = document.getElementById("passwordwarning");
        const confirmPassword = (document.getElementById("passwordConfirmsignin") as HTMLInputElement)?.value;
        const warningpdconf = document.getElementById("passwordconfirmwarning");
        const maildupli = document.getElementById('emailwarningduplicate');

        if (!regex2char.test(firstname)) {
            warningname?.classList.remove("hidden");
            (document.getElementById("firstnamesignin") as HTMLInputElement).value = "";
            setLoading(false);
            return;
        } else {
            warningname?.classList.add("hidden");
        }

        if (!regex2char.test(lastname)) {
            warninglastname?.classList.remove("hidden");
            (document.getElementById("lastnamesignin") as HTMLInputElement).value = "";
            setLoading(false);
            return;
        } else {
            warninglastname?.classList.add("hidden");
        }

        if (!regexmail.test(email)) {
            warningmail?.classList.remove("hidden");
            (document.getElementById("emailsignin") as HTMLInputElement).value = "";
            setLoading(false);
            return;
        } else {
            warningmail?.classList.add("hidden")
        }

        if (!regexmdp.test(password)) {
            warningpd?.classList.remove("hidden");
            (document.getElementById("passwordsignin") as HTMLInputElement).value = "";
            setLoading(false);
            return;
        } else {
            warningpd?.classList.add("hidden")
        }

        if (password != confirmPassword) {
            warningpdconf?.classList.remove("hidden");
            (document.getElementById("passwordConfirmsignin") as HTMLInputElement).value = "";
            setLoading(false);
            return;
        } else {
            warningpdconf?.classList.add("hidden");
        }
        
        const userVerif = await userExist(email);

        if (userVerif) {
            console.log("L'utilisateur existe déjà");
            maildupli?.classList.remove('hidden');
            (document.getElementById("emailsignin") as HTMLInputElement).value = "";
            setLoading(false);
        } else {
            console.log("L'utilisateur n'existe pas");
            maildupli?.classList.add('hidden');
            const newUser = await createUser(firstname, lastname, email, password);
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
    
            if (result?.error) {
                console.error('Login failed after registration:', result.error);
                setLoading(false);
            } else {
                console.log('User signed in successfully');
            }
        }
    }, [])

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const email = (document.getElementById("emaillogin") as HTMLInputElement).value;
        const emailWarning = document.getElementById("emaillogwarning");
        const password = (document.getElementById("passwordlogin") as HTMLInputElement).value;
        const pdWarning = document.getElementById("pdlogwarning");
    
        if (emailWarning) emailWarning.classList.add("hidden");
        if (pdWarning) pdWarning.classList.add("hidden");
    
        try {
            const result = await connectUser(email, password);
    
            if (result.success) {
                console.log(result.message);
                window.location.href = '/pages/account'; 
            } else {
                setLoading(false);
                if (result.error === 'Utilisateur non trouvé') {
                    if (emailWarning) emailWarning.classList.remove("hidden");
                } else if (result.error === 'Mot de passe incorrect') {
                    if (pdWarning) pdWarning.classList.remove("hidden");
                } else {
                    console.error('Erreur inattendue:', result.error);
                }
            }
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof Error) {
                console.error('Erreur lors de la connexion:', error.message);
            } else {
                console.error('Erreur inconnue lors de la connexion');
            }
        }
    }, []);
    
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
                                    <span id='firstnamewarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Please enter at least two alphanumeric characters</span>
                                </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="lastnamesignin" type="text" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Lastname" />
                                <label htmlFor="lastnamesignin" className="input__label absolute transition-all" > Lastname </label>
                                <span id='lastnamewarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Please enter at least two alphanumeric characters</span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="emailsignin" type="email" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Email" />
                                <label htmlFor="emailsignin" className="input__label absolute transition-all" > Email </label>
                                <span id='emailwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Please enter a valid email</span>
                                <span id='emailwarningduplicate' className='text-red-error hidden w-full block text-center mt-[8px]'>This email is already registered</span>
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
                                <span id='passwordwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Your password must contain at least 8 characters including an uppercase letter, a lowercase letter, a number and a special character</span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input id="passwordConfirmsignin" type="password" className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Confirm Password" ref={inputConfirmPasswordRef} />
                                <label htmlFor="passwordConfirmsignin" className="input__label absolute transition-all" > Confirm Password </label> 
                                <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconConfirmPasswordRef} />
                                <span id='passwordconfirmwarning' className='text-red-error hidden w-full block text-center mt-[8px]'>Your 2 passwords must be identical</span>
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

            {loading && ( 
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> 
            )}
        </main>
    )
}
