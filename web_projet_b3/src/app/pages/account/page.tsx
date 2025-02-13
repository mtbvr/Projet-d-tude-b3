'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

const regex2char = /^[a-zA-Z0-9]{2,}$/;
const regexmail = /^(?!\.)("?(?=\S)(?:(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:\\[\x00-\x7F]|[^\x22\x5C])*\")*)@(?=\S)(?=\S)(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9-]{2,}\.?|\[(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\]))$/;


interface Address {
  id: number;
  ville: string;
  region: string;
  code_postal: string;
  pays: string;
  adresse: string;
  complement_adresse: string | null;
  id_user: number;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  addresses: Address[];
  payments: Payment[];
}

interface Payment {
  id: number;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface UserResponse {
  user: User;
  addresses: Address[];
  payments: Payment[];
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

const editUser = async (id_user:number, firstname: string, lastname:string, email:string) => {
    try {
        const reponse = await axios.post('/api/users/edituser', {id_user, firstname, lastname, email });
        return reponse;
    } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
        return false;
    }
}

const addAddress = async (id_user:number, address:string, region:string, country:string, city:string, zip:number, address2:string) => {
    try {
        const reponse = await axios.post('/api/users/addaddress', {id_user, address, region, country, city, zip, address2});
        return reponse;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la nouvelle adresse:', error);
        return false;
    }
}

export default function Page() {
    const { data: session } = useSession();
    const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showAddAddressModal, setShowAddAddressModal] = useState(false);
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async (id: string) => {
        try {
            const response = await axios.post('/api/users/getuserbyid', { id });
            setUserInfo(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur lors de la recherche d'infos utilisateur:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session) {
            fetchUserInfo(session.user.id);
        } else {
            window.location.href = '/pages/login';
        }
    }, [session]);

    if (!session) {
        return null;
    }

    const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const firstname = (document.getElementById("firstname") as HTMLInputElement)?.value;
        const warningname = document.getElementById("firstnamewarning");
        const lastname = (document.getElementById("lastname") as HTMLInputElement)?.value;
        const warninglastname = document.getElementById("lastnamewarning");
        const email = (document.getElementById("email") as HTMLInputElement)?.value;
        const warningmail = document.getElementById("emailwarning");
        const maildupli = document.getElementById('emailwarningduplicate');
    
        if (!regex2char.test(firstname)) {
            warningname?.classList.remove("hidden");
            (document.getElementById("firstname") as HTMLInputElement).value = "";
            return;
        } else {
            warningname?.classList.add("hidden");
        }
    
        if (!regex2char.test(lastname)) {
            warninglastname?.classList.remove("hidden");
            (document.getElementById("lastname") as HTMLInputElement).value = "";
            return;
        } else {
            warninglastname?.classList.add("hidden");
        }
    
        if (!regexmail.test(email)) {
            warningmail?.classList.remove("hidden");
            (document.getElementById("email") as HTMLInputElement).value = "";
            return;
        } else {
            warningmail?.classList.add("hidden");
        }
    
        const userVerif = await userExist(email);
    
        if (userVerif && email !== session.user.email) {
            console.log("L'utilisateur existe déjà");
            maildupli?.classList.remove('hidden');
            (document.getElementById("email") as HTMLInputElement).value = "";
        } else {
            console.log("L'utilisateur n'existe pas");
            maildupli?.classList.add('hidden');
            const id_user = session.user.id as unknown as number;
            const newUser = await editUser(id_user, firstname, lastname, email);
    
            if (newUser && newUser.data && newUser.data.success) {
                console.log(newUser);
                await fetchUserInfo(session.user.id);
                setShowEditProfileModal(false);
            } else {
                setLoading(false);
            }
        }
    }

    const handleNewAdress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const address = (document.getElementById('address') as HTMLInputElement)?.value;
        const region = (document.getElementById('region') as HTMLInputElement)?.value;
        const city = (document.getElementById('city') as HTMLInputElement)?.value;
        const country = (document.getElementById('country') as HTMLInputElement)?.value;
        const zip = (document.getElementById('zip') as HTMLInputElement)?.value;    
        const address2 = (document.getElementById('address2') as HTMLInputElement)?.value;

        const id_user = session.user.id as unknown as number;
        const newAddress = await addAddress(id_user, address, region, country, city, zip as unknown as number, address2);

        if (newAddress) {
            console.log(newAddress);
            await fetchUserInfo(session.user.id);
            setShowAddAddressModal(false);
        } else {
            setLoading(false)
        }
    }

    
    return (
        <main>
            <section className="flex flex-col justify-center items-center my-[20px] gap-[20px]">
                {userInfo?.user ? (
                    <>
                        {!userInfo.user.isConfirmed ? (
                            <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-full text-center">
                                <p>Please confirm your email</p>
                            </article>
                            
                        ) : null}

                        <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-[80%] text-center shadow-header flex flex-col justify-center">
                            <h2 className="text-center font-semibold text-2xl">Personnal information</h2>
                            <p>Lastname: {userInfo.user.firstname}</p>
                            <p>Firstname: {userInfo.user.lastname}</p>
                            <p>Email: {userInfo.user.email}</p>
                            <p>Password: ************</p> 
                            <button onClick={() => setShowEditProfileModal(true)}>Change password</button>
                            <button className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]" onClick={() => setShowEditProfileModal(true)}>
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Edit profile
                                </span>
                            </button>
                        </article>
                        
                        <article className="bg-white shadow-header rounded-lg p-6 w-[80%] max-w-md text-center flex flex-col justify-center">
                            <h2 className="text-center font-semibold text-2xl">Adresses</h2>
                            {userInfo.addresses && userInfo.addresses.length > 0 ? (
                                <ul>
                                    {userInfo.addresses.map(address => (
                                        <li key={address.id}>
                                            {address.adresse}, {address.ville}, {address.region}, {address.code_postal}, {address.pays}
                                            {address.complement_adresse && <p>Complément : {address.complement_adresse}</p>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You currently have no registered addresses.</p>
                            )}
                            <button className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]" onClick={() => setShowAddAddressModal(true)}>
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Add new address
                                </span>
                            </button>
                        </article>
                        
                        <article className="bg-white shadow-header rounded-lg p-6 w-[80%] max-w-md text-center shadow-header flex flex-col justify-center">
                            <h2 className="text-center font-semibold text-2xl">Moyens de paiement</h2>
                            {userInfo.payments && userInfo.payments.length > 0 ? (
                                <ul>
                                    {userInfo.payments.map(payment => (
                                        <li key={payment.id}>
                                            <p>{payment.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You currently have no registered payments methods.</p>
                            )}
                            <button className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]" onClick={() => setShowAddPaymentModal(true)}>
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Add new payment method
                                </span>
                            </button>
                        </article>
                    </>
                ) : (
                    <p></p>
                )}
            </section>

            {/* Edit Profile Modal */}
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-[80%]">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleEditUser}>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="firstname"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Firstname"
                                    defaultValue={userInfo?.user.firstname}
                                />
                                <label htmlFor="firstname" className="input__label absolute transition-all"> Firstname </label>
                                <span id="firstnamewarning" className="text-red-error hidden w-full block text-center mt-[8px]">
                                    Please enter at least two alphanumeric characters
                                </span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="lastname"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Lastname"
                                    defaultValue={userInfo?.user.lastname}
                                />
                                <label htmlFor="lastname" className="input__label absolute transition-all"> Lastname </label>
                                <span id="lastnamewarning" className="text-red-error hidden w-full block text-center mt-[8px]">
                                    Please enter at least two alphanumeric characters
                                </span>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Email"
                                    defaultValue={userInfo?.user.email}
                                />
                                <label htmlFor="email" className="input__label absolute transition-all"> Email </label>
                                <span id="emailwarning" className="text-red-error hidden w-full block text-center mt-[8px]">
                                    Please enter a valid email
                                </span>
                                <span id='emailwarningduplicate' className='text-red-error hidden w-full block text-center mt-[8px]'>This email is already registered</span>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setShowEditProfileModal(false)}>Cancel</button>
                                <button type="submit" className="bg-button-color hover:text-white text-black font-semibold py-2 px-4 rounded ml-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Add Address Modal */}
            {showAddAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-[80%]">
                        <h2 className="text-2xl font-semibold mb-4">Add Address</h2>
                        <form onSubmit={handleNewAdress}>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="address"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Address"
                                />
                                <label htmlFor="address" className="input__label absolute transition-all"> Address </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="city"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your City"
                                />
                                <label htmlFor="city" className="input__label absolute transition-all"> City </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="region"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Region"
                                />
                                <label htmlFor="region" className="input__label absolute transition-all"> Region </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="zip"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Postal Code"
                                />
                                <label htmlFor="zip" className="input__label absolute transition-all"> ZIP </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="country"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Country"
                                />
                                <label htmlFor="country" className="input__label absolute transition-all"> Country </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="address2"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Address Complement"
                                />
                                <label htmlFor="address2" className="input__label absolute transition-all"> Additionnal adress </label>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setShowAddAddressModal(false)}>Cancel</button>
                                <button type="submit" className="bg-button-color hover:text-white text-black font-semibold py-2 px-4 rounded ml-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Add Payment Modal */}
            {showAddPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-[80%]">
                        <h2 className="text-2xl font-semibold mb-4">Add Payment Method</h2>
                        <form>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="cardnumber"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Your Card Number"
                                />
                                <label htmlFor="cardnumber" className="input__label absolute transition-all"> Card Number </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="cardholdername"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Cardholder Name"
                                />
                                <label htmlFor="cardholdername" className="input__label absolute transition-all"> Cardholder Name </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="expirydate"
                                    type="month"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="Expiry Date"
                                />
                                <label htmlFor="expirydate" className="input__label absolute transition-all"> Expiry Date </label>
                            </div>
                            <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                <input
                                    id="cvv"
                                    type="text"
                                    className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                    placeholder="CVV"
                                />
                                <label htmlFor="cvv" className="input__label absolute transition-all"> CVV </label>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setShowAddPaymentModal(false)}>Cancel</button>
                                <button type="submit" className="bg-button-color hover:text-white text-black font-semibold py-2 px-4 rounded ml-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


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
