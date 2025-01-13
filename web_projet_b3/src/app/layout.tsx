import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Provider from "../components/Provider"

export const metadata: Metadata = {
  title: "Cyna",
  description: "Cyna web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Provider>
      <body className="bg-custom-blue">
        <Header />
        {children}
        <Footer />
      </body>
      </Provider>
    </html>
  );
}
