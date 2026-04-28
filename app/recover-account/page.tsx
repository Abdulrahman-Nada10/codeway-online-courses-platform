"use client";

import { FormEvent, useState } from "react";
import { ArrowUpToLine, User } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import PublicRoute from "@/app/components/auth/PublicRoute";
import {
  AuthFooterLine,
  AuthInput,
  AuthPrimaryButton,
  AuthShell,
  AuthSocialLinks,
} from "@/app/components/auth/AuthUi";
import { required } from "@/app/libs/validation";

type RecoverFormData = {
  name: string;
  proofType: string;
};

type RecoverFormErrors = Partial<Record<keyof RecoverFormData, string>>;
type RecoverFormTouched = Partial<Record<keyof RecoverFormData, boolean>>;

function validateRecover(values: RecoverFormData, hasFile: boolean, t: (key: string) => string): RecoverFormErrors {
  const errors: RecoverFormErrors = {};

  const nameError = required(values.name, t("validation.familyNameRequired"));
  if (nameError) errors.name = nameError;

  const proofTypeError = required(values.proofType, t("validation.proofTypeRequired"));
  if (proofTypeError) errors.proofType = proofTypeError;

  if (!hasFile) {
    (errors as Record<string, string>).proofFile = t("validation.screenshotRequired");
  }

  return errors;
}

export default function RecoverAccountPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<RecoverFormData>({ name: "", proofType: "" });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<RecoverFormErrors & { proofFile?: string }>({});
  const [touched, setTouched] = useState<RecoverFormTouched & { proofFile?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof RecoverFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof RecoverFormData) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const fieldErrors = validateRecover(formData, Boolean(proofFile), t);
    if (fieldErrors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setProofFile(file);
    setTouched((current) => ({ ...current, proofFile: true }));
    if (errors.proofFile && file) {
      setErrors((current) => {
        const next = { ...current };
        delete next.proofFile;
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRecover(formData, Boolean(proofFile), t);
    setErrors(validationErrors);
    setTouched({ name: true, proofType: true, proofFile: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t("auth.recoverAccountSuccess"));
    }, 450);
  };

  return (
    <PublicRoute>
      <AuthShell
        title={t("auth.recoverAccountTitle")}
        footer={
          <div className="space-y-2">
            <AuthFooterLine
              text={t("auth.haveAccount")}
              linkLabel={t("auth.login")}
              href="/login"
            />
            <AuthFooterLine
              text={t("auth.noAccount")}
              linkLabel={t("auth.register")}
              href="/register"
            />
            <AuthSocialLinks />
          </div>
        }
      >
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <AuthInput
            type="text"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder={t("auth.familyName")}
            rightIcon={<User className="h-4 w-4" />}
            error={touched.name ? errors.name : undefined}
          />

          <AuthInput
            type="text"
            value={formData.proofType}
            onChange={(event) => handleChange("proofType", event.target.value)}
            onBlur={() => handleBlur("proofType")}
            placeholder={t("auth.proofType")}
            error={touched.proofType ? errors.proofType : undefined}
          />

          <div>
            <label
              className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm text-[13px] font-semibold transition ${
                touched.proofFile && errors.proofFile
                  ? "bg-red-100 text-red-600 border border-red-300"
                  : "bg-[#FFD2B7] text-[#FF6A00] hover:bg-[#FFC6A3]"
              }`}
            >
              <ArrowUpToLine className="h-4 w-4" />
              <span>{proofFile ? proofFile.name : t("auth.screenshotUpload")}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
              />
            </label>
            {touched.proofFile && errors.proofFile ? (
              <p className="mt-1 text-right text-[11px] font-medium text-red-500">
                {errors.proofFile}
              </p>
            ) : null}
          </div>

          <AuthPrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("auth.sending") : t("common.send")}
          </AuthPrimaryButton>
        </form>
      </AuthShell>
    </PublicRoute>
  );
}
