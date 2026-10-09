import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export const metadata: Metadata = { title: "Góp ý khách hàng" };

export default function FeedbackPage() {
  return (
    <>
      <div className="auth-heading">
        <p className="eyebrow">Khảo sát &amp; Đóng góp</p>
        <h1 id="auth-title">Góp ý khách hàng</h1>
      </div>

      <FeedbackForm />

      <p className="auth-switch">
        Quay lại <Link href="/login">Đăng nhập</Link> hoặc <Link href="/feed">Bảng tin</Link>
      </p>
    </>
  );
}
