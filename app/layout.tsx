import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://zjsu-scmc-2026.fshfish88.chatgpt.site"
).replace(/\/+$/, "");
const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "浙江工商大学学生社团管理中心",
    template: "%s · SCMC",
  },
  description:
    "连接学生社团、服务校园文化、记录共同经历。浙江工商大学学生社团管理中心官方宣传网站。",
  icons: {
    icon: `${assetBasePath}/favicon.png`,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "SCMC / 浙江工商大学学生社团管理中心",
    title: "让热爱发生，让青春留下痕迹",
    description: "浙江工商大学学生社团管理中心 · 校园文化档案馆",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "浙江工商大学学生社团管理中心",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "浙江工商大学学生社团管理中心",
    description: "让热爱发生，让青春留下痕迹。",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

