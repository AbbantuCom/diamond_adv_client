import { getTeam } from './content-api';
import type { TeamCategory, TeamMember } from './content-types';

/** Kept as the name the components already use for one profile. */
export type Person = TeamMember;
export type { TeamCategory };

export { getTeam };

export async function getPerson(slug: string): Promise<Person | undefined> {
  return (await getTeam()).find((person) => person.slug === slug);
}

/** The profile that follows `slug` in team order, wrapping at the end. */
export async function getNextPerson(slug: string): Promise<Person | undefined> {
  const team = await getTeam();
  if (team.length === 0) return undefined;
  const index = team.findIndex((person) => person.slug === slug);
  return team[(index + 1) % team.length];
}

/** The lawyers featured on the home page, in display order. */
export async function getFeaturedTeam(): Promise<Person[]> {
  return (await getTeam()).filter((person) => person.featured);
}
