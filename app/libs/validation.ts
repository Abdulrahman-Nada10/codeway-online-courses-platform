import i18n from "@/i18n";

function translate(
  key: string,
  defaultValue: string,
  options?: Record<string, unknown>
) {
  return i18n.t(key, { defaultValue, ...options });
}

export function required(
  value: string,
  message = translate("validation.required", "This field is required")
): string | undefined {
  if (!value || !value.trim()) {
    return message;
  }

  return undefined;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(
  value: string,
  message = translate("validation.invalidEmail", "Invalid email")
): string | undefined {
  if (!value || !value.trim()) {
    return translate("validation.emailRequired", "Email is required");
  }

  if (!EMAIL_REGEX.test(value.trim())) {
    return message;
  }

  return undefined;
}

export function minLength(
  value: string,
  min: number,
  message = translate("validation.minLength", "Minimum {{count}} characters", {
    count: min,
  })
): string | undefined {
  if (!value || value.length < min) {
    return message;
  }

  return undefined;
}

export function match(
  value1: string,
  value2: string,
  message = translate("validation.passwordMismatch", "Passwords do not match")
): string | undefined {
  if (value1 !== value2) {
    return message;
  }

  return undefined;
}

export function numeric(
  value: string,
  message = translate("validation.numericOnly", "Numbers only")
): string | undefined {
  if (!value || !/^\d+$/.test(value.trim())) {
    return message;
  }

  return undefined;
}

export type PasswordStrength = "weak" | "medium" | "strong";

export interface PasswordRule {
  key: string;
  label: string;
  met: boolean;
}

const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export function getPasswordStrengthDetails(password: string): PasswordRule[] {
  return [
    {
      key: "length",
      label: translate(
        "validation.passwordRuleLength",
        "At least 8 characters"
      ),
      met: password.length >= 8,
    },
    {
      key: "uppercase",
      label: translate(
        "validation.passwordRuleUppercase",
        "Uppercase letter (A-Z)"
      ),
      met: /[A-Z]/.test(password),
    },
    {
      key: "lowercase",
      label: translate(
        "validation.passwordRuleLowercase",
        "Lowercase letter (a-z)"
      ),
      met: /[a-z]/.test(password),
    },
    {
      key: "number",
      label: translate("validation.passwordRuleNumber", "Number (0-9)"),
      met: /\d/.test(password),
    },
    {
      key: "special",
      label: translate(
        "validation.passwordRuleSpecial",
        "Special character (!@#$...)"
      ),
      met: SPECIAL_CHARS_REGEX.test(password),
    },
  ];
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return "weak";
  }

  const rules = getPasswordStrengthDetails(password);
  const metCount = rules.filter((rule) => rule.met).length;

  if (metCount <= 2) {
    return "weak";
  }

  if (metCount <= 4) {
    return "medium";
  }

  return "strong";
}

export function validatePasswordStrength(password: string): string | undefined {
  if (getPasswordStrength(password) === "weak") {
    return translate(
      "validation.passwordRequirements",
      "Password must contain uppercase, lowercase, number, and symbol"
    );
  }

  return undefined;
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case "weak":
      return translate("validation.passwordWeak", "Weak password");
    case "medium":
      return translate("validation.passwordMedium", "Medium password");
    case "strong":
      return translate("validation.passwordStrong", "Strong password");
  }
}

export type FieldErrors<Keys extends string> = Partial<Record<Keys, string>>;

export type TouchedFields<Keys extends string> = Partial<
  Record<Keys, boolean>
>;
