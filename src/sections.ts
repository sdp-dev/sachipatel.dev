export const SECTIONS = ['about', 'experience', 'projects', 'stack', 'contact'] as const;

export type SectionId = (typeof SECTIONS)[number];

// Sections set scroll-margin-top in CSS so the sticky nav doesn't cover their headers.
export const scrollToSection = (id: SectionId | null) => {
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};
