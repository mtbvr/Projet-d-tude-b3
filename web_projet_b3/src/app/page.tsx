import { getUsers } from "./api/selectuser/route";

export default async function Home() {
  const users = await getUsers(); // Récupère tous les utilisateurs

  // Si la liste des utilisateurs est vide
  if (users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div>
      {/* Affiche chaque utilisateur avec son nom et son mot de passe */}
      {users.map((user, index) => (
        <div key={index} className="flex flex-row gap-6">
          <p>Name: {user.name}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
  );
}
