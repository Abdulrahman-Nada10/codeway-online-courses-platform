"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
    const validationError = email(emailValue, t("validation.invalidEmail"));
    if (validationError) setError(validationError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched(true);
    const validationError = email(emailValue, t("validation.invalidEmail"));
    setError(validationError);
    if (validationError) return;

    setIsSubmitting(true);

    try {
      const result = await forgotPassword(emailValue.trim());
      toast.success(t("auth.forgotPasswordSuccess", { email: result.email }));
    } catch (submissionError) {
      toast.error(
        submissionError instanceof Error
          ? submissionError.message
          : t("auth.forgotPasswordError")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title={t("auth.forgotPasswordTitle")}
        subtitle={t("auth.forgotPasswordSubtitle")}
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
            placeholder={t("auth.email")}
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            error={touched ? error : undefined}
          />

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("auth.sending") : t("auth.sendCode")}
          </AuthPrimaryButton>

          <AuthSecondaryLinkButton href="/login">
            {t("auth.backToLogin")}
          </AuthSecondaryLinkButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
