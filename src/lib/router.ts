import { ActiveTab } from '../types';

/**
 * Tiny path <-> tab mapper — no router dependency needed since every tab
 * already renders from a single `activeTab` switch in App.tsx. This just
 * keeps the browser URL (and back/forward) in sync with it.
 *
 * cPanel's .htaccess already rewrites every non-file request to index.html,
 * so any of these paths work on a hard refresh or a shared link.
 */

export interface ParsedLocation {
  tab: ActiveTab;
  destinationId?: string;
}

const PATH_TO_TAB: Record<string, ActiveTab> = {
  home: 'home',
  destinations: 'destinations',
  'visa-services': 'visa-services',
  packages: 'packages',
  enquiry: 'enquiry',
  contact: 'contact',
  about: 'about',
  plan: 'plan',
  admin: 'admin',
};

export const parsePath = (pathname: string): ParsedLocation => {
  const clean = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  if (!clean) return { tab: 'home' };

  const [first, second] = clean.split('/');

  if (first === 'destinations' && second) {
    return { tab: 'destination-detail', destinationId: second };
  }

  const tab = PATH_TO_TAB[first];
  return tab ? { tab } : { tab: 'home' };
};

export const pathFor = (tab: ActiveTab, destinationId?: string | null): string => {
  if (tab === 'destination-detail') return `/destinations/${destinationId ?? ''}`;
  return `/${tab}`;
};

/** Push a new URL for a tab (no-op if the browser is already there). */
export const pushTab = (tab: ActiveTab, destinationId?: string | null) => {
  const path = pathFor(tab, destinationId);
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
};
