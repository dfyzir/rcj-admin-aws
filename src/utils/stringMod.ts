export function parseKeyFallback(key: string) {
  const baseName = key.replace(/\.[^/.]+$/, "");
  const parts = baseName.split("_");
  const businessName = parts[0] ?? "N/A";
  const formOfBusiness = parts[1] ?? "N/A";

  return { businessName, formOfBusiness };
}
