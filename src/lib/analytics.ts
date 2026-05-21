// 外部リンクのクリック計測 (GA4 カスタムイベント: outbound_click)
// gtag.js は index.html で読み込まれる前提。
// ローカル開発などで測定 ID 未設定 / gtag 未定義の場合は何もしない。

export type OutboundService = "qiita" | "zenn" | "github";
export type OutboundLocation = "header" | "footer" | "articles";

type TrackOutboundClickParams = {
  service: OutboundService;
  location: OutboundLocation;
  url: string;
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
  });
};
