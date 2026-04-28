"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthDivider,
  AuthFooterLine,
  AuthGoogleButton,
  AuthInput,
  AuthPrimaryButton,
  AuthShell,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";
import { getDashboardRoute } from "@/libs/auth-routing";
import { email, required } from "@/app/libs/validation";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;
type LoginFormTouched = Partial<Record<keyof LoginFormData, boolean>>;

function validateLogin(values: LoginFormData, t: (key: string) => string): LoginFormErrors {
  const errors: LoginFormErrors = {};
  const emailError = email(values.email, t("validation.invalidEmail"));
  if (emailError) errors.email = emailError;

  const passwordError = required(values.password, t("validation.passwordRequired"));
  if (passwordError) errors.password = passwordError;

  return errors;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<LoginFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof LoginFormData) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const fieldErrors = validateLogin(formData, t);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLogin(formData, t);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      toast.success(t("auth.loginSuccess"));
      router.replace(getDashboardRoute(response.user.role));
    } catch (submissionError) {
      toast.error(
        submissionError instanceof Error
          ? submissionError.message
          : t("auth.loginError")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title={t("auth.loginWelcome")}
        subtitle={t("auth.loginSubtitle")}
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text={t("auth.noAccount")}
              linkLabel={t("auth.register")}
              href="/register"
            />
            <AuthFooterLine
              text={t("auth.haveAccountRecover")}
              linkLabel={t("auth.accountRecovery")}
              href="/recover-account"
            />
          </div>
        }
      >
        <AuthGoogleButton />
        <AuthDivider text={t("auth.orLoginWith")} />

        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <AuthInput
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder={t("auth.email")}
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            error={touched.email ? errors.email : undefined}
          />

          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder={t("auth.password")}
            rightIcon={<Lock className="h-4 w-4" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-[#B6BCC5]"
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            autoComplete="current-password"
            error={touched.password ? errors.password : undefined}
          />

          <div className="text-left">
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-[#4C8BFF] hover:underline"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("auth.loggingIn") : t("auth.loginAction")}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
