

export function required(value: string, message = 'هذا الحقل مطلوب'): string | undefined {
  if (!value || !value.trim()) {
    return message;
  }
  return undefined;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(value: string, message = 'البريد الإلكتروني غير صحيح'): string | undefined {
  if (!value || !value.trim()) {
    return 'البريد الإلكتروني مطلوب';
  }
  if (!EMAIL_REGEX.test(value.trim())) {
    return message;
  }
  return undefined;
}

export function minLength(
  value: string,
  min: number,
  message = `يجب أن يكون ${min} أحرف على الأقل`
): string | undefined {
  if (!value || value.length < min) {
    return message;
  }
  return undefined;
}

export function match(
  value1: string,
  value2: string,
  message = 'كلمتا المرور غير متطابقتين'
): string | undefined {
  if (value1 !== value2) {
    return message;
  }
  return undefined;
}

export function numeric(value: string, message = 'يجب إدخال أرقام فقط'): string | undefined {
  if (!value || !/^\d+$/.test(value.trim())) {
    return message;
  }
  return undefined;
}

/* ─────────────── Password Strength ─────────────── */

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordRule {
  key: string;
  label: string;
  met: boolean;
}

const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export function getPasswordStrengthDetails(password: string): PasswordRule[] {
  return [
    { key: 'length', label: '8 أحرف على الأقل', met: password.length >= 8 },
    { key: 'uppercase', label: 'حرف كبير (A-Z)', met: /[A-Z]/.test(password) },
    { key: 'lowercase', label: 'حرف صغير (a-z)', met: /[a-z]/.test(password) },
    { key: 'number', label: 'رقم (0-9)', met: /\d/.test(password) },
    { key: 'special', label: 'رمز خاص (!@#$...)', met: SPECIAL_CHARS_REGEX.test(password) },
  ];
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';
  const rules = getPasswordStrengthDetails(password);
  const metCount = rules.filter((r) => r.met).length;

  if (metCount <= 2) return 'weak';
  if (metCount <= 4) return 'medium';
  return 'strong';
}

export function validatePasswordStrength(password: string): string | undefined {
  const strength = getPasswordStrength(password);
  if (strength === 'weak') {
    return 'يجب أن تحتوي كلمة المرور على حرف كبير وصغير ورقم ورمز';
  }
  return undefined;
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'weak':
      return 'كلمة المرور ضعيفة';
    case 'medium':
      return 'كلمة المرور متوسطة';
    case 'strong':
      return 'كلمة المرور قوية';
  }
}

export type FieldErrors<Keys extends string> = Partial<Record<Keys, string>>;

export type TouchedFields<Keys extends string> = Partial<Record<Keys, boolean>>;

