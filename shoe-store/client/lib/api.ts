const API_BASE = ""; // Always use relative paths to leverage the Netlify/Vite proxy and avoid cross-origin cookie blocks

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
