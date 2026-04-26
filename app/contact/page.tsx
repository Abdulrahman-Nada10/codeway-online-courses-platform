"use client";

import { FormEvent, useState } from "react";
import { Mail, User } from "lucide-react";
import {
  AuthInput,
  AuthMessage,
  AuthPrimaryButton,
  AuthShell,
  AuthTextarea,
} from "@/app/components/auth/AuthUi";

export default function ContactPage() {
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
      setError("أكمل جميع الحقول المطلوبة.");
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <AuthShell title="الشكاوي والإقتراحات">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <AuthInput
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="الأسم"
          rightIcon={<User className="h-4 w-4" />}
        />

        <AuthInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="البريد الإلكتروني"
          rightIcon={<Mail className="h-4 w-4" />}
        />

        <AuthTextarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="اكتب النص...."
        />

        {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

        {submitted ? (
          <AuthMessage tone="success">تم إرسال رسالتك بنجاح.</AuthMessage>
        ) : null}

        <AuthPrimaryButton type="submit">إرسال</AuthPrimaryButton>
      </form>
    </AuthShell>
  );
}
