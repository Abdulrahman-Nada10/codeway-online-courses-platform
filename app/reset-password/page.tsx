"use client";

import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("رابط إعادة التعيين غير صالح.");
      return;
    }

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (password !== confirmPassword) {
      setError("تأكيد كلمة المرور غير مطابق.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        token,
        password,
      });

      setSuccess(true);
      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "تعذر إعادة تعيين كلمة المرور."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="تعيين كلمة مرور جديدة"
      subtitle="ادخل كلمة المرور الجديدة ثم أكدها"
      icon={
        <AuthBadge>
          <LockKeyhole className="h-4 w-4" />
        </AuthBadge>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthInput
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="كلمة المرور الجديدة"
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
          autoComplete="new-password"
        />

        <AuthInput
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="تأكيد كلمة المرور"
          rightIcon={<Lock className="h-4 w-4" />}
          leftIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="text-[#B6BCC5]"
              aria-label={
                showConfirmPassword
                  ? "إخفاء تأكيد كلمة المرور"
                  : "إظهار تأكيد كلمة المرور"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          autoComplete="new-password"
        />

        {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

        {success ? (
          <AuthMessage tone="success">
            تم تحديث كلمة المرور بنجاح. سيتم تحويلك إلى صفحة الدخول.
          </AuthMessage>
        ) : null}

        <AuthPrimaryButton type="submit" disabled={isSubmitting || !token}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ كلمة المرور"}
        </AuthPrimaryButton>

        <AuthSecondaryLinkButton href="/login">
          العودة لتسجيل الدخول
        </AuthSecondaryLinkButton>
      </form>
    </AuthShell>
  );
}

function ResetPasswordFallback() {
  return (
    <AuthShell
      title="تعيين كلمة مرور جديدة"
      subtitle="يتم تجهيز الصفحة..."
      icon={
        <AuthBadge>
          <LockKeyhole className="h-4 w-4" />
        </AuthBadge>
      }
    >
      <div className="text-center text-[12px] text-[#A0A0A0]">جاري التحميل...</div>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <PublicRoute>
      <Suspense fallback={<ResetPasswordFallback />}>
        <ResetPasswordContent />
      </Suspense>
    </PublicRoute>
  );
}
