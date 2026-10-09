"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { submitFeedbackAction } from "@/app/actions/feedback";
import { FormAlert } from "@/components/ui/FormAlert";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { feedbackSchema, type FeedbackInput } from "@/lib/validations/feedback";

export function FeedbackForm() {
  const [formError, setFormError] = useState<string>();
  const [formSuccess, setFormSuccess] = useState<string>();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      content: "",
    },
  });

  const content = watch("content") ?? "";

  async function onSubmit(values: FeedbackInput) {
    setFormError(undefined);
    setFormSuccess(undefined);

    const result = await submitFeedbackAction(values);

    if (result.status === "error") {
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (field in values && messages[0]) {
          setError(field as keyof FeedbackInput, {
            type: "server",
            message: messages[0],
          });
        }
      }
      setFormError(result.formError);
    } else if (result.status === "success") {
      setFormSuccess(result.formSuccess ?? "Gửi góp ý thành công!");
      reset();
    }
  }

  return (
    <form className="stack-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormAlert message={formError} variant="error" />
      <FormAlert message={formSuccess} variant="success" />

      <div className="field-group">
        <label htmlFor="feedback-fullname">Họ và tên (không bắt buộc)</label>
        <input
          id="feedback-fullname"
          type="text"
          placeholder="Nguyễn Văn A"
          {...register("fullName")}
        />
      </div>

      <div className="field-group">
        <label htmlFor="feedback-phone">Số điện thoại *</label>
        <input
          id="feedback-phone"
          type="tel"
          inputMode="tel"
          placeholder="0912345678 hoặc +84912345678"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "feedback-phone-error" : "feedback-phone-hint"}
          {...register("phone")}
        />
        <p id="feedback-phone-hint" className="field-hint">
          Định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 0 hoặc +84).
        </p>
        {errors.phone && (
          <p id="feedback-phone-error" className="field-error">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="field-group">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <label htmlFor="feedback-content">Nội dung góp ý *</label>
          <span
            className={`character-count ${content.length <= 20 ? "is-over-limit" : ""}`}
            style={{ fontSize: "0.8rem", color: content.length > 20 ? "var(--green-800)" : "var(--red-700)" }}
            aria-live="polite"
          >
            {content.length} ký tự (yêu cầu &gt; 20)
          </span>
        </div>
        <textarea
          id="feedback-content"
          rows={5}
          placeholder="Nhập nội dung góp ý của bạn tại đây (trên 20 ký tự)…"
          aria-invalid={Boolean(errors.content)}
          aria-describedby={errors.content ? "feedback-content-error" : undefined}
          {...register("content")}
        />
        {errors.content && (
          <p id="feedback-content-error" className="field-error">
            {errors.content.message}
          </p>
        )}
      </div>

      <SubmitButton isPending={isSubmitting} pendingLabel="Đang gửi góp ý…">
        Gửi góp ý
      </SubmitButton>
    </form>
  );
}
