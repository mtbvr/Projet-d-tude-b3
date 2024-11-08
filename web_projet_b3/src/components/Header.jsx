'use client'
import { useSession, signOut } from 'next-auth/react';

const Header = () => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <header className="bg-custom-blue flex flex-row justify-end h-[100px]">
            <div className="flex flex-row gap-[40px] w-min mx-[40px] relative top-1/2 translate-y-[-50%] h-min">
                <a href="/pages/login" className="bg-button-color px-[42px] flex items-center h-[44px] rounded-[50px] text-white hover:text-button-color hover:bg-white border-[1px] border-button-color"><span>Connexion</span></a>
                <a href="/pages/login" className="bg-button-color px-[42px] flex items-center h-[44px] rounded-[50px] text-white hover:text-button-color hover:bg-white border-[1px] border-button-color"><span>Inscription</span></a>
            </div>

            {session ? (
                <>
                    <p>Signed in as {session.user?.email}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            ) : (
                <p>You are not signed in</p>
            )}

        </header>
    )
}

export default Header;
