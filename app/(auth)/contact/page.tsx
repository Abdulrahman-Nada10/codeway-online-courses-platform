"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4 max-w-md mx-auto mt-10">

      {/* Logo */}
      <div className="pb-4 flex items-center justify-center">
        <div className="w-20 h-14 sm:w-22 sm:h-16 flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="شعار الموقع"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center text-xl font-bold text-[var(--primary)] mb-2">
        الشكاوي والاقتراحات
      </h2>

     

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="الاسم"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-3 p-3 rounded-lg bg-[var(--input-bg)] outline-none"
      />
      {errors.name && <p className="text-xs text-red-500 mb-2">{errors.name}</p>}

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="البريد الإلكتروني"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-3 p-3 rounded-lg bg-[var(--input-bg)] outline-none"
      />
      {errors.email && <p className="text-xs text-red-500 mb-2">{errors.email}</p>}

      {/* Message */}
      <textarea
        name="message"
        placeholder="اكتب رسالتك..."
        value={formData.message}
        onChange={handleChange}
        className="w-full mb-3 p-3 rounded-lg bg-[var(--input-bg)] h-32 resize-none outline-none"
      />
      {errors.message && (
        <p className="text-xs text-red-500 mb-2">{errors.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[var(--primary)] hover:brightness-90 text-white py-3 rounded-lg font-semibold transition"
      >
        إرسال
      </button>

      

    </form>
  );
}