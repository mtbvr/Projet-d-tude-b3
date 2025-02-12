'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa'

interface Categorie {
    id: number
    name: string;
    description: string;
}


const addCategorie = async (name:string, description:string) => {
    try {
        const reponse = await axios.post('/api/products/categorie/add', {name, description});
        return reponse;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la nouvelle categorie:', error);
        return false;
    }
}



const Page = () => {
    const { data: session } = useSession();
    const [showAddCategorietModal, setShowAddCategorieModal] = useState(false);
    const [categorie, setCategorie] = useState<Categorie[]>([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleAddCategorie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const name = (document.getElementById('categorieName') as HTMLInputElement)?.value;
        const description = (document.getElementById('categorieDescription') as HTMLInputElement)?.value;

        const newAddress = await addCategorie(name, description);

        if (newAddress) {
            console.log(newAddress);
            window.location.reload();
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (session?.user.isAdmin) {
            const fetchProdutcs = async () => {
                try {
                    const categorie = await axios.get('/api/products/categorie/get');
                    setCategorie(categorie.data);
                } catch (error) {
                    console.error("Erreur lors de la recherche d'infos produits:", error);
                } finally { 
                    setLoading(false);
                }

            };

            fetchProdutcs();
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
                {categorie ? (
                    <>
                    <article className="bg-white shadow-header rounded-lg p-6 max-w-md w-[80%] text-center shadow-header flex flex-col justify-center">
                        <h2 className="text-center font-semibold text-2xl">Categorie</h2>
                        <ul>
                            {categorie.map((element, index) => (
                            <li 
                                key={index} 
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative rounded"
                            >
                                <strong>Nom :</strong> {element.name}<br />
                                <strong>Description :</strong> {element.description}
                                {hoveredIndex === index && (
                                <div className="rounded absolute w-full h-full top-0 left-0 bg-gray-500 bg-opacity-50">
                                    <div className="absolute gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
                                        <FaEdit className="text-blue-500 cursor-pointer bg-gray-200 hover:bg-gray-400 p-1 rounded h-[30px] w-[30px]"  />
                                        <FaTrash className="text-red-500 cursor-pointer bg-gray-200 hover:bg-gray-400 p-1 rounded h-[30px] w-[30px]"  />
                                    </div>
                                </div>
                                )}
                            </li>
                            ))}
                        </ul>
                        <div>
                            <button 
                            className="md:w-[400px] w-[80%] mt-[12px] btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-button-color rounded hover:bg-button-color group p-2 font-semibold left-1/2 translate-x-[-50%]" 
                            onClick={() => setShowAddCategorieModal(true)}
                            >
                            <span className="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
                                Add new categorie
                            </span>
                            </button>
                        </div>
                        </article>
                    </>
                ):(
                    <p></p>
                )}
                {/* Add Categorie Modal */}
                {showAddCategorietModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg max-w-md w-[80%]">
                            <h2 className="text-2xl font-semibold mb-4">Add new categorie</h2>
                            <form onSubmit={handleAddCategorie}>
                                <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                    <input
                                        id="categorieName"
                                        type="text"
                                        className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                        placeholder="New categorie name"
                                    />
                                    <label htmlFor="categorieDescription" className="input__label absolute transition-all"> Categorie name </label>
                                </div>
                                <div className="relative my-[30px] mx-auto md:w-[400px] w-[80%]">
                                    <textarea
                                        id="categorieDescription"
                                        className="w-full input__field border-0 border-b-2 outline-none text-base text-text-input py-1 pr-8 bg-transparent transition-colors duration-200 border-b-secondary-input"
                                        placeholder="New categorie description"
                                    />
                                    <label htmlFor="categorieDescription" className="input__label absolute transition-all"> Categorie description </label>
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => setShowAddCategorieModal(false)}>Cancel</button>
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
            </section>
        </main>
      

      
    );
  };
  
  export default Page;