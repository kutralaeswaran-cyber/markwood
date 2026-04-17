import fs from "node:fs/promises";
import path from "node:path";

export async function downloadPdf(pdfUrl, storageDir, fileName) {
  await fs.mkdir(storageDir, { recursive: true });

  const response = await fetch(pdfUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${pdfUrl}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const filePath = path.join(storageDir, fileName);
  await fs.writeFile(filePath, buffer);

  return filePath;
}
