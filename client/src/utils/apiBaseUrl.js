const rawBaseUrl = (import.meta.env.VITE_API_URL || "").trim();

// Normalize the base URL so all API calls consistently target the backend /api prefix.
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");

let apiBaseUrl = "/api";

if (normalizedBaseUrl) {
  apiBaseUrl = normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
}

export default apiBaseUrl;