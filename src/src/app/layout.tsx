import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Acessibilidade from "../components/Acessibilidade";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELARA",
  description:
    "Plataforma de apoio e organização para responsáveis por crianças atípicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={nunito.className}>
        {children}
        <Acessibilidade />
      </body>
    </html>
  );
}