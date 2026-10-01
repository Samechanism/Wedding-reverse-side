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
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    try {
      const { error } = await getSupabaseClient().from("rsvps").insert({
        name: result.data.name,
        attendance: result.data.attendance,
        companion_name: result.data.hasCompanion === "yes" ? result.data.companionName : null,
        message: result.data.message || null
      });
      if (error) throw error;
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "送信に失敗しました。時間をおいて再度お試しください。");
    }
  }

  if (status === "success") {
    return <div className="mt-12 border border-white/20 p-8"><p className="font-display text-3xl">Thank you!</p><p className="mt-4 text-sm leading-7 text-white/70">ご回答を受け付けました。当日お会いできることを楽しみにしています。</p></div>;
  }

  return (
    <form onSubmit={submit} noValidate className="mt-12 space-y-8">
      <div><label htmlFor="name" className="form-label">お名前 <span>*</span></label><input id="name" value={values.name} onChange={(event) => update("name", event.target.value)} className="form-input" placeholder="山田 花子" />{errors.name && <p className="form-error">{errors.name}</p>}</div>
      <fieldset><legend className="form-label">ご出席について <span>*</span></legend><div className="mt-3 grid grid-cols-2 gap-3">{[["attending", "出席します"], ["not_attending", "欠席します"]].map(([value, label]) => <label key={value} className={`choice ${values.attendance === value ? "choice-selected" : ""}`}><input type="radio" name="attendance" value={value} checked={values.attendance === value} onChange={() => update("attendance", value as FormValues["attendance"])} />{label}</label>)}</div>{errors.attendance && <p className="form-error">{errors.attendance}</p>}</fieldset>
      <fieldset><legend className="form-label">同伴者 <span>*</span></legend><div className="mt-3 grid grid-cols-2 gap-3">{[["no", "いません"], ["yes", "います"]].map(([value, label]) => <label key={value} className={`choice ${values.hasCompanion === value ? "choice-selected" : ""}`}><input type="radio" name="hasCompanion" value={value} checked={values.hasCompanion === value} onChange={() => update("hasCompanion", value as FormValues["hasCompanion"])} />{label}</label>)}</div></fieldset>
      {values.hasCompanion === "yes" && <div><label htmlFor="companionName" className="form-label">同伴者のお名前 <span>*</span></label><input id="companionName" value={values.companionName} onChange={(event) => update("companionName", event.target.value)} className="form-input" placeholder="山田 太郎" />{errors.companionName && <p className="form-error">{errors.companionName}</p>}</div>}
      <div><label htmlFor="message" className="form-label">メッセージ</label><textarea id="message" value={values.message} onChange={(event) => update("message", event.target.value)} className="form-input min-h-28 resize-y" placeholder="楽しみにしています！" />{errors.message && <p className="form-error">{errors.message}</p>}</div>
      {status === "error" && <p role="alert" className="border border-[#e2a59b]/60 p-4 text-sm text-[#f0c0b7]">送信できませんでした。入力内容を確認して再度お試しください。<span className="mt-1 block text-xs text-white/50">{errorMessage}</span></p>}
      <button type="submit" disabled={status === "submitting"} className="w-full bg-[#d4b5a6] px-6 py-4 text-sm font-bold tracking-[0.2em] text-[#2f3935] transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60">{status === "submitting" ? "SENDING..." : "SEND RSVP  →"}</button>
      <p className="text-center text-xs text-white/40">* 必須項目</p>
    </form>
  );
}
