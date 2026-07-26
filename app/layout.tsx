import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: {
      default: "浙江工商大学学生社团管理中心",
      template: "%s · SCMC",
    },
    description:
      "连接学生社团、服务校园文化、记录共同经历。浙江工商大学学生社团管理中心官方宣传网站。",
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "SCMC / 浙江工商大学学生社团管理中心",
      title: "让热爱发生，让青春留下痕迹",
      description: "浙江工商大学学生社团管理中心 · 校园文化档案馆",
      images: [
        {
          url: new URL("/og.png", base).toString(),
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
      images: [new URL("/og.png", base).toString()],
    },
  };
}

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
