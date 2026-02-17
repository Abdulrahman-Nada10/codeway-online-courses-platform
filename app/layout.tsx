import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EGC | منصة التعليم الإلكتروني",
    template: "%s | EGC",
  },
  description:
    "منصة EGC للتعليم الإلكتروني العربي، دورات عملية في البرمجة، الذكاء الاصطناعي، تحليل البيانات، التصميم، وتطوير المهارات المهنية بإشراف خبراء.",
  keywords: [
    "تعليم أونلاين",
    "كورسات أونلاين",
    "منصة تعليمية",
    "تعلم البرمجة",
    "تحليل البيانات",
    "UX UI",
    "ذكاء اصطناعي",
    "EGC",
    "E-learning Arabic",
  ],
  authors: [{ name: "CODEWAY Team" }],
  creator: "EGC Platform",
  publisher: "EGC",

  openGraph: {
    title: "EGC | منصة التعليم الإلكتروني",
    description:
      "ابدأ رحلتك المهنية مع أفضل الدورات العملية عبر منصة EGC للتعليم الإلكتروني.",
    url: "https://egc.com",
    siteName: "EGC",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "EGC E-Learning Platform",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EGC | منصة التعليم الإلكتروني",
    description:
      "تعلّم مهارات المستقبل مع دورات EGC العملية أونلاين.",
    images: ["/favicon.ico"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
