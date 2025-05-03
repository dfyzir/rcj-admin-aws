export function parseKeyFallback(key: string) {
  const baseName = key.replace(/\.[^/.]+$/, "");
  const parts = baseName.split("_");
  const businessName = parts[0] ?? "N/A";
  const formOfBusiness = parts[1] ?? "N/A";

  return { businessName, formOfBusiness };
}

export function parseKeyFallbackForDriversApplications(key: string) {
  const filename = key.substring(key.lastIndexOf("/") + 1);
  const baseName = filename.replace(/\.[^/.]+$/, "");
  const parts = baseName.split("_");
  const firstName = parts[0] ?? "N/A";
  const lastName = parts[1] ?? "N/A";

  return { firstName, lastName };
}
