"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { submitNetlifyForm } from "@/lib/netlify-forms";

const inquiries = ["Business strategy", "AI & systems", "Venue programming", "Founder events", "Not sure yet"];

export function InquiryDialog({
  open: contactOpen,
  onOpenChange: setContactOpen,
  initialInterest,
  requestId,
  source = "website",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialInterest: string;
  requestId: string;
  source?: "website" | "event";
}) {
  const [interest, setInterest] = useState(initialInterest);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");

    try {
      await submitNetlifyForm("general-inquiry", {
        requestId,
        source,
        name: form.get("name") as string,
        email: form.get("email") as string,
        business: form.get("business") as string,
        interest,
        message: form.get("message") as string,
        website: form.get("website") as string,
      });
      setReceipt(`BG-${requestId.slice(0, 8).toUpperCase()}`);
      setStatus("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We couldn’t send your inquiry. Please try again.");
      setStatus("error");
    }
  }

  return (
    <Dialog open={contactOpen} onOpenChange={setContactOpen}>
      <DialogContent className="contact-dialog">
        {status === "success" ? (
          <div className="success-content">
            <div className="success-check"><Check size={26} /></div>
            <p className="eyebrow">Inquiry received</p>
            <DialogTitle>Thank you for<br />starting the conversation.</DialogTitle>
            <DialogDescription>Your inquiry has been saved for Brown & Gaines to review. Keep the reference below for your records.</DialogDescription>
            <p className="receipt">Reference: {receipt}</p>
            <button className="button button-blue" onClick={() => setContactOpen(false)}>Back to Brown & Gaines <ArrowRight size={18} /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Let’s begin</p>
            <DialogTitle>What are you<br />working toward?</DialogTitle>
            <DialogDescription>Tell us a little about your business and what you’d like to change.</DialogDescription>
            <form name="general-inquiry" action="/__forms.html" method="POST" onSubmit={submit} className="inquiry-form">
              <input type="hidden" name="form-name" value="general-inquiry" />
              <input type="hidden" name="requestId" value={requestId} />
              <input type="hidden" name="source" value={source} />
              <input type="hidden" name="interest" value={interest} />
              <div className="form-row">
                <label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              </div>
              <label>Business or organization<input name="business" autoComplete="organization" required maxLength={180} /></label>
              <label id="interest-label">What would you like to discuss?</label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger className="interest-select" aria-labelledby="interest-label"><SelectValue /></SelectTrigger>
                <SelectContent>{inquiries.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
              </Select>
              <label>What’s on your mind?<textarea name="message" required minLength={10} maxLength={4000} rows={4} placeholder="The opportunity, the challenge, or the idea you want to explore." /></label>
              <div className="form-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <p className="form-privacy">We use these details to review and respond to your inquiry. Please leave out sensitive or confidential information.</p>
              {status === "error" && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-blue submit-button" disabled={status === "sending"}>
                {status === "sending" ? <>Sending your inquiry <Loader2 className="spin" size={18} /></> : <>Send your inquiry <ArrowUpRight size={19} /></>}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
