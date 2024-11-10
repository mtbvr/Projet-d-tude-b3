/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios';
import Image from 'next/image'
import { emitWarning } from 'process';
import React, { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react'; 


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

async function sendEmail() {
  try {
    const response = await axios.post('/api/mail/send', {firstname:"matéo",email:"mateobouvier10@gmail.com",verificationToken:"test"});
    console.log(response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


export default function Page() {
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const iconPasswordRef = useRef<HTMLImageElement>(null);
    const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);
    const iconConfirmPasswordRef = useRef<HTMLImageElement>(null);
    const inputPasswordLoginRef = useRef<HTMLInputElement>(null);
    const iconPasswordLoginRef = useRef<HTMLImageElement>(null);
  
    useEffect(() => {
        const inputPassword = inputPasswordRef.current;
        const iconPassword = iconPasswordRef.current;
        const inputConfirmPassword = inputConfirmPasswordRef.current;
        const iconConfirmPassword = iconConfirmPasswordRef.current;
        const inputPasswordLogin = inputPasswordLoginRef.current;
        const iconPasswordLogin = iconPasswordLoginRef.current;
    
        if (!inputPassword || !iconPassword || !inputConfirmPassword || !iconConfirmPassword || !inputPasswordLogin || !iconPasswordLogin) return; 
    
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
        const handlePasswordLoginClick = () => togglePasswordVisibility(inputPasswordLogin, iconPasswordLogin);

        iconPassword.addEventListener('click', handlePasswordClick);
        iconConfirmPassword.addEventListener('click', handleConfirmPasswordClick);
        iconPasswordLogin.addEventListener('click', handlePasswordLoginClick);

        return () => {
            iconPassword.removeEventListener('click', handlePasswordClick);
            iconConfirmPassword.removeEventListener('click', handleConfirmPasswordClick);
            iconPasswordLogin.removeEventListener('click', handlePasswordLoginClick)
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
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
        } else {
        }
    }
    

    return (
        <main className="flex flex-row justify-between bg-custom-green">
            <section>
                Connexion
                <form action="" onSubmit={handleLogin}>
                    <div className="relative m-[30px]" >
                        <input id="emaillogin" type="email" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Your Email" />
                        <label htmlFor="emaillogin" className="input__label absolute transition-all" > Email </label>
                    </div>
                    <span id='emaillogwarning' className='text-red-error hidden'>Email non enregistré</span>
                    <div className="relative m-[30px]">
                        <input id="passwordlogin" type="password" className="input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input" placeholder="Confirm Password" ref={inputPasswordLoginRef} />
                        <label htmlFor="passwordlogin" className="input__label absolute transition-all" > Password </label> 
                        <Image alt="Eye Icon" title="Eye Icon" src="/assets/eye-off.svg" className="input__icon" width={25} height={25} ref={iconPasswordLoginRef} />
                    </div>
                    <span id='pdlogwarning' className='text-red-error hidden'>Erreur de mot de passe</span>
                    <button type="submit" className="w-64 mt-6 btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group mr-5 ml-2 p-2 font-semibold">
                        <span className="w-0 h-0 rounded bg-custom-blue absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
                        <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                        Connexion
                        </span>
                    </button>
                </form>
            </section>
            <button onClick={sendEmail}>Test mail</button>
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
