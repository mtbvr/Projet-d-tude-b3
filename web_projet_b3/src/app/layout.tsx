import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import ClientWrapper from "../components/ClientWrapper";

export const metadata: Metadata = {
  title: "Cyna",
  description: "Cyna web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Provider>
        <body className="bg-custom-blue overflow-x-hidden">
          <Header />
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
