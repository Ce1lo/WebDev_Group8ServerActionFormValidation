"use server";

import type { FormActionState } from "@/lib/types/forms";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function submitFeedbackAction(
  input: unknown,
): Promise<FormActionState> {
  const parsed = feedbackSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // ponytail: no db table required for feedback assignment, return success status
  return {
    status: "success",
    formSuccess: "Góp ý của bạn đã được gửi thành công!",
  };
}
