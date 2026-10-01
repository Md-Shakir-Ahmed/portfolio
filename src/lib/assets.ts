/**
 * Asset path helper for Next.js static exports (GitHub Pages & custom domains).
 * Ensures assets like images, logos, and PDFs work whether hosted at domain root,
 * local dev server, or a GitHub Pages subpath (/portfolio).
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  let basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Dynamic fallback for browser environments on GitHub Pages
  // e.g., https://md-shakir-ahmed.github.io/portfolio/
  if (!basePath && typeof window !== "undefined") {
    if (window.location.hostname.endsWith(".github.io")) {
      const segments = window.location.pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        basePath = `/${segments[0]}`;
      }
    }
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
