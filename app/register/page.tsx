"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthDivider,
  AuthFooterLine,
  AuthGoogleButton,
  AuthInput,
  AuthPrimaryButton,
  AuthSelect,
  AuthShell,
  AuthSocialLinks,
  PasswordRulesChecklist,
  PasswordStrengthBar,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";
import { getDashboardRoute } from "@/libs/auth-routing";
import {
  email,
  getPasswordStrength,
  match,
  numeric,
  required,
  validatePasswordStrength,
} from "@/app/libs/validation";

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  governorate: string;
  street: string;
  gender: "male" | "female";
};

type RegisterFormErrors = Partial<Record<keyof RegisterFormState, string>>;
type RegisterFormTouched = Partial<Record<keyof RegisterFormState, boolean>>;

const INITIAL_STATE: RegisterFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  governorate: "",
  street: "",
  gender: "male",
};

function validateRegister(values: RegisterFormState, t: (key: string) => string): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  const nameError = required(values.name, t("validation.nameRequired"));
  if (nameError) errors.name = nameError;

  const emailError = email(values.email, t("validation.invalidEmail"));
  if (emailError) errors.email = emailError;

  const passwordError = validatePasswordStrength(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = match(
    values.password,
    values.confirmPassword,
    t("validation.passwordMismatch")
  );
  if (confirmError && values.confirmPassword)
    errors.confirmPassword = confirmError;

  const ageError = numeric(values.age, t("validation.ageNumeric"));
  if (ageError) errors.age = ageError;

  const govError = required(values.governorate, t("validation.governorateRequired"));
  if (govError) errors.governorate = govError;

  const streetError = required(values.street, t("validation.streetRequired"));
  if (streetError) errors.street = streetError;

  return errors;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<RegisterFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof RegisterFormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof RegisterFormState) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const fieldErrors = validateRegister(formData, t);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRegister(formData, t);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
      governorate: true,
      street: true,
      gender: true,
    });

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
      const response = await register({
        role: "user",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: "غير محدد",
        address: `${formData.governorate.trim()} - ${formData.street.trim()}`,
        password: formData.password,
      });
      toast.success(t("auth.registerSuccess"));
      router.replace(getDashboardRoute(response.user.role));
    } catch (submissionError) {
      toast.error(
        submissionError instanceof Error
          ? submissionError.message
          : t("auth.registerError")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title={t("auth.registerWelcome")}
        subtitle={t("auth.registerSubtitle")}
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text={t("auth.haveAccount")}
              linkLabel={t("auth.login")}
              href="/login"
            />
            <AuthFooterLine
              text={t("auth.haveAccountRecover")}
              linkLabel={t("auth.accountRecovery")}
              href="/recover-account"
            />
            <AuthSocialLinks />
          </div>
        }
      >
        <AuthGoogleButton />
        <AuthDivider text={t("auth.orLoginWith")} />

        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <AuthInput
            type="text"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder={t("auth.name")}
            rightIcon={<User className="h-4 w-4" />}
            autoComplete="name"
            error={touched.name ? errors.name : undefined}
          />

          <AuthInput
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder={t("auth.email")}
            rightIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            error={touched.email ? errors.email : undefined}
          />

          <div>
            <AuthInput
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) =>
                handleChange("password", event.target.value)
              }
              onBlur={() => handleBlur("password")}
              placeholder={t("auth.password")}
              rightIcon={<Lock className="relative h-4 w-4 bottom-2" />}
              leftIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-[#B6BCC5] pb-4"
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
            rightIcon={<Lock className="h-4 w-4 relative" />}
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
                  <EyeOff className="h-4 w-4 relative" />
                ) : (
                  <Eye className="h-4 w-4 relative" />
                )}
              </button>
            }
            autoComplete="new-password"
            error={
              touched.confirmPassword ? errors.confirmPassword : undefined
            }
          />

          <AuthInput
            type="text"
            inputMode="numeric"
            value={formData.age}
            onChange={(event) => handleChange("age", event.target.value)}
            onBlur={() => handleBlur("age")}
            placeholder={t("auth.age")}
            error={touched.age ? errors.age : undefined}
          />

          <div className="grid grid-cols-[1fr_1.2fr] gap-2">
            <AuthSelect
              value={formData.governorate}
              onChange={(event) =>
                handleChange("governorate", event.target.value)
              }
              onBlur={() => handleBlur("governorate")}
              error={touched.governorate ? errors.governorate : undefined}
            >
              <option value="">{t("auth.governorate")}</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الدقهلية">الدقهلية</option>
            </AuthSelect>

            <AuthInput
              type="text"
              value={formData.street}
              onChange={(event) =>
                handleChange("street", event.target.value)
              }
              onBlur={() => handleBlur("street")}
              placeholder={t("auth.street")}
              error={touched.street ? errors.street : undefined}
            />
          </div>

          <div className="space-y-2">
            <p className="text-right text-[13px] font-semibold text-[#4B4B4B]">
              {t("auth.gender")}:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleChange("gender", "female")}
                className="flex h-10 items-center justify-center gap-2 rounded-sm border border-[#E7E7E7] text-[13px] text-[#4D4D4D]"
              >
                <span
                  className={`relative h-3.5 w-3.5 rounded-full border ${
                    formData.gender === "female"
                      ? "border-[#FF6A00]"
                      : "border-[#A8A8A8]"
                  }`}
                >
                  {formData.gender === "female" ? (
                    <span className="absolute inset-0.75 rounded-full bg-[#FF6A00]" />
                  ) : null}
                </span>
                <span>{t("auth.female")}</span>
              </button>

              <button
                type="button"
                onClick={() => handleChange("gender", "male")}
                className="flex h-10 items-center justify-center gap-2 rounded-sm border border-[#E7E7E7] text-[13px] text-[#4D4D4D]"
              >
                <span
                  className={`relative h-3.5 w-3.5 rounded-full border ${
                    formData.gender === "male"
                      ? "border-[#FF6A00]"
                      : "border-[#A8A8A8]"
                  }`}
                >
                  {formData.gender === "male" ? (
                    <span className="absolute inset-0.75 rounded-full bg-[#FF6A00]" />
                  ) : null}
                </span>
                <span>{t("auth.male")}</span>
              </button>
            </div>
          </div>

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("auth.creatingAccount") : t("auth.register")}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
