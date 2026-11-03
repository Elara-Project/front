"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Usuario = {
  nome?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  relacao?: string;
  logado?: boolean;
};

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [relacao, setRelacao] = useState("Responsável");

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [dadosOriginais, setDadosOriginais] = useState<Usuario>({});

  const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

  function formatarCPF(valor: string) {
    return valor.replace(/\D/g, "").slice(0, 11)
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }

  function cpfValido(valor: string) {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;
    for (let tamanho = 9; tamanho < 11; tamanho++) {
      let soma = 0;
      for (let i = 0; i < tamanho; i++) soma += Number(numeros[i]) * (tamanho + 1 - i);
      const resto = (soma * 10) % 11;
      if (Number(numeros[tamanho]) !== (resto === 10 ? 0 : resto)) return false;
    }
    return true;
  }

  function aplicarUsuario(usuario: Usuario) {
    setNome(usuario.nome || "");
    setEmail(usuario.email || "");
    setTelefone(usuario.telefone || "");
    setCpf(formatarCPF(usuario.cpf || ""));
    setRelacao(usuario.relacao || "Responsável");
    setDadosOriginais(usuario);
  }

  useEffect(() => {
    let ativo = true;
    async function carregarPerfil() {
      try {
        const resposta = await fetch(`${API_URL}/usuarios/me`, {
          credentials: "include", cache: "no-store",
        });
        if (!resposta.ok) throw new Error("Não foi possível carregar o perfil pela API.");
        const usuario: Usuario = await resposta.json();
        if (ativo) aplicarUsuario(usuario);
      } catch {
        if (ativo) setErro("Não foi possível carregar o perfil. A API pode estar indisponível.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregarPerfil();
    return () => { ativo = false; };
  }, [API_URL]);

  function iniciarEdicao() {
    setDadosOriginais({ nome, email, telefone, cpf, relacao });
    setMensagem("");
    setErro("");
    setEditando(true);
  }

  async function salvarPerfil() {
    setErro("");
    if (!nome.trim()) { setErro("Digite seu nome."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro("Digite um e-mail válido."); return;
    }
    if (cpf && !cpfValido(cpf)) { setErro("Digite um CPF válido."); return; }

    setSalvando(true);
    try {
      const resposta = await fetch(`${API_URL}/usuarios/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nome: nome.trim(), email: email.trim(),
          telefone: telefone.trim(), cpf: cpf.replace(/\D/g, ""), relacao,
        }),
      });
      if (!resposta.ok) throw new Error("Não foi possível salvar as alterações na API.");
      const atualizado: Usuario = await resposta.json();
      aplicarUsuario(atualizado);
      setEditando(false);
      setMensagem("Perfil atualizado com sucesso!");
    } catch {
      setErro("Não foi possível salvar o perfil. Confira a conexão com a API.");
    } finally {
      setSalvando(false);
    }
  }

  function cancelarEdicao() {
    aplicarUsuario(dadosOriginais);
    setErro("");
    setMensagem("");
    setEditando(false);
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[var(--elara-offwhite)]">
        <div className="flex min-h-screen">
          <Sidebar />

          <section className="flex-1 p-6 md:p-10">
            <p className="text-[var(--elara-grafite)]">
              Carregando perfil...
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--elara-offwhite)]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 md:p-10">
          <div>
            <p className="font-semibold text-[var(--elara-azul)]">
              Minha conta
            </p>

            <h2 className="mt-2 text-4xl font-bold text-[var(--elara-grafite)]">
              Perfil
            </h2>

            <p className="mt-2 max-w-3xl text-[var(--elara-grafite)]">
              Consulte e atualize as informações da sua conta no ELARA.
            </p>
          </div>

          {erro && (
            <div role="alert" className="mt-8 rounded-2xl bg-red-50 p-4 text-red-700">{erro}</div>
          )}

          {mensagem && (
            <div className="mt-8 rounded-2xl bg-green-50 p-4">
              <p className="font-semibold text-green-700">
                {mensagem}
              </p>
            </div>
          )}

          {!editando ? (
            <div className="mt-10 max-w-3xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--elara-terracota)] text-2xl font-bold text-white">
                    {nome
                      ? nome.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[var(--elara-grafite)]">
                      {nome || "Usuário ELARA"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {relacao}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={iniciarEdicao}
                  className="w-fit rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-bold text-white"
                >
                  Editar perfil
                </button>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                  <p className="text-sm font-semibold text-[var(--elara-azul)]">
                    Nome completo
                  </p>

                  <p className="mt-2 font-bold text-[var(--elara-grafite)]">
                    {nome || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                  <p className="text-sm font-semibold text-[var(--elara-azul)]">
                    E-mail
                  </p>

                  <p className="mt-2 break-words font-bold text-[var(--elara-grafite)]">
                    {email || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                  <p className="text-sm font-semibold text-[var(--elara-azul)]">CPF</p>
                  <p className="mt-2 font-bold text-[var(--elara-grafite)]">
                    {cpf || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                  <p className="text-sm font-semibold text-[var(--elara-verde)]">
                    Telefone
                  </p>

                  <p className="mt-2 font-bold text-[var(--elara-grafite)]">
                    {telefone || "Não informado"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--elara-offwhite)] p-5">
                  <p className="text-sm font-semibold text-[var(--elara-verde)]">
                    Relação com a criança
                  </p>

                  <p className="mt-2 font-bold text-[var(--elara-grafite)]">
                    {relacao || "Não informado"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 max-w-3xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <div>
                <h3 className="text-2xl font-bold text-[var(--elara-grafite)]">
                  Editar informações
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Atualize os dados que desejar.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block font-semibold"
                  >
                    Nome completo
                  </label>

                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(event) =>
                      setNome(event.target.value)
                    }
                    placeholder="Digite seu nome"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-semibold"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Digite seu e-mail"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                  />
                </div>

                <div>
                  <label htmlFor="cpf" className="mb-2 block font-semibold">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    inputMode="numeric"
                    maxLength={14}
                    autoComplete="off"
                    value={cpf}
                    onChange={(event) => setCpf(formatarCPF(event.target.value))}
                    placeholder="000.000.000-00"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="mb-2 block font-semibold"
                  >
                    Telefone
                  </label>

                  <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(event) =>
                      setTelefone(event.target.value)
                    }
                    placeholder="(11) 99999-9999"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="relacao"
                    className="mb-2 block font-semibold"
                  >
                    Relação com a criança
                  </label>

                  <select
                    id="relacao"
                    value={relacao}
                    onChange={(event) =>
                      setRelacao(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--elara-azul)]"
                  >
                    <option value="Responsável">
                      Responsável
                    </option>

                    <option value="Mãe">
                      Mãe
                    </option>

                    <option value="Pai">
                      Pai
                    </option>

                    <option value="Avó">
                      Avó
                    </option>

                    <option value="Avô">
                      Avô
                    </option>

                    <option value="Familiar">
                      Familiar
                    </option>

                    <option value="Outro">
                      Outro
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={salvarPerfil}
                  disabled={salvando}
                  className="rounded-full bg-[var(--elara-terracota)] px-6 py-3 font-bold text-white"
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>

                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="rounded-full border border-gray-300 px-6 py-3 font-bold text-[var(--elara-grafite)]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
