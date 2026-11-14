import AnuncianteRoute from "../../components/AnuncianteRoute";

export default function AnuncianteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AnuncianteRoute>{children}</AnuncianteRoute>;
}