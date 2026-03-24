"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2, User, Mail, Phone, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

      setTimeout(() => setSending(false), 2000);
    },
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 lg:p-8 space-y-5 shadow-sm"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium">
          <User className="inline size-3.5" /> {t("formName")}
        </Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="..."
          className="h-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            <Mail className="inline size-3.5" /> {t("formEmail")}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="..."
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium">
            <Phone className="inline size-3.5" /> {t("formPhone")}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="..."
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-sm font-medium">
          <FileText className="inline size-3.5" /> {t("formSubject")}
        </Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="..."
          className="h-10"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-medium">
          <MessageSquare className="inline size-3.5" /> {t("formMessage")}
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="..."
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={sending}
        className="w-full bg-navy hover:bg-navy-light gap-2 cursor-pointer"
        size="lg"
      >
        {sending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Send className="size-4" />
            {t("formSend")}
          </>
        )}
      </Button>
    </form>
  );
};
