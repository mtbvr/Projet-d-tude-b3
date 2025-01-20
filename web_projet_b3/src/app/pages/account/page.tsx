'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

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

interface Payment {
    id : number,
    id_user: number,
    name: string,
    number: string,
    date: Date,
    cvv: number,
    default: boolean;
}
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  addresses: Address[];
}

interface UserResponse {
  user: User;
  addresses: Address[];
  payments: Payment[];
}

export default function Page() {
    const { data: session } = useSession();
    const [userInfo, setUserInfo] = useState<UserResponse | null>(null);

    useEffect(() => {
        if (session) {
            const fetchUserInfo = async (id: string) => {
                try {
                    const response = await axios.post('/api/users/getuserbyid', { id });
                    setUserInfo(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Erreur lors de la recherche d'infos utilisateur:", error);
                }
            };

            fetchUserInfo(session.user.id);
        } else {
            window.location.href = '/pages/login';
        }
    }, [session]);

    if (!session) {
        return null;
    }

    return (
        <main>
            <section className="flex flex-col justify-center items-center my-[20px] gap-[20px]">
                {userInfo?.user ? (
                    <>
                        {!userInfo.user.isConfirmed ? (
                            <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-full text-center">
                                <p>Veuillez confirmer votre email</p>
                            </article>
                            
                        ) : null}

                        <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-full text-center shadow-header">
                            <h2 className="text-center font-semibold text-2xl">Info personnelles</h2>
                            <button>Modifier le profil</button>
                            <p>Nom: {userInfo.user.firstname}</p>
                            <p>Prénom: {userInfo.user.lastname}</p>
                            <p>Email: {userInfo.user.email}</p>
                            <p>Mot de passe: ************</p> <button>Modifier le mot de passe</button>
                        </article>
                        
                        <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-full text-center">
                            <h2 className="text-center font-semibold text-2xl">Adresse</h2>
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
                                <p>Vous n&apos;avez actuellement aucune adresse enregistrée.</p>
                            )}
                            <button className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]">
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Ajouter une nouvelle adresse
                                </span>
                            </button>
                        </article>
                        
                        <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-full text-center shadow-header">
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
                                <p>Vous n&apos;avez actuellement aucun moyen de paiement enregistré.</p>
                            )}
                            <button className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]">
                                <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                    Ajouter un moyen de paiement 
                                </span>
                            </button>
                        </article>
                    </>
                ) : (
                    <p>Chargement des infos</p>
                )}
            </section>
        </main>
    );
}
