/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);  // Stocke les utilisateurs
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les utilisateurs
    const fetchData = async () => {
      try {
        // Appel à l'API
        const response = await axios.get('/api/users/getuser');
        
        // Vérifiez la structure des données renvoyées par l'API
        setUsers(response.data); // Réponse attendue: un tableau d'utilisateurs
      } catch (error) {
        // Gérer les erreurs d'appel API
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchData(); // Appel de la fonction
  }, []); // Le tableau vide [] assure que ça ne s'exécute qu'une seule fois au montage

  if (error) {
    return <div>{error}</div>; // Si erreur, affiche le message d'erreur
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.firstname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
