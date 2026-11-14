"use client";
import Link from "next/link";
import { Card, Shell } from "@/components/api/ui";
export default function Advertiser() {
  return (
    <Shell
      title="Publicidade no ELARA"
      description="Espaço de divulgação para serviços e iniciativas."
    >
      <Card>
        <h2 className="text-xl font-extrabold">
          Gerenciamento de campanhas em preparação
        </h2>
        <p>
          O servidor atual ainda não oferece cadastro de anunciantes, envio de
          campanhas ou aprovação de anúncios.
        </p>
        <p>
          Para informações:{" "}
          <a href="mailto:elarasac@gmail.com" className="underline">
            elarasac@gmail.com
          </a>
        </p>
        <Link
          href="/dashboard"
          className="font-bold text-[var(--elara-terracota)]"
        >
          Voltar ao início →
        </Link>
      </Card>
    </Shell>
  );
}
