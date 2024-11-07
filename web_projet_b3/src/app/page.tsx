/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/getuser');
                setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des utilisateurs');
      }
    };

    fetchData(); 
  }, []); 

  if (error) {
    return <div>{error}</div>; 
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
