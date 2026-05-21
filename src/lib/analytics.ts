// 外部リンクのクリック計測 (GA4 カスタムイベント: outbound_click)
// gtag.js は index.html で読み込まれる前提。
// ローカル開発などで測定 ID 未設定 / gtag 未定義の場合は何もしない。

import { getCapturedUtm } from "./utm";

export type OutboundService = "qiita" | "zenn" | "github";
export type OutboundLocation = "header" | "footer" | "articles";

type TrackOutboundClickParams = {
  service: OutboundService;
  location: OutboundLocation;
  url: string;
};

// 現セッションの参照元 UTM を GA4 イベント用の session_utm_* キーで返す。
// 値が無いキーは含めない。GA4 標準の utm_* と衝突しないようプレフィックスを分ける。
const buildSessionUtmParams = (): Record<string, string> => {
  const utm = getCapturedUtm();
  const out: Record<string, string> = {};
  if (utm.utm_source) out.session_utm_source = utm.utm_source;
  if (utm.utm_medium) out.session_utm_medium = utm.utm_medium;
  if (utm.utm_campaign) out.session_utm_campaign = utm.utm_campaign;
  if (utm.utm_term) out.session_utm_term = utm.utm_term;
  if (utm.utm_content) out.session_utm_content = utm.utm_content;
  return out;
};

export const trackOutboundClick = ({
  service,
  location,
  url,
}: TrackOutboundClickParams): void => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "outbound_click", {
    service,
    location,
    link_url: url,
    transport_type: "beacon",
    ...buildSessionUtmParams(),
  });
};
