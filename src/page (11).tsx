"use client";
import Link from "next/link";
import { User } from "@/lib/api";
import { Card, Feedback, Shell, useResource } from "@/components/api/ui";
export default function Admin() {
  const r = useResource<User[]>("/users");
  return (
    <Shell
      title="Administração"
      description="Consulte as contas cadastradas e acesse os espaços de moderação."
    >
      <Feedback busy={r.loading} error={r.error} retry={r.reload} />
      <Card>
        <h2 className="text-xl font-extrabold">Usuários</h2>
        {r.data && <p>{r.data.length} contas cadastradas</p>}
        {r.data?.map((u) => (
          <div
            key={u.idUser}
            className="border-b border-[var(--elara-borda)] py-3"
          >
            <p className="font-bold">{u.name}</p>
            <p className="break-all">
              {u.email} · {u.role === "admin" ? "Administrador" : "Responsável"}
            </p>
          </div>
        ))}
      </Card>
      <Card>
        <Link href="/forum" className="font-bold text-[var(--elara-terracota)]">
          Abrir fórum para moderação →
        </Link>
        <p>Campanhas e anúncios aguardam rotas próprias no servidor.</p>
      </Card>
    </Shell>
  );
}
