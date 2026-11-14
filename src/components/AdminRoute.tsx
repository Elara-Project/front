"use client";
import { ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";
export default function AdminRoute({ children }: { children: ReactNode }) {
  return <ProtectedRoute role="admin">{children}</ProtectedRoute>;
}
