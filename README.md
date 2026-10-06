# Nexus Social Network

Ứng dụng mạng xã hội nhỏ dùng Next.js App Router, TypeScript, PostgreSQL và Server Actions. Phạm vi hiện tại gồm đăng ký, đăng nhập, session bằng cookie, xem feed, đăng bài, xóa bài của chính mình và đăng xuất.

## Cấu trúc thư mục

```text
web/
├── app/
│   ├── (auth)/              # Trang đăng nhập, đăng ký và layout xác thực
│   ├── actions/             # Server Actions cho auth và bài viết
│   ├── feed/                # Trang feed được bảo vệ bởi session
│   ├── globals.css          # Toàn bộ style dùng chung
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Chuyển / sang /login
├── components/
│   ├── feed/                # Header, danh sách và thẻ bài viết
│   ├── forms/               # Form đăng ký, đăng nhập, đăng/xóa bài, đăng xuất
│   └── ui/                  # Nút submit và thông báo dùng lại
├── lib/
│   ├── auth/                # Hash mật khẩu và quản lý session
│   ├── data/                # Query users, sessions và posts
│   ├── demo/                # Cờ bật/tắt demo SQL injection local
│   ├── server/              # Kết nối PostgreSQL
│   ├── types/               # Kiểu dữ liệu dùng chung
│   └── validations/         # Schema Zod
├── public/                  # icon.png và background.png
├── sql/schema.sql           # Schema PostgreSQL
├── scripts/setup-login-demo.cjs # Tạo tài khoản giả cho demo Login
├── docker-compose.yml       # PostgreSQL local
├── .env.example             # Mẫu biến môi trường
└── package.json             # Dependency và npm scripts
```

`node_modules` là dependency đã cài để chạy dự án. `.next`, `.npm-cache` và `*.tsbuildinfo` là file sinh tự động, không thuộc source và có thể tạo lại.

## Các route

| Route | Chức năng |
|---|---|
| `/` | Chuyển hướng sang `/login` |
| `/register` | Đăng ký tài khoản |
| `/login` | Đăng nhập và tạo session |
| `/feed` | Xem feed, đăng bài, xóa bài của mình và đăng xuất |

## Chạy dự án

1. Tạo `.env.local` từ `.env.example` và điền cấu hình PostgreSQL.
2. Chạy PostgreSQL: `docker compose --env-file .env.local up -d`.
3. Khởi tạo database bằng `sql/schema.sql` nếu database chưa có bảng.
4. Cài dependency: `npm ci`.
5. Chạy ứng dụng: `npm run dev`.

Không đưa nội dung `.env.local` vào slide, Git hoặc file nộp bài.

Khởi tạo schema trên database mới (PowerShell):

```powershell
Get-Content -Raw .\sql\schema.sql | docker compose --env-file .env.local exec -T postgres sh -lc 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

## Demo Login SQL injection (tùy chọn, chỉ chạy local)

Mặc định `ENABLE_UNSAFE_LOGIN_SQL_DEMO` trong `lib/demo/security.ts` là `false`: Login dùng parameterized query và bcrypt.

Để demo, chạy `node --env-file=.env.local scripts/setup-login-demo.cjs`, đổi cờ thành `true`, rồi chạy `npm run dev`. Script tạo bảng tài khoản giả và hai hồ sơ Feed `sql_demo_a`, `sql_demo_b`.

- Demo 1: email `demo_a@example.com`, password `' OR email = 'demo_a@example.com' --`.
- Demo 2: email `khongtontai@example.com`, password `' OR 1=1 --`.

Demo thành công sẽ tạo session và chuyển sang `/feed`. Đăng xuất giữa các lần thử. Sau demo, đổi cờ về `false`; đổi cờ không tự xóa session hiện có. Action demo bị vô hiệu hóa trong production.

## Phần 4: Tương tác & Giao bài tập

- **Nhiệm vụ:** Mỗi nhóm tạo một Form "Góp ý khách hàng".
- **Yêu cầu:** Sử dụng Zod để kiểm tra dữ liệu:
  - Trường **"Nội dung"** phải trên 20 ký tự.
  - Trường **"Số điện thoại"** phải đúng định dạng số điện thoại Việt Nam.

## Phần 5: Chấm điểm

Nhập dữ liệu sai để kiểm tra các thông báo validation của từng nhóm, gồm nội dung không vượt quá 20 ký tự và số điện thoại không đúng định dạng Việt Nam. Các nhóm trình bày kết quả kiểm tra và thông báo lỗi trên form.
