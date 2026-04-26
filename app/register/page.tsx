"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthDivider,
  AuthFooterLine,
  AuthGoogleButton,
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthSelect,
  AuthShell,
  AuthSocialLinks,
} from "@/app/components/auth/AuthUi";
import { useAuth } from "@/app/hooks/useAuth";

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

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormState>(INITIAL_STATE);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.age.trim() ||
      !formData.governorate.trim() ||
      !formData.street.trim() ||
      !formData.password.trim()
    ) {
      setError("أكمل جميع الحقول المطلوبة.");
      return;
    }

    if (!/^\d+$/.test(formData.age.trim())) {
      setError("أدخل السن بشكل صحيح.");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("تأكيد كلمة المرور غير مطابق.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        role: "user",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: "غير محدد",
        address: `${formData.governorate.trim()} - ${formData.street.trim()}`,
        password: formData.password,
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "تعذر إنشاء الحساب. حاول مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <AuthShell
        title="إنشاء حساب جديد"
        subtitle="انضم لأكثر من 50,000 متعلم"
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text="لديك حساب بالفعل؟"
              linkLabel="تسجيل الدخول"
              href="/login"
            />
            <AuthFooterLine
              text="هل لديك حساب وتريد استرجاعه؟"
              linkLabel="استرجاع حساب"
              href="/recover-account"
            />
            <AuthSocialLinks />
          </div>
        }
      >
        <AuthGoogleButton />
        <AuthDivider text="أو تسجل الدخول ببياناتك الشخصية" />

        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="الأسم"
            rightIcon={<User className="h-4 w-4" />}
            autoComplete="name"
          />

          <AuthInput
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
            autoComplete="new-password"
          />

          <AuthInput
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
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

          <AuthInput
            type="text"
            inputMode="numeric"
            value={formData.age}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                age: event.target.value,
              }))
            }
            placeholder="السن"
          />

          <div className="grid grid-cols-[1fr_1.2fr] gap-2">
            <AuthSelect
              value={formData.governorate}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  governorate: event.target.value,
                }))
              }
            >
              <option value="">المحافظة</option>
              <option value="القاهرة">القاهرة</option>
              <option value="الجيزة">الجيزة</option>
              <option value="الإسكندرية">الإسكندرية</option>
              <option value="الدقهلية">الدقهلية</option>
            </AuthSelect>

            <AuthInput
              type="text"
              value={formData.street}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  street: event.target.value,
                }))
              }
              placeholder="المنطقة/الشارع"
            />
          </div>

          <div className="space-y-2">
            <p className="text-right text-[13px] font-semibold text-[#4B4B4B]">
              النوع:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((current) => ({
                    ...current,
                    gender: "female",
                  }))
                }
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
                <span>أنثى</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((current) => ({
                    ...current,
                    gender: "male",
                  }))
                }
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
                <span>ذكر</span>
              </button>
            </div>
          </div>

          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
