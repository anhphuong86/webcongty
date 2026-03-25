import type { Metadata } from "next";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: "Xây Lắp Chợ Lớn | Uy Tín - Chất Lượng - Bền Vững",
  description: "Xây Lắp Chợ Lớn chuyên cung cấp dịch vụ tư vấn thiết kế, thi công xây dựng dân dụng và công nghiệp chuyên nghiệp tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
  let config: any = { general: {}, contact: {} };
  try {
    const fileContent = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(fileContent);
  } catch (e) {
    console.error("Layout failed to read config:", e);
  }

  return (
    <html lang="vi">
      <body>
        <MainLayoutWrapper config={config}>
          {children}
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
