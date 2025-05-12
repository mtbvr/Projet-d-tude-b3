import { NextResponse } from "next/server";
import supabase from "@/supabaseClient";
import { PostgrestResponse } from "@supabase/supabase-js";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  disponible: boolean;
  categories: Array<string>;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("id");
    

    const { data: serviceData, error: serviceError }: PostgrestResponse<Service> = await supabase
      .from("Services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (serviceError || !serviceData) {
      console.error("Erreur lors de la récupération du service:", serviceError);
      return new NextResponse(JSON.stringify({ error: "Service non trouvé" }), { status: 404 });
    }

    const { data: categoriesData, error: categoriesError }: PostgrestResponse<{ idcategorie: string }> = await supabase
      .from("Categorie_Service")
      .select("idcategorie")
      .eq("idservice", serviceId);

    if (categoriesError) {
      console.error("Erreur lors de la récupération des catégories:", categoriesError);
      return new NextResponse(JSON.stringify({ error: "Erreur lors de la récupération des catégories" }), { status: 500 });
    }

    return new NextResponse(
      JSON.stringify({
        ...serviceData,
        categories: categoriesData ? categoriesData.map((categorie) => categorie.idcategorie) : [],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération du service:", error);
    return new NextResponse(JSON.stringify({ error: "Erreur interne du serveur" }), { status: 500 });
  }
}