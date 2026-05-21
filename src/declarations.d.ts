declare module "*.png" {
  const value: string;
  export default value;
}

// GA4 (gtag.js) は index.html で読み込まれる
interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js" | "consent",
    eventNameOrTarget: string | Date,
    params?: Record<string, unknown>,
  ) => void;
  dataLayer?: unknown[];
}
