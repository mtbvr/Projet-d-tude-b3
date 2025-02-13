'use client';
import React from 'react';

export default function CGU() {
    return (
        <div className='text-white p-8 min-h-screen'>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">Conditions Générales d&apos;Utilisation (CGU)</h1>
                <p className="text-sm">Dernière mise à jour : [Date]</p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p className="leading-relaxed">
                    Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du site internet [Nom du site] (ci-après « le Site »).<br />
                    En accédant et en utilisant ce Site, vous acceptez sans réserve ces conditions. Si vous n&apos;acceptez pas ces conditions, vous devez vous abstenir d&apos;utiliser le Site.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. Informations légales</h2>
                <p className="leading-relaxed">
                    Les informations légales concernant l&apos;éditeur du site, son hébergement et ses coordonnées sont disponibles dans notre page Mentions légales, accessible à tout moment depuis [lien vers la page Mentions légales].
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Objet du site</h2>
                <p className="leading-relaxed">
                    Le Site a pour but de fournir [décrire l&apos;objectif du site : services, informations, e-commerce, etc.].<br /> Nous proposons [préciser les services ou produits
                    disponibles]et vous offrons la possibilité de [autres fonctionnalités].<br /> L&apos;utilisation du Site est réservée à des fins personnelles et non commerciales, sauf autorisation expresse.
                </p>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Accès au site</h2>
                <p className="leading-relaxed">
                 L&apos;accès au Site est gratuit, mais il est de votre responsabilité d&apos;assurer la connexion à Internet.<br />
                 Le Site se réserve le droit de suspendre ou de modifier l&apos;accès au Site pour des raisons techniques, de maintenance ou pour toute autre raison jugée nécessaire.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Utilisation du site</h2>
                <p className="leading-relaxed">
                    Vous vous engagez à utiliser le Site conformément aux lois en vigueur, et à ne pas enfreindre les droits de propriété intellectuelle. En particulier, vous vous engagez à ne pas :
                </p>
                <ul className="list-disc list-inside leading-relaxed">
                    <li>Utiliser le Site à des fins illégales ou frauduleuses ;</li>
                    <li>Perturber ou interférer avec le bon fonctionnement du Site ;</li>
                    <li>Collecter des informations personnelles sans autorisation.</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Propriété intellectuelle</h2>
                <p className="leading-relaxed">
                    Le contenu du Site, y compris, sans s&apos;y limiter, les textes, images, logos, vidéos et autres éléments, est protégé par des droits de propriété intellectuelle.<br /> 
                    Vous ne pouvez utiliser ces contenus qu&apos;à des fins personnelles et non commerciales, sauf autorisation préalable de l&apos;éditeur du Site.<br /> 
                    Pour plus d&apos;informations sur les droits de propriété intellectuelle, veuillez consulter la section dédiée dans nos Mentions légales.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Données personnelles et confidentialité</h2>
                <p className="leading-relaxed">
                    Le Site collecte et traite certaines données personnelles de ses utilisateurs dans le cadre de la fourniture de ses services.<br />
                    La gestion de vos données personnelles est détaillée dans notre Politique de confidentialité, disponible à [lien vers la politique de confidentialité].<br />
                    Vous y trouverez des informations sur vos droits (accès, rectification, effacement) et la manière dont nous protégeons vos données.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">8. Responsabilité</h2>
                <p className="leading-relaxed">
                    Le Site met tout en œuvre pour offrir des informations exactes et à jour. Cependant, nous ne garantissons pas que les informations soient toujours exactes, complètes ou exemptes d&apos;erreurs. Nous déclinons toute responsabilité pour les erreurs ou omissions présentes sur le Site, ou pour les conséquences d&apos;une utilisation du Site.<br />
                    Le Site ne pourra en aucun cas être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce Site.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Propriété intellectuelle</h2>
                <p className="leading-relaxed">
                    Tous les éléments du Site (textes, images, logos, vidéos, etc.) sont protégés par des droits de propriété intellectuelle. Toute reproduction ou utilisation non autorisée de ces éléments est interdite sans notre consentement préalable.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">10. Modification des CGU</h2>
                <p className="leading-relaxed">
                    Les présentes CGU peuvent être modifiées à tout moment par l&apos;éditeur du Site.<br />
                    Ces modifications seront publiées sur cette page et prendront effet immédiatement après leur publication.<br />
                    Nous vous encourageons à consulter régulièrement ces CGU.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">12. Loi applicable et juridiction compétente</h2>
                <p className="leading-relaxed">
                    Les présentes Conditions Générales d&apos;Utilisation sont régies par le droit français.<br />
                    Tout litige relatif à leur interprétation, leur validité ou leur exécution sera soumis aux juridictions compétentes du ressort du tribunal de [ville où votre entreprise est enregistrée], sauf disposition légale impérative contraire.
                </p>
            </div>
        </div>
    )
}
