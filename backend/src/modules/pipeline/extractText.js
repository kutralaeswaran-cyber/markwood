/**
 * Placeholder extractor.
 * Replace with pdf-parse + OCR fallback (tesseract) for scanned documents.
 */
export async function extractAndCleanText(pdfPath) {
  // TODO: integrate parser and OCR.
  return {
    rawText: `Extracted placeholder text from ${pdfPath}`,
    cleanedText: "Current affairs cleaned summary placeholder"
  };
}
