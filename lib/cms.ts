/**
 * CMS abstraction — for copy and content that a non-engineer might want to
 * edit without a code deploy. Today it re-exports mock data; later it can
 * hit Sanity/Contentful/Notion/a headless CMS of choice.
 */
import {
  getAnnouncements,
  getAcademySessions,
  getServices,
} from "@/lib/api";
import type { Announcement, AcademySession, Service } from "@/lib/types";

export async function fetchAnnouncements(): Promise<Announcement[]> {
  return getAnnouncements();
}

export async function fetchAcademySessions(): Promise<AcademySession[]> {
  return getAcademySessions();
}

export async function fetchFeaturedService(): Promise<Service | null> {
  const services = await getServices();
  return services[0] ?? null;
}
