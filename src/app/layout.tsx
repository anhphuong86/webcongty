import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xây Lắp Chợ Lớn | Uy Tín - Chất Lượng - Bền Vững",
  description: "Xây Lắp Chợ Lớn chuyên cung cấp dịch vụ tư vấn thiết kế, thi công xây dựng dân dụng và công nghiệp chuyên nghiệp tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
