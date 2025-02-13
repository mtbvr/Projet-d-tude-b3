'use client';
import React from 'react';

export default function Legal(){
    return (
        <div className='text-white p-8 min-h-screen'>
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Mentions Légales</h1>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Informations générales</h2>
            <p className="leading-relaxed">
                Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons des éléments suivants concernant le site :<br />
                <strong>Nom du site :</strong> CYNA <br />
                <strong>URL du site :</strong> <a href="https://projet-d-tude-b3.vercel.app/pages/login" className="text-blue-500 underline">https://projet-d-tude-b3.vercel.app/pages/login</a> <br />
                <strong>Responsable de la publication :</strong> Nom et prénom du responsable <br />
                <strong>Adresse de l'entreprise :</strong> 10 rue de Penthièvre 75008 Paris<br />
                <strong>Numéro de téléphone :</strong> Numéro de téléphone<br />
                <strong>Adresse e-mail :</strong> Adresse e-mail<br />
                <strong>Hébergeur :</strong><br />
                <strong>Nom :</strong> Nom de l'hébergeur<br />
                <strong>Adresse :</strong> Adresse de l'hébergeur<br />
                <strong>Numéro de téléphone :</strong> Numéro de téléphone de l'hébergeur<br />
            </p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Propriété intellectuelle</h2>
            <p className="leading-relaxed">
                Le contenu de ce site, incluant mais sans s'y limiter, les textes, images, logos, vidéos, graphiques et autres éléments,
                est protégé par les droits de propriété intellectuelle.<br />
                Toute reproduction, distribution, 
                ou utilisation non autorisée de ces contenus est strictement interdite sans l'accord préalable de l'éditeur du site.
            </p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Données personnelles</h2>
            <p className="leading-relaxed">
               Le site collecte des données personnelles dans le cadre de la gestion des utilisateurs et des services proposés.<br />
               Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition sur vos données personnelles.<br />
               Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : adresse e-mail.
            </p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Responsabilité</h2>
            <p className="leading-relaxed">
                Nous mettons tout en œuvre pour fournir des informations fiables et actualisées, mais nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations présentes sur ce site.<br />
                Nous déclinons toute responsabilité en cas d'erreurs ou d'omissions dans le contenu du site.
            </p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Liens externes</h2>
            <p className="leading-relaxed">
            Le site peut contenir des liens vers des sites tiers.<br /> 
            Nous ne sommes pas responsables du contenu de ces sites externes, ni des pratiques de confidentialité qu'ils appliquent.
            </p>
            </div>

            <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Loi applicable</h2>
            <p className="leading-relaxed">
            Les présentes mentions légales sont régies par la législation française.<br />
            Tout litige relatif à l'utilisation du site sera soumis aux juridictions compétentes.
            </p>
            </div>
        </div>
    )
}
