// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! La page que vous recherchez n&apos;existe pas. Vous etes un enorme fdp non désiré. je vous recommande de balayer votre grand mere et quoicoubeh</p>
            <Link href="/">
                Retour à l&apos;accueil
            </Link>
        </div>
    );
};

export default Custom404;
