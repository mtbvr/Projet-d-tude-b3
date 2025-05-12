'use client'
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-8xl font-extrabold text-blue-500 neon-text">404</h1>
      <p className="text-lg mt-4 text-gray-400">Cette page s'est échappée dans le cyberespace...</p>
      <p className="mt-6 text-gray-400">Mais vous pouvez retrouver votre chemin.</p>
      <Link href="/">
        <button className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-700 rounded-md transition duration-300">
          Retour à l'accueil
        </button>
      </Link>
      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 20px #00f;
        }
      `}</style>
    </div>
  );
};

export default Custom404;