'use client'
import Image from 'next/image'

const Header = () => {


    return (
        <header className="flex items-center justify-center shadow-header bg-custom-blue">
            <Image alt='Logo de Cyna' src='/images/logo-cyna-header.png' width={194} height={51} className='my-[9px]'/>
        </header>
    )
}

export default Header;
