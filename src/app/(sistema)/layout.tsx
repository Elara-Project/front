import ProtectedRoute from "../../components/ProtectedRoute";

export default function SistemaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}