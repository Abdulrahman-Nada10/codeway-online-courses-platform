"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthBadge,
  AuthInput,
  AuthPrimaryButton,
  AuthSecondaryLinkButton,
  AuthShell,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";
import { email } from "@/app/libs/validation";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [emailValue, setEmailValue] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value: string) => {
    setEmailValue(value);
    if (error) setError(undefined);
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = email(emailValue);
    if (validationError) setError(validationError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched(true);
    const validationError = email(emailValue);
    setError(validationError);
    if (validationError) return;

    setIsSubmitting(true);

    try {
      const result = await forgotPassword(emailValue.trim());
      toast.success(`تم إرسال تعليمات إعادة التعيين إلى ${result.email}`);
    } catch (submissionError) {
      toast.error(
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
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <AuthInput
            type="email"
            value={emailValue}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
            placeholder="البريد الإلكتروني"
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            error={touched ? error : undefined}
          />

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

