import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import Link from "next/link";

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
  } catch (e) { console.error(e); }

  return (
    <html lang="vi">
      <body>
        <Header initialConfig={{ general: config.general }} />
        <main>{children}</main>
        <footer className="fade-in" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)', padding: '100px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', paddingBottom: '40px' }}>
              <div>
                <h3 className="mb-20" style={{ fontSize: '24px', letterSpacing: '1px', textTransform: 'uppercase', color: 'white' }}>{config.general?.logoUrl || 'CP XÂY LẮP CHỢ LỚN'}</h3>
                <p style={{ opacity: 0.9, fontSize: '15px', color: 'white' }}>{config.general?.slogan || 'Kiến tạo những công trình bền vững theo thời gian.'}</p>
                <div style={{ marginTop: '30px', fontSize: '13px', opacity: 0.7, letterSpacing: '1px', color: 'white' }}>MST: {config.contact?.taxCode || '0312671412'}</div>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', color: 'white' }}>Liên kết nhanh</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px' }}>
                  <li><Link href="/" style={{ color: 'white', opacity: 0.9 }} className="hover-opacity">Trang chủ</Link></li>
                  <li><Link href="/gioi-thieu" style={{ color: 'white', opacity: 0.9 }} className="hover-opacity">Giới thiệu công ty</Link></li>
                  <li><Link href="/du-an" style={{ color: 'white', opacity: 0.9 }} className="hover-opacity">Dự án tiêu biểu</Link></li>
                  <li><Link href="/tin-tuc" style={{ color: 'white', opacity: 0.9 }} className="hover-opacity">Tin tức & Thị trường</Link></li>
                  <li><Link href="/lien-he" style={{ color: 'white', opacity: 0.9 }} className="hover-opacity">Liên hệ tư vấn</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', color: 'white' }}>Văn phòng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', color: 'white', opacity: 0.9 }}>
                  <p>Địa chỉ: {config.contact?.address || '868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh'}</p>
                  <p>Email: {config.contact?.email || 'contact@xaylapcholon.com'}</p>
                  <p>Hotline: {config.contact?.phone || '090 123 4567'}</p>
                  <p>Giờ làm việc: 8:00 - 17:00 (Thứ 2 - 7)</p>
                </div>
              </div>
            </div>

            <hr style={{ margin: '60px 0', borderColor: 'rgba(255,255,255,0.2)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ opacity: 0.8, fontSize: '14px', color: 'white' }}>© {new Date().getFullYear()} {config.general?.companyName || 'CÔNG TY CỔ PHẦN XÂY LẮP CHỢ LỚN'}. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', opacity: 0.8 }}>
                <Link href="#" style={{ color: 'white' }}>Chính sách bảo mật</Link>
                <Link href="#" style={{ color: 'white' }}>Điều khoản sử dụng</Link>
              </div>
            </div>
          </div>
        </footer>
        <FloatingContact />
      </body>
    </html>
  );
}
