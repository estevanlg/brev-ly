import { api } from "./api";

export interface CreateLinkRequest {
  originalUrl: string;
  shortenedUrl: string;
}

export interface Link {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  visitorCounter: number;
  createdAt: string;
}

export async function createLink(data: CreateLinkRequest) {
  const response = await api.post("/links", data);

  return response.data;
}

export async function getLinks() {
  const { data } = await api.get<Link[]>("/links");
  return data;
}

export async function getLinkBySlug(slug: string) {
  const { data } = await api.get<Link>(`/links/${slug}`);

  return data;
}

export async function registerVisit(id: string) {
  await api.post(`/links/${id}/visitor-counter`);
}

export async function deleteLink(id: string) {
  await api.delete(`/links/${id}`);
}

export async function exportLinks() {
  const { data } = await api.get<{ reportUrl: string }>("/links/export");

  return data;
}
