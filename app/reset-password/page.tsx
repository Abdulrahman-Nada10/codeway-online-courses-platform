"use client";

import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthBadge,
  AuthInput,
  AuthPrimaryButton,
  AuthSecondaryLinkButton,
  AuthShell,
  PasswordRulesChecklist,
  PasswordStrengthBar,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";
import {
  getPasswordStrength,
  match,
  validatePasswordStrength,
} from "@/app/libs/validation";

type ResetFormData = {
  password: string;
  confirmPassword: string;
};

type ResetFormErrors = Partial<Record<keyof ResetFormData, string>>;
type ResetFormTouched = Partial<Record<keyof ResetFormData, boolean>>;

function validateReset(values: ResetFormData, t: (key: string) => string): ResetFormErrors {
  const errors: ResetFormErrors = {};

  const passwordError = validatePasswordStrength(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = match(
    values.password,
    values.confirmPassword,
    t("validation.passwordMismatch")
  );
  if (confirmError && values.confirmPassword)
    errors.confirmPassword = confirmError;

  return errors;
}

function ResetPasswordContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState<ResetFormData>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetFormErrors>({});
  const [touched, setTouched] = useState<ResetFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof ResetFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ResetFormData) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const fieldErrors = validateReset(formData, t);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error(t("auth.invalidResetLink"));
      return;
    }

    const validationErrors = validateReset(formData, t);
    setErrors(validationErrors);
    setTouched({ password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (getPasswordStrength(formData.password) === "weak") {
      setErrors((current) => ({
        ...current,
        password: t("auth.enterStrongerPassword"),
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: formData.password });
      toast.success(t("auth.resetPasswordSuccess"));
      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (submissionError) {
      toast.error(
        submissionError instanceof Error
          ? submissionError.message
          : t("auth.resetPasswordError")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title={t("auth.resetPassword")}
      subtitle={t("auth.resetPasswordSubtitle")}
      icon={
        <AuthBadge>
          <LockKeyhole className="h-4 w-4" />
        </AuthBadge>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        <div>
          <AuthInput
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) =>
              handleChange("password", event.target.value)
            }
            onBlur={() => handleBlur("password")}
            placeholder={t("auth.newPassword")}
            rightIcon={<Lock className="h-4 w-4" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-[#B6BCC5]"
                aria-label={
                  showPassword
                    ? t("auth.hidePassword")
                    : t("auth.showPassword")
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            autoComplete="new-password"
            error={touched.password ? errors.password : undefined}
            helperText={t("auth.passwordHint")}
          />
          {formData.password ? (
            <>
              <PasswordStrengthBar password={formData.password} />
              <PasswordRulesChecklist password={formData.password} />
            </>
          ) : null}
        </div>

        <AuthInput
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={(event) =>
            handleChange("confirmPassword", event.target.value)
          }
          onBlur={() => handleBlur("confirmPassword")}
          placeholder={t("auth.confirmPassword")}
          rightIcon={<Lock className="h-4 w-4" />}
          leftIcon={
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((current) => !current)
              }
              className="text-[#B6BCC5]"
              aria-label={
                showConfirmPassword
                  ? t("auth.hideConfirmPassword")
                  : t("auth.showConfirmPassword")
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
          error={
            touched.confirmPassword ? errors.confirmPassword : undefined
          }
        />

        <AuthPrimaryButton
          type="submit"
          disabled={isSubmitting || !token}
        >
          {isSubmitting ? t("auth.saving") : t("common.saveChanges")}
        </AuthPrimaryButton>

        <AuthSecondaryLinkButton href="/login">
          {t("auth.backToLogin")}
        </AuthSecondaryLinkButton>
      </form>
    </AuthShell>
  );
}

function ResetPasswordFallback() {
  const { t } = useTranslation();
  return (
    <AuthShell
      title={t("auth.resetPassword")}
      subtitle={t("common.loading")}
      icon={
        <AuthBadge>
          <LockKeyhole className="h-4 w-4" />
        </AuthBadge>
      }
    >
      <div className="text-center text-[12px] text-[#A0A0A0]">
        {t("common.loading")}
      </div>
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
