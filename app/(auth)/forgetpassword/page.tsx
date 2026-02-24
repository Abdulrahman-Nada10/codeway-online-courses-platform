"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/app/components/Input";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("من فضلك أدخل البريد الإلكتروني");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("حدث خطأ أثناء الإرسال");

      router.push(`/verify-code?email=${email}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-10  space-y-6"
    >
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-14 sm:w-22 sm:h-16 flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="شعار الموقع"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Lock Icon */}
      <div className="flex justify-center">
        <div className="bg-[var(--primary)] p-4 rounded-xl">
          <Lock className="text-[var(--secondry)]" size={28} />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--primary)]">نسيت كلمة المرور؟</h2>
        <p className="text-sm text-[var(--secondary)] mt-2">
          أدخل بريدك الإلكتروني لإعادة التعيين
        </p>
      </div>

      {/* Email Input */}
      <Input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        icon={<Mail size={18} />}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--primary)] hover:brightness-90 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
      >
        {loading ? "جاري الإرسال..." : "إرسال الكود"}
      </button>

      {/* Back to Login */}
      <Link
        href="/login"
        className="block w-full text-center border border-[var(--primary)] text-[var(--primary)] py-3 rounded-lg font-medium hover:bg-[var(--primary)]/10 transition"
      >
        العودة إلى تسجيل الدخول
      </Link>
    </form>
  );
}