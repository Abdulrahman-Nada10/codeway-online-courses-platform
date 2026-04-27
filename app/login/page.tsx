"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
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
import { email, required } from "@/app/libs/validation";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;
type LoginFormTouched = Partial<Record<keyof LoginFormData, boolean>>;

function validateLogin(values: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {};
  const emailError = email(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = required(values.password, "كلمة المرور مطلوبة");
  if (passwordError) errors.password = passwordError;

  return errors;
}

export default function LoginPage() {
  const { login } = useAuth();
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
    // Clear error while typing
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
    const fieldErrors = validateLogin(formData);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (submissionError) {
      toast.error(
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

        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <AuthInput
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="البريد الإلكتروني"
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
            error={touched.password ? errors.password : undefined}
          />

          <div className="text-left">
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-[#4C8BFF] hover:underline"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الدخول..." : "دخول"}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}

