import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  X,
  Youtube,
} from "lucide-react";
import {
  getPasswordStrength,
  getPasswordStrengthDetails,
  getPasswordStrengthLabel,
  type PasswordStrength,
} from "@/app/libs/validation";
import { useLocaleDirection } from "@/app/hooks/useLocaleDirection";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseFieldClasses =
  "h-10 w-full rounded-[4px] border border-[#E7E7E7] bg-white text-start text-[13px] text-[#6B7280] placeholder:text-[#D6D6D6] outline-none transition focus:border-[#FF6A00] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  cardClassName?: string;
};

type FieldState = 'error' | 'success' | 'default';

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
};

type AuthTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rightIcon?: ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
};

type AuthSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
};

export function AuthShell({
  title,
  subtitle,
  icon,
  children,
  footer,
  cardClassName,
}: AuthShellProps) {
  const { dir } = useLocaleDirection();

  return (
    <div
      className="min-h-screen bg-[#FFF6F0] px-4 py-10 dark:bg-slate-950 sm:flex sm:items-center sm:justify-center"
      dir={dir}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-108 rounded-[14px] border border-white/80 bg-white px-4 py-7 shadow-[0_16px_34px_rgba(255,106,0,0.14)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_16px_34px_rgba(0,0,0,0.35)] sm:px-6",
          cardClassName
        )}
      >
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="EGC"
              width={86}
              height={38}
              className="h-auto w-21.5"
              priority
            />
          </div>

          {icon ? <div className="mt-6 flex justify-center">{icon}</div> : null}

          <h1 className="mt-6 text-[18px] font-bold leading-8 text-[#FF6A00] sm:text-[19px]">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-1 text-[11px] font-medium text-[#FF8D45]">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-5">{children}</div>

        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </div>
  );
}

export function AuthGoogleButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      {...props}
      className={cn(
        "flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-[#E7E7E7] bg-white text-[12px] font-semibold text-[#222] transition hover:bg-[#FFF8F2] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        props.className
      )}
    >
      <GoogleIcon />
      <span>{t("auth.continueWithGoogle")}</span>
    </button>
  );
}

export function AuthDivider({ text }: { text: string }) {
  return (
    <div className="my-4 flex items-center gap-3 text-[10px] text-[#B6B6B6]">
      <span className="h-px flex-1 bg-[#C7D2E0]" />
      <span>{text}</span>
      <span className="h-px flex-1 bg-[#C7D2E0]" />
    </div>
  );
}

function getFieldState(error?: string, success?: string): FieldState {
  if (error) return 'error';
  if (success) return 'success';
  return 'default';
}

function FieldMessage({
  error,
  success,
  helperText,
}: {
  error?: string;
  success?: string;
  helperText?: string;
}) {
  const message = error || success || helperText;
  if (!message) return null;

  return (
    <p
      className={cn(
        'mt-1 text-start text-[11px] font-medium transition-all duration-300 ease-out animate-fade-in-up',
        error && 'text-red-500',
        success && 'text-green-600',
        !error && !success && 'text-gray-400'
      )}
    >
      {message}
    </p>
  );
}

/* ─────────────── Password Strength Bar ─────────────── */

const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  weak: 'bg-red-500',
  medium: 'bg-yellow-500',
  strong: 'bg-green-500',
};

const STRENGTH_BORDER_COLORS: Record<PasswordStrength, string> = {
  weak: 'border-red-400',
  medium: 'border-yellow-400',
  strong: 'border-green-400',
};

const STRENGTH_BG_COLORS: Record<PasswordStrength, string> = {
  weak: 'bg-red-50/40',
  medium: 'bg-yellow-50/40',
  strong: 'bg-green-50/40',
};

const STRENGTH_TEXT_COLORS: Record<PasswordStrength, string> = {
  weak: 'text-red-600',
  medium: 'text-yellow-600',
  strong: 'text-green-600',
};

