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
            <section>
                {userInfo?.user ? (
                    <>
                        {!userInfo.user.isConfirmed ? (
                            <p>Veuillez confirmer votre email</p>
                        ) : null}

                        <article>
                            <h2>Info personnelles</h2>
                            <button>Modifier le profil</button>
                            <p>Nom: {userInfo.user.firstname}</p>
                            <p>Prénom: {userInfo.user.lastname}</p>
                            <p>Email: {userInfo.user.email}</p>
                            <p>Mot de passe: ************</p> <button>Modifier le mot de passe</button>
                        </article>
                        
                        <article>
                            <h2>Adresses :</h2>
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
                            <button>Ajouter une nouvelle adresse</button>
                        </article>
                        
                        <article>
                            <h2>Moyens de paiement</h2>
                            <button>Ajouter un moyen de paiement</button>
                        </article>
                    </>
                ) : (
                    <p>Chargement des infos</p>
                )}
            </section>
        </main>
    );
}
