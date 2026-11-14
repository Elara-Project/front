"use client";
import { ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";
// Ainda não existe papel de anunciante na API; esta área exibe somente disponibilidade.
export default function AnuncianteRoute({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
