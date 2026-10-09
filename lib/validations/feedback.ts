import { z } from "zod";

export const VIETNAM_PHONE_REGEX = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/;

export const feedbackSchema = z.object({
  fullName: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .regex(VIETNAM_PHONE_REGEX, "Số điện thoại không đúng định dạng Việt Nam."),
  content: z
    .string()
    .trim()
    .refine((val) => val.length > 20, {
      message: "Nội dung góp ý phải trên 20 ký tự.",
    }),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
