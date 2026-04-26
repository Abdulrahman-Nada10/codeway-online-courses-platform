"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthBadge,
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthSecondaryLinkButton,
  AuthShell,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";
import { ForgotPasswordResult } from "@/types/auth";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<ForgotPasswordResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(null);

    if (!email.trim()) {
      setError("أدخل البريد الإلكتروني أولاً.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await forgotPassword(email.trim());
      setSuccess(result);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "تعذر إرسال طلب إعادة التعيين."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title="نسيت كلمة المرور؟"
        subtitle="ادخل بريدك الإلكتروني لإعادة التعيين"
        icon={
          <AuthBadge>
            <LockKeyhole className="h-4 w-4" />
          </AuthBadge>
        }
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="البريد الإلكتروني"
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />

          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          {success ? (
            <AuthMessage tone="success">
              <div className="space-y-1">
                <p>تم إرسال تعليمات إعادة التعيين إلى {success.email}.</p>
                {success.resetUrl ? (
                  <a
                    href={success.resetUrl}
                    className="font-semibold text-[#FF6A00] hover:underline"
                  >
                    رابط إعادة التعيين التجريبي
                  </a>
                ) : null}
              </div>
            </AuthMessage>
          ) : null}

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال الكود"}
          </AuthPrimaryButton>

          <AuthSecondaryLinkButton href="/login">
            العودة لتسجيل الدخول
          </AuthSecondaryLinkButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
