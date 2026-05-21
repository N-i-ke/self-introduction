// UTM パラメータの捕捉 / 取り出し。
// 着地時に URL から utm_* を読み取り sessionStorage に保存する。
// 内部遷移でクエリが落ちても、同一セッション内なら参照できる。

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "session_utm_params";

const safeStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const captureUtmFromLocation = (): void => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const captured: UtmParams = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      captured[key] = value;
      hasAny = true;
    }
  }
  if (!hasAny) return;
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // QuotaExceeded など。記録できなくてもクラッシュさせない
  }
};

export const getCapturedUtm = (): UtmParams => {
  const storage = safeStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};
    const result: UtmParams = {};
    const obj = parsed as Record<string, unknown>;
    for (const key of UTM_KEYS) {
      const value = obj[key];
      if (typeof value === "string" && value.length > 0) {
        result[key] = value;
      }
    }
    return result;
  } catch {
    return {};
  }
};
