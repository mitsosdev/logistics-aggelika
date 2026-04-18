"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { BUSINESS } from "@/lib/general/constants";

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
      <Field id="name" name="name" label={t("formName")} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <Field id="email" name="email" type="email" label={t("formEmail")} required />
        <Field id="phone" name="phone" type="tel" label={t("formPhone")} />
      </div>
      <Field id="subject" name="subject" label={t("formSubject")} required />
      <TextField id="message" name="message" label={t("formMessage")} required />

      <button
        type="submit"
        disabled={sending}
        className="group mt-4 inline-flex items-center gap-2 bg-ink text-ivory text-[14px] font-medium px-6 py-3.5 rounded-sm hover:bg-emerald-brand transition-colors duration-300 cursor-pointer disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("formSending")}
          </>
        ) : (
          <>
            {t("formSend")}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </>
        )}
      </button>
    </form>
  );
};

type FieldProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  required?: boolean;
};

const Field = ({ id, name, type = "text", label, required }: FieldProps) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="block text-[10px] uppercase tracking-[0.15em] text-muted-ink mb-2"
    >
      {label}
      {required ? " *" : ""}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className="peer w-full bg-transparent border-0 border-b-2 border-ink/15 py-2.5 text-[15px] text-ink placeholder-muted-ink/60 focus:border-emerald-brand focus:outline-none focus:ring-0 transition-colors duration-300"
    />
  </div>
);

const TextField = ({ id, name, label, required }: FieldProps) => (
  <div className="group relative">
    <label
      htmlFor={id}
      className="block text-[10px] uppercase tracking-[0.15em] text-muted-ink mb-2"
    >
      {label}
      {required ? " *" : ""}
    </label>
    <textarea
      id={id}
      name={name}
      required={required}
      rows={4}
      className="peer w-full bg-transparent border-0 border-b-2 border-ink/15 py-2.5 text-[15px] text-ink placeholder-muted-ink/60 focus:border-emerald-brand focus:outline-none focus:ring-0 transition-colors duration-300 resize-none"
    />
  </div>
);
