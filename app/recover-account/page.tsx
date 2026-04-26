"use client";

import { FormEvent, useState } from "react";
import { ArrowUpToLine, User } from "lucide-react";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthFooterLine,
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthShell,
  AuthSocialLinks,
} from "@/app/components/auth/AuthUi";

export default function RecoverAccountPage() {
  const [name, setName] = useState("");
  const [proofType, setProofType] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    if (!name.trim() || !proofType.trim() || !proofFile) {
      setError("أكمل البيانات وأرفق لقطة الشاشة.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <PublicRoute>
      <AuthShell
        title="بيانات استرجاع الحساب"
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text="لديك حساب بالفعل؟"
              linkLabel="تسجيل الدخول"
              href="/login"
            />
            <AuthFooterLine
              text="ليس لديك حساب؟"
              linkLabel="إنشاء حساب"
              href="/register"
            />
            <AuthSocialLinks />
          </div>
        }
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="اسم عائلتك"
            rightIcon={<User className="h-4 w-4" />}
          />

          <AuthInput
            type="text"
            value={proofType}
            onChange={(event) => setProofType(event.target.value)}
            placeholder="نوع إثباتك"
          />

          <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#FFD2B7] text-[13px] font-semibold text-[#FF6A00] transition hover:bg-[#FFC6A3]">
            <ArrowUpToLine className="h-4 w-4" />
            <span>{proofFile ? proofFile.name : "خذ لقطة شاشة"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => setProofFile(event.target.files?.[0] ?? null)}
            />
          </label>

          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          {submitted ? (
            <AuthMessage tone="success">
              تم إرسال طلب استرجاع الحساب بنجاح.
            </AuthMessage>
          ) : null}

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
