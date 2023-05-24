export const fetchUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL;

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://cazamonedas.vercel.app";
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const BASE_URL = getBaseUrl();
