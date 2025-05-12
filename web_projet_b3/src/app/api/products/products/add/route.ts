import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, categorieList, caracList, image } = await request.json();

    if (!name || !description || !price || !categorieList) {
      return new NextResponse(JSON.stringify({ error: 'Tous les champs sont requis' }), { status: 400 });
    }

    const disponible = true;

    // Insertion dans la table Services
    const { data: serviceData, error: serviceError } = await supabase
      .from('Services')
      .insert([{ name, description, price, disponible }])
      .select('id');

    if (serviceError) {
      console.error('Erreur lors de la création du service:', serviceError);
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création du service' }), { status: 500 });
    }

    const serviceId = serviceData[0]?.id;
    if (!serviceId) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création du service' }), { status: 500 });
    }

    // Insertion dans Categorie_Service
    const categoryInsertions = categorieList.map(async (categorie: string) => {
      const { data, error } = await supabase
        .from('Categorie_Service')
        .insert([{ idcategorie: categorie, idservice: serviceId }]);
      if (error) {
        console.error('Erreur lors de la création de la catégorie:', error);
        throw new Error('Erreur lors de la création de la catégorie');
      }
      return data;
    });
    try {
      await Promise.all(categoryInsertions);
    } catch (categoryError) {
      return new NextResponse(JSON.stringify({ error: 'Erreur lors de la création des catégories', categoryError }), { status: 500 });
    }

    // Insertion dans Carac_technique
    if (caracList && Array.isArray(caracList)) {
      const techInsertions = caracList.map(async (tech: string) => {
        const { data, error } = await supabase
          .from('Carac_technique')
          .insert([{ id_service: serviceId, name: tech }]);
        if (error) {
          console.error('Erreur lors de l\'insertion de la caractéristique technique:', error);
          throw new Error('Erreur lors de l\'insertion de la caractéristique technique');
        }
        return data;
      });
      try {
        await Promise.all(techInsertions);
      } catch (techError) {
        return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'insertion des caractéristiques techniques', techError }), { status: 500 });
      }
    }

    // Upload de l'image, si fournie
    if (image) {
      // On attend une chaîne de type base64, potentiellement avec un préfixe "data:image/jpeg;base64,"
      const base64Regex = /^data:image\/\w+;base64,/;
      let imageData = image;
      if (base64Regex.test(image)) {
        imageData = image.replace(base64Regex, '');
      }
      // Conversion de la chaîne base64 en Buffer
      const buffer = Buffer.from(imageData, 'base64');
      // Définir le chemin du fichier dans le bucket (ici on utilise serviceId pour associer l'image au produit)
      const filePath = `${serviceId}.jpg`;

      // Remplacer 'your-bucket-name' par le nom de ton bucket Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, buffer, { contentType: 'image/jpeg' });

      if (uploadError) {
        console.error("Erreur lors de l'upload de l'image:", uploadError);
        return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'upload de l\'image', uploadError }), { status: 500 });
      }
    }

    return new NextResponse(JSON.stringify({ message: 'Service créé avec succès', serviceId }), { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'ajout du service:', error);
    return new NextResponse(JSON.stringify({ error: 'Erreur lors de l\'ajout du service' }), { status: 500 });
  }
}