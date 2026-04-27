"use client";

import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, Lock, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
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

function validateReset(values: ResetFormData): ResetFormErrors {
  const errors: ResetFormErrors = {};

  const passwordError = validatePasswordStrength(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = match(
    values.password,
    values.confirmPassword,
    "كلمتا المرور غير متطابقتين"
  );
  if (confirmError && values.confirmPassword)
    errors.confirmPassword = confirmError;

  return errors;
}

function ResetPasswordContent() {
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
    const fieldErrors = validateReset(formData);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("رابط إعادة التعيين غير صالح.");
      return;
    }

    const validationErrors = validateReset(formData);
    setErrors(validationErrors);
    setTouched({ password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (getPasswordStrength(formData.password) === "weak") {
      setErrors((current) => ({
        ...current,
        password: "من فضلك أدخل كلمة مرور أقوى",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: formData.password });
      toast.success(
        "تم تحديث كلمة المرور بنجاح. سيتم تحويلك إلى صفحة الدخول."
      );
      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (submissionError) {
      toast.error(
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
      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        <div>
          <AuthInput
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) =>
              handleChange("password", event.target.value)
            }
            onBlur={() => handleBlur("password")}
            placeholder="كلمة المرور الجديدة"
            rightIcon={<Lock className="h-4 w-4" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-[#B6BCC5]"
                aria-label={
                  showPassword
                    ? "إخفاء كلمة المرور"
                    : "إظهار كلمة المرور"
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
            helperText="8 أحرف على الأقل، حرف كبير، صغير، رقم، ورمز"
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
          placeholder="تأكيد كلمة المرور"
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
          error={
            touched.confirmPassword ? errors.confirmPassword : undefined
          }
        />

        <AuthPrimaryButton
          type="submit"
          disabled={isSubmitting || !token}
        >
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
      <div className="text-center text-[12px] text-[#A0A0A0]">
        جاري التحميل...
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

