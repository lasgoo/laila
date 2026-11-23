"use client";

import { useState } from "react";

// Posts to a form-to-email service (FormSubmit by default, set in profile.json).
export default function ContactForm({ endpoint, email }) {
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="form-note" role="status">Message sent. Laila will reply by email.</p>;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input type="hidden" name="_subject" value="New message from your portfolio" />
      <input type="text" name="_honey" className="honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label>
        Your name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Your email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="full">
        Message
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="form-note full" role="alert">
          The message didn&apos;t send. Try again, or email <a href={`mailto:${email}`}>{email}</a> directly.
        </p>
      )}
    </form>
  );
}
