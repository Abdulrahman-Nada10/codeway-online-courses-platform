import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ReduxProvider from "./components/ReduxProvider";
import AuthProvider from "./providers/AuthProvider";
import I18nProvider from "../providers/I18nProvider";
import { ThemeProvider } from "../providers/ThemeProvider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة التعلم الإلكترونية",
  description: "منصة تعليمية لتطوير مهاراتك",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EGC",
  },
  keywords: [
    "تعلم عبر الإنترنت",
    "دورات تعليمية",
    "تطوير المهارات",
    "تعلم جديد",
    "منصة تعليمية",
    "تعلم إلكتروني",
    "دورات مجانية",
    "تعلم البرمجة",
    "تعلم التصميم",
    "تعلم اللغة الإنجليزية",
    "تعلم اللغة العربية",
    "تعلم اللغة الفرنسية",
    "تعلم اللغة الإسبانية",
    "تعلم اللغة الصينية",
    "تعلم اللغة اليابانية",
    "تعلم اللغة الألمانية",
    "تعلم اللغة الروسية",
    "تعلم اللغة التركية",
    "تعلم اللغة البرتغالية",
    "تعلم اللغة الإيطالية",
    "تعلم اللغة الهولندية",
    "تعلم اللغة السويدية",
    "تعلم اللغة الفنلندية",
    "تعلم اللغة الدنماركية",
    "تعلم اللغة النرويجية",
    "تعلم اللغة البولندية",
    "تعلم اللغة التشيكية",
    "تعلم اللغة السلوفاكية",
    "تعلم اللغة المجرية",
    "تعلم اللغة الرومانية",
    "تعلم اللغة البلغارية",
    "تعلم اللغة الصربية",
    "تعلم اللغة الكرواتية",
    "تعلم اللغة البوسنية",
    "تعلم اللغة السلوفينية"],

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} antialiased bg-page-bg  transition-colors duration-300`}
      >
        <ReduxProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <I18nProvider>
                {children}
              </I18nProvider>
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
        <Toaster
          position="top-left"
          richColors
          closeButton
          duration={3000}
          toastOptions={{
            style: {
              fontFamily: 'var(--font-cairo), system-ui, sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
