function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSheetsConfig() {
  return {
    serviceAccountJson: requireEnv("GOOGLE_SERVICE_ACCOUNT_JSON"),
    sheetId: requireEnv("SHEET_ID"),
    sheetTab: process.env.SHEET_TAB ?? "Sheet1",
    sheetRange: process.env.SHEET_RANGE ?? "A:A",
  };
}
