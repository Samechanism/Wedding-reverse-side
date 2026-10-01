"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください。").max(100, "お名前は100文字以内で入力してください。"),
  attendance: z.enum(["attending", "not_attending"], { errorMap: () => ({ message: "出欠を選択してください。" }) }),
  hasCompanion: z.enum(["yes", "no"]),
  companionName: z.string().trim().max(100, "同伴者名は100文字以内で入力してください。"),
  message: z.string().trim().max(500, "メッセージは500文字以内で入力してください。")
}).superRefine((value, context) => {
  if (value.hasCompanion === "yes" && !value.companionName) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["companionName"], message: "同伴者のお名前を入力してください。" });
  }
});

type FormValues = z.infer<typeof rsvpSchema>;
type FormState = Omit<FormValues, "attendance"> & { attendance: FormValues["attendance"] | "" };
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormState = { name: "", attendance: "", hasCompanion: "no", companionName: "", message: "" };

export default function RSVPForm() {
  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = rsvpSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormValues;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await getSupabaseClient().from("rsvps").insert({
        name: result.data.name,
        attendance: result.data.attendance,
        companion_name: result.data.hasCompanion === "yes" ? result.data.companionName : null,
        message: result.data.message || null
      });
      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="success-panel"><p>Thank you!</p><p>ご回答を受け付けました。当日お会いできることを楽しみにしています。</p></div>;
  }

  return (
    <form onSubmit={submit} noValidate className="mt-12 space-y-8">
      <div><label htmlFor="name" className="form-label">お名前 <span>*</span></label><input id="name" value={values.name} onChange={(event) => update("name", event.target.value)} className="form-input" placeholder="山田 花子" />{errors.name && <p className="form-error">{errors.name}</p>}</div>
      <fieldset>
        <legend className="form-label">ご出席について <span>*</span></legend>
        <div className="attendance-grid">
          <label className={`attendance-choice ${values.attendance === "attending" ? "attendance-selected" : ""}`}>
            <input type="radio" name="attendance" value="attending" checked={values.attendance === "attending"} onChange={() => update("attendance", "attending")} />
            <span className="attendance-icon" aria-hidden="true">✓</span>
            <span><strong>出席します</strong><small>ACCEPTS WITH PLEASURE</small></span>
          </label>
          <label className={`attendance-choice ${values.attendance === "not_attending" ? "attendance-selected" : ""}`}>
            <input type="radio" name="attendance" value="not_attending" checked={values.attendance === "not_attending"} onChange={() => update("attendance", "not_attending")} />
            <span className="attendance-icon attendance-icon-decline" aria-hidden="true">—</span>
            <span><strong>欠席します</strong><small>DECLINES WITH REGRET</small></span>
          </label>
        </div>
        {errors.attendance && <p className="form-error">{errors.attendance}</p>}
      </fieldset>
      <fieldset><legend className="form-label">同伴者 <span>*</span></legend><div className="mt-3 grid grid-cols-2 gap-3">{[["no", "いません"], ["yes", "います"]].map(([value, label]) => <label key={value} className={`choice ${values.hasCompanion === value ? "choice-selected" : ""}`}><input type="radio" name="hasCompanion" value={value} checked={values.hasCompanion === value} onChange={() => update("hasCompanion", value as FormValues["hasCompanion"])} />{label}</label>)}</div></fieldset>
      {values.hasCompanion === "yes" && <div><label htmlFor="companionName" className="form-label">同伴者のお名前 <span>*</span></label><input id="companionName" value={values.companionName} onChange={(event) => update("companionName", event.target.value)} className="form-input" placeholder="山田 太郎" />{errors.companionName && <p className="form-error">{errors.companionName}</p>}</div>}
      <div><label htmlFor="message" className="form-label">メッセージ</label><textarea id="message" value={values.message} onChange={(event) => update("message", event.target.value)} className="form-input min-h-28 resize-y" placeholder="楽しみにしています！" />{errors.message && <p className="form-error">{errors.message}</p>}</div>
      {status === "error" && <p role="alert" className="submit-error">送信できませんでした。入力内容は保持されています。時間をおいて再度お試しください。</p>}
      <button type="submit" disabled={status === "submitting"} className="submit-button">{status === "submitting" ? "SENDING..." : "SEND RSVP  →"}</button>
      <p className="required-note">* 必須項目</p>
    </form>
  );
}
