export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");
export type User = {
  idUser: number;
  name: string;
  email: string;
  role: "user" | "admin";
};
export type Child = {
  idChildren: number;
  name: string;
  dob: string;
  relationshipIdRelationship: number;
  diagnosesIdDiagnoses: number | null;
  clinicalDataIdClinicalData: number | null;
};
export type Clinical = {
  familyHistory: string;
  observations: string;
  therapyIdTherapy?: number | null;
  allergiesIdAllergies?: number | null;
};
export type Appointment = {
  idAppointments: number;
  appointmentDateTime: string;
  reason: string;
  local: string;
  notes: string;
  status: string;
};
export type Calendar = {
  idCalendar: number;
  appointmentsIdAppointments: number;
  date: string;
  status: string;
  descript: string;
};
export type Prescription = {
  medicationsIdCurrentMedications: number;
  frequency: string;
  status: number;
  startDate: string;
  endDate: string;
};
export type Medication = {
  idCurrentMedications: number;
  medicineName: string;
  route: string;
  instructions: string;
};
export type Notice = {
  idNotify: number;
  calendarIdCalendar: number;
  notifyDate: string;
  sent: number;
  descript: string;
};
export type Forum = {
  idForum: number;
  title: string;
  descript: string;
  diagnosesIdDiagnoses: number;
};
export type Comment = {
  idComments: number;
  content: string;
  createAt: string;
  userIdUser: number;
  status: string;
};
export type Right = {
  idRightsAndBenefits: number;
  title: string;
  category: string;
  type: string;
  descript: string;
  status: number;
};
export type Chat = {
  idChat: number;
  questions: string;
  answer: string;
  dateTime: string;
};
export type LibraryCategory = {
  idlibrary: number;
  name: string;
  descript: string;
};
export type Media = {
  idmedia: number;
  title: string;
  descript: string;
  libraryIdlibrary: number;
};
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
// A API atual devolve JWT no JSON, não um cookie HttpOnly. A sessão dura só nesta aba.
export function token() {
  return typeof window === "undefined"
    ? null
    : sessionStorage.getItem("elara_access_token");
}
export function clearSession() {
  sessionStorage.removeItem("elara_access_token");
  localStorage.removeItem("elara_usuario");
}
export function saveUser(user: User) {
  localStorage.setItem(
    "elara_usuario",
    JSON.stringify({
      id: user.idUser,
      nome: user.name,
      email: user.email,
      tipo: user.role === "admin" ? "admin" : "responsavel",
      logado: true,
    }),
  );
  window.dispatchEvent(new Event("elara-perfil-atualizado"));
}
async function response(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData))
    headers.set("Content-Type", "application/json");
  const jwt = token();
  if (jwt) headers.set("Authorization", `Bearer ${jwt}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store",
      signal: init.signal
        ? AbortSignal.any([init.signal, controller.signal])
        : controller.signal,
    });
  } catch (err) {
    if (init.signal?.aborted) throw err;
    throw new ApiError(
      "Não foi possível acessar o servidor. Confira a conexão e tente novamente.",
      0,
    );
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (res.status === 401 && path !== "/auth/login") {
      clearSession();
      window.dispatchEvent(new Event("elara-sessao-expirada"));
    }
    throw new ApiError(
      Array.isArray(data.message)
        ? data.message.join(" ")
        : data.message ||
            `Não foi possível concluir a operação (${res.status}).`,
      res.status,
    );
  }
  return res;
}
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await response(path, init);
  return res.status === 204 ? (undefined as T) : res.json();
}
export function send<T>(
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown,
) {
  return api<T>(path, {
    method,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
export async function downloadMedia(id: number, title: string) {
  const res = await response(`/media/${id}/file`);
  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = title;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Não foi possível concluir a operação.";
export function localDateTime(iso: string) {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
export const dateLabel = (iso: string) => new Date(iso).toLocaleString("pt-BR");
