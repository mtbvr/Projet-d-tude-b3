/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useRef } from 'react';


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


export default function Page() {
    // Create separate refs for each input and icon pair
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const iconPasswordRef = useRef<HTMLImageElement>(null);
    const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);
    const iconConfirmPasswordRef = useRef<HTMLImageElement>(null);
  
    useEffect(() => {
        const inputPassword = inputPasswordRef.current;
        const iconPassword = iconPasswordRef.current;
        const inputConfirmPassword = inputConfirmPasswordRef.current;
        const iconConfirmPassword = iconConfirmPasswordRef.current;
    
        if (!inputPassword || !iconPassword || !inputConfirmPassword || !iconConfirmPassword) return;  // Early return if refs are null
    
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

        const handlePasswordClick = () => togglePasswordVisibility(inputPassword, iconPassword);
        const handleConfirmPasswordClick = () => togglePasswordVisibility(inputConfirmPassword, iconConfirmPassword);

        // Add event listeners to the respective icons
        iconPassword.addEventListener('click', handlePasswordClick);
        iconConfirmPassword.addEventListener('click', handleConfirmPasswordClick);

        // Cleanup event listeners on unmount
        return () => {
            iconPassword.removeEventListener('click', handlePasswordClick);
            iconConfirmPassword.removeEventListener('click', handleConfirmPasswordClick);
        };
    }, []);

    const handleSignin = async (e : React.FormEvent<HTMLFormElement>) => {
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
    }

    return (
        <main className="flex flex-row justify-between bg-custom-green">
            <section>
                Connexion
            </section>
            <section>
                <h2>Inscription</h2>
                <form action="" onSubmit={handleSignin}>
                    <div className="relative m-[30px]">
                        <input id="firstnamesignin" type="text" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Firstname" />
                        <label htmlFor="firstname" className="input__label absolute transition-all" > Firstname </label>
                    </div>
                    <span id='firstnamewarning' className='text-red-error hidden'>Votre prénom doit contenir au moins 2 charactères alphanumériques</span>
                    <div className="relative m-[30px]">
                        <input id="lastnamesignin" type="text" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Lastname" />
                        <label htmlFor="lastname" className="input__label absolute transition-all" > Lastname </label>
                    </div>
                    <span id='lastnamewarning' className='text-red-error hidden'>Votre nom doit contenir au moins 2 charactères alphanumériques</span>
                    <div className="relative m-[30px]">
                        <input id="emailsignin" type="email" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Email" />
                        <label htmlFor="email" className="input__label absolute transition-all" > Email </label>
                    </div>
                    <span id='emailwarning' className='text-red-error hidden'>Veuillez entrer un email valide</span>
                    <div className="relative m-[30px]">
                        <input id="passwordsignin" type="password" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Password" ref={inputPasswordRef} />
                        <label htmlFor="password" className="input__label absolute transition-all" > Password </label> 
                        <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconPasswordRef} />
                    </div>
                    <span id='passwordwarning' className='hidden text-red-error'>Votre mot de passe doit contenir au minimum 8 caractères dont une majuscule, une miniscule, un chiffre ainsi qu&apos;un caractère spécial</span>
                    <div className="relative m-[30px]">
                        <input id="passwordConfirmsignin" type="password" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Confirm Password" ref={inputConfirmPasswordRef} />
                        <label htmlFor="passwordConfirm" className="input__label absolute transition-all" > Confirm Password </label> 
                        <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconConfirmPasswordRef} />
                    </div>
                    <span id='passwordconfirmwarning' className='hidden text-red-error'>Vos 2 mots de passe doivent être identiques</span>
                    <button type="submit" className="w-64 mt-6 btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group mr-5 ml-2 p-2 font-semibold">
                        <span className="w-0 h-0 rounded bg-custom-blue absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                        <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                        Inscription
                        </span>
                    </button>
                </form>
            </section>
        </main>
    )
}
