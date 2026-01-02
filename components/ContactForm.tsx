"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "sent" | "copied" | "error">(null);
  const [sending, setSending] = useState(false);
  const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mdakgngy";

  function validEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    if (!validEmail(email)) {
      setStatus("error");
      return;
    }

    // Prevent sending if the endpoint is not configured
    if (FORM_ENDPOINT.includes("your_form_id")) {
      setStatus("error");
      console.error("Formspree endpoint not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your environment.");
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, email, subject, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        console.error("Formspree error", await res.text());
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  async function copyMessage() {
    try {
      const payload = `To: supuncharuka.dev@gmail.com\nSubject: ${subject || "Contact from website"}\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
      await navigator.clipboard.writeText(payload);
      setStatus("copied");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSend} className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Your name</span>
              <div className="mt-1 relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6"/></svg>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 dark:bg-zinc-900/60 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none" placeholder="Jane Doe" required />
              </div>
            </label>

            <label className="flex flex-col">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Email</span>
              <div className="mt-1 relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8l9 6 9-6"/><path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/></svg>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/90 dark:bg-zinc-900/60 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none" placeholder="you@example.com" required />
              </div>
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 px-4 py-3 rounded-xl bg-white/90 dark:bg-zinc-900/60 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none" placeholder="What's this about?" />
          </label>

          <label className="flex flex-col">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Message</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={8} className="mt-1 px-4 py-3 rounded-xl bg-white/90 dark:bg-zinc-900/60 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none" placeholder="Write your message here" required />
          </label>

          <div className="flex items-center gap-3">
            <button type="submit" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg">Send via Email</button>
           
            <div className="ml-auto text-sm text-zinc-500 dark:text-zinc-400">
              {sending && <span className="text-zinc-600">Sending…</span>}
              {status === 'sent' && <span className="text-green-600">Message sent — thank you.</span>}
              {status === 'copied' && <span className="text-indigo-600">Message copied to clipboard.</span>}
              {status === 'error' && <span className="text-red-600">Error sending message. Configure Formspree or try copy.</span>}
            </div>
          </div>
        </div>

      
      </div>
    </form>
  );
}
