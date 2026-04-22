"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Loader2,
  User,
  Mail,
  Phone,
  Tag,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const t = useTranslations("Contact");
  const [sending, setSending] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSending(true);

      const form = e.currentTarget;
      const data = new FormData(form);
      const name = data.get("name") as string;
      const email = data.get("email") as string;
      const phone = data.get("phone") as string;
      const subject = data.get("subject") as string;
      const message = data.get("message") as string;

      const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`;
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;

      setTimeout(() => setSending(false), 2000);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <Field
        id="name"
        name="name"
        icon={User}
        label={t("formName")}
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <Field
          id="email"
          name="email"
          type="email"
          icon={Mail}
          label={t("formEmail")}
          required
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          icon={Phone}
          label={t("formPhone")}
        />
      </div>
      <Field
        id="subject"
        name="subject"
        icon={Tag}
        label={t("formSubject")}
        required
      />
      <TextField
        id="message"
        name="message"
        icon={MessageSquareText}
        label={t("formMessage")}
        required
      />

      <Button
        type="submit"
        disabled={sending}
        size="cta"
        className="group mt-4"
      >
        {sending ? (
          <>
            <Loader2 className="animate-spin" />
            {t("formSending")}
          </>
        ) : (
          <>
            {t("formSend")}
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </>
        )}
      </Button>
    </form>
  );
};

type FieldProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  icon: LucideIcon;
  required?: boolean;
};

const Field = ({ id, name, type = "text", label, icon: Icon, required }: FieldProps) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-ink mb-2"
    >
      {label}
      {required && (
        <span
          aria-hidden
          className="inline-block size-1 rounded-full bg-brand/70"
        />
      )}
    </label>
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 size-4 text-muted-ink/70 transition-colors duration-300 group-focus-within:text-brand"
        strokeWidth={1.75}
      />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="peer w-full bg-transparent border-0 border-b border-ink/15 py-2.5 pl-7 pr-2 text-[15px] text-ink caret-brand placeholder-muted-ink/60 focus:outline-none focus:ring-0 transition-colors duration-300"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100"
      />
    </div>
  </div>
);

const TextField = ({ id, name, label, icon: Icon, required }: FieldProps) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-ink mb-2"
    >
      {label}
      {required && (
        <span
          aria-hidden
          className="inline-block size-1 rounded-full bg-brand/70"
        />
      )}
    </label>
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-0 top-3 size-4 text-muted-ink/70 transition-colors duration-300 group-focus-within:text-brand"
        strokeWidth={1.75}
      />
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        className="peer w-full bg-transparent border-0 border-b border-ink/15 py-2.5 pl-7 pr-2 text-[15px] text-ink caret-brand placeholder-muted-ink/60 focus:outline-none focus:ring-0 transition-colors duration-300 resize-none"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100"
      />
    </div>
  </div>
);
