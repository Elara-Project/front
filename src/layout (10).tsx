import AdminRoute from "../../components/AdminRoute";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminRoute>{children}</AdminRoute>;
}