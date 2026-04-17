import crypto from "node:crypto";

/**
 * NOTE: TNPSC pages change often. Keep parser logic resilient and add monitoring.
 */
export async function scrapeTnpscPdfLinks(currentAffairsUrl) {
  const response = await fetch(currentAffairsUrl);
  const html = await response.text();

  // Lightweight parser: look for direct PDF links.
  const links = [...html.matchAll(/href=["']([^"']+\.pdf)["']/gi)].map((m) => m[1]);

  return links.map((link) => ({
    pdfUrl: new URL(link, currentAffairsUrl).toString(),
    contentHash: crypto.createHash("sha256").update(link).digest("hex")
  }));
}
