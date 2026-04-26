"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthDivider,
  AuthFooterLine,
  AuthGoogleButton,
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthShell,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("أدخل البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "تعذر تسجيل الدخول. حاول مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title="مرحباً بعودتك"
        subtitle="انضم لأكثر من 50,000 متعلم"
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text="ليس لديك حساب؟"
              linkLabel="إنشاء حساب"
              href="/register"
            />
            <AuthFooterLine
              text="هل لديك حساب وتريد استرجاعه؟"
              linkLabel="استرجاع حساب"
              href="/recover-account"
            />
          </div>
        }
      >
        <AuthGoogleButton />
        <AuthDivider text="أو تسجل الدخول ببياناتك الشخصية" />

        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder="البريد الإلكتروني"
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />

          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            placeholder="كلمة المرور"
            rightIcon={<Lock className="h-4 w-4" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-[#B6BCC5]"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            autoComplete="current-password"
          />

          <div className="text-left">
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-[#4C8BFF] hover:underline"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الدخول..." : "دخول"}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