export function PasswordStrengthBar({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const details = getPasswordStrengthDetails(password);
  const metCount = details.filter((r) => r.met).length;
  const progress = password ? (metCount / details.length) * 100 : 0;

  return (
    <div className="mt-2 space-y-2 animate-fade-in-up">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            STRENGTH_COLORS[strength]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p
        className={cn(
          'text-start text-[11px] font-semibold transition-colors duration-300',
          STRENGTH_TEXT_COLORS[strength]
        )}
      >
        {getPasswordStrengthLabel(strength)}
      </p>
    </div>
  );
}

/* ─────────────── Password Rules Checklist ─────────────── */

export function PasswordRulesChecklist({ password }: { password: string }) {
  const details = getPasswordStrengthDetails(password);

  if (!password) return null;

  return (
    <ul className="mt-2 space-y-1 animate-fade-in-up">
      {details.map((rule) => (
        <li
          key={rule.key}
          className={cn(
            'flex items-center gap-1.5 text-start text-[11px] font-medium transition-colors duration-300',
            rule.met ? 'text-green-600' : 'text-gray-400'
          )}
        >
          {rule.met ? (
            <Check className="h-3 w-3 shrink-0" />
          ) : (
            <X className="h-3 w-3 shrink-0" />
          )}
          <span>{rule.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Helpers for dynamic border coloring ─────────────── */

export function getPasswordBorderClasses(password: string): string {
  const strength = getPasswordStrength(password);
  if (!password) return '';
  return cn(STRENGTH_BORDER_COLORS[strength], STRENGTH_BG_COLORS[strength]);
}

export { STRENGTH_BORDER_COLORS, STRENGTH_BG_COLORS };

/* ─────────────── AuthInput ─────────────── */

export function AuthInput({
  leftIcon,
  rightIcon,
  className,
  error,
  success,
  helperText,
  ...props
}: AuthInputProps) {
  const state = getFieldState(error, success);

  return (
    <div className="relative">
      <input
        {...props}
        className={cn(
          baseFieldClasses,
          rightIcon ? 'rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3' : 'px-3',
          leftIcon ? 'rtl:pl-10 ltr:pr-10' : '',
          state === 'error' && 'border-red-400 bg-red-50/40 text-red-900 placeholder:text-red-300',
          state === 'success' && 'border-green-400 bg-green-50/40 text-green-900 placeholder:text-green-300',
          className
        )}
      />

      {rightIcon ? (
        <span className="pointer-events-none absolute inset-y-0 rtl:right-3 ltr:left-3 flex items-center text-[#B6BCC5]">
          {rightIcon}
        </span>
      ) : null}

      {leftIcon ? (
        <span className="absolute inset-y-0 rtl:left-3 ltr:right-3 flex items-center text-[#B6BCC5]">
          {leftIcon}
        </span>
      ) : null}

      <FieldMessage error={error} success={success} helperText={helperText} />
    </div>
  );
}

export function AuthSelect({
  className,
  children,
  error,
  success,
  helperText,
  ...props
}: AuthSelectProps) {
  const state = getFieldState(error, success);

  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          baseFieldClasses,
          'appearance-none rtl:pr-3 rtl:pl-9 ltr:pl-3 ltr:pr-9 text-[#A1A1AA]',
          state === 'error' && 'border-red-400 bg-red-50/40 text-red-900',
          state === 'success' && 'border-green-400 bg-green-50/40 text-green-900',
          className
        )}
      >
        {children}
      </select>

      <span className="pointer-events-none absolute inset-y-0 rtl:left-3 ltr:right-3 flex items-center text-[#7C7C7C]">
        <ChevronDown className="h-4 w-4" />
      </span>

      <FieldMessage error={error} success={success} helperText={helperText} />
    </div>
  );
}

export function AuthTextarea({
  rightIcon,
  className,
  error,
  success,
  helperText,
  ...props
}: AuthTextareaProps) {
  const state = getFieldState(error, success);

  return (
    <div className="relative">
      <textarea
        {...props}
        className={cn(
          'min-h-21.5 w-full resize-none rounded-sm border border-[#E7E7E7] bg-white px-3 py-3 text-start text-[13px] text-[#6B7280] placeholder:text-[#D6D6D6] outline-none transition focus:border-[#FF6A00] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          rightIcon ? 'rtl:pr-10 ltr:pl-10' : '',
          state === 'error' && 'border-red-400 bg-red-50/40 text-red-900 placeholder:text-red-300',
          state === 'success' && 'border-green-400 bg-green-50/40 text-green-900 placeholder:text-green-300',
          className
        )}
      />

      {rightIcon ? (
        <span className="pointer-events-none absolute rtl:right-3 ltr:left-3 top-3 text-[#B6BCC5]">
          {rightIcon}
        </span>
      ) : null}

      <FieldMessage error={error} success={success} helperText={helperText} />
    </div>
  );
}

export function AuthPrimaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={cn(
        "h-10 w-full rounded-sm bg-[#FF6A00] text-[13px] font-bold text-white transition hover:bg-[#F06100] disabled:cursor-not-allowed disabled:opacity-70",
        props.className
      )}
    />
  );
}

export function AuthSecondaryLinkButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-10 w-full items-center justify-center rounded-sm border border-[#FFB07E] bg-white text-[13px] font-bold text-[#5D5D5D] transition hover:bg-[#FFF8F2] dark:border-[#A85C34] dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

export function AuthMessage({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md px-3 py-2 text-start text-[12px]",
        tone === "error"
          ? "bg-red-50 text-red-600"
          : "bg-green-50 text-green-700"
      )}
    >
      {children}
    </div>
  );
}

export function AuthFooterLine({
  text,
  linkLabel,
  href,
  linkColor = "orange",
}: {
  text: string;
  linkLabel: string;
  href: string;
  linkColor?: "orange" | "blue";
}) {
  return (
    <p className="text-center text-[12px] text-[#8E8E8E]">
      {text}{" "}
      <Link
        href={href}
        className={cn(
          "font-semibold hover:underline",
          linkColor === "blue" ? "text-[#4C8BFF]" : "text-[#FF6A00]"
        )}
      >
        {linkLabel}
      </Link>
    </p>
  );
}

export function AuthSocialLinks() {
  const { t } = useTranslation();
  const iconClassName = "h-4 w-4 stroke-[2.2px]";

  return (
    <div className="mt-3 flex items-center justify-center gap-4 text-[#FF6A00]">
      <a
        target="_blank"
        rel="noopener"
        aria-label={t("social.linkedin")}
      >
        <Linkedin className={iconClassName} />
      </a>
      <a
        target="_blank"
        rel="noopener"
        aria-label={t("social.facebook")}
      >
        <Facebook className={iconClassName} />
      </a>
      <a
        target="_blank"
        rel="noopener"
        aria-label={t("social.youtube")}
      >
        <Youtube className={iconClassName} />
      </a>
      <a
        target="_blank"
        rel="noopener"
        aria-label={t("social.instagram")}
      >
        <Instagram className={iconClassName} />
      </a>
    </div>
  );
}

export function AuthBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#FF6A00] text-[#10365A] shadow-[0_8px_18px_rgba(255,106,0,0.26)]">
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.23h5.4a4.62 4.62 0 0 1-2 3.03v2.52h3.24c1.9-1.75 2.96-4.33 2.96-7.55Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.58-4.1H3.08v2.6A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.42 13.9A5.98 5.98 0 0 1 6.1 12c0-.66.12-1.3.32-1.9V7.5H3.08A10 10 0 0 0 2 12c0 1.61.39 3.14 1.08 4.5l3.34-2.6Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.98c1.47 0 2.78.5 3.82 1.47l2.87-2.87C16.95 2.96 14.7 2 12 2A10 10 0 0 0 3.08 7.5l3.34 2.6C7.2 7.73 9.4 5.98 12 5.98Z"
        fill="#EA4335"
      />
    </svg>
  );
}

