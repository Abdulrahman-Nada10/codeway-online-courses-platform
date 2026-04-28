"use client";

import { FormEvent, useState } from "react";
import { Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthShell,
  AuthTextarea,
} from "@/app/components/auth/AuthUi";

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitted(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t("contact.requiredFields"));
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <AuthShell title={t("contact.title")}>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("auth.name")}
          rightIcon={<User className="h-4 w-4" />}
        />

        <AuthInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("auth.email")}
          rightIcon={<Mail className="h-4 w-4" />}
        />

        <AuthTextarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t("contact.messagePlaceholder")}
        />

        {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

        {submitted ? (
          <AuthMessage tone="success">{t("contact.success")}</AuthMessage>
        ) : null}

        <AuthPrimaryButton type="submit">{t("common.send")}</AuthPrimaryButton>
      </form>
    </AuthShell>
  );
}
