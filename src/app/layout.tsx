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
        <footer className="fade-in" style={{ backgroundColor: '#020617', color: 'var(--white)', padding: '120px 0 40px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Watermark khổng lồ siêu sang trọng */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '22vw', fontWeight: 950, color: 'rgba(255,255,255,0.015)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0, letterSpacing: '-5px' }}>CHỢ LỚN</div>

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', paddingBottom: '80px' }}>
              <div>
                {/* Khắc phục lỗi in chữ /logo.jpg bằng cách render thẻ img, dùng filter trắng */}
                {config.general?.logoUrl ? (
                  <img src={config.general.logoUrl} alt="Logo" style={{ height: '45px', marginBottom: '25px', filter: 'brightness(0) invert(1)' }} />
                ) : (
                  <h3 className="mb-20" style={{ fontSize: '28px', letterSpacing: '2px', textTransform: 'uppercase', color: 'white', fontWeight: 900 }}>CP XÂY LẮP CHỢ LỚN</h3>
                )}
                <p style={{ opacity: 0.6, fontSize: '15px', lineHeight: 1.8, maxWidth: '85%' }}>{config.general?.slogan || 'Kiến tạo những công trình bền vững theo thời gian.'}</p>
                <div style={{ marginTop: '40px', fontSize: '13px', opacity: 0.4, letterSpacing: '2px', textTransform: 'uppercase' }}>MST: {config.contact?.taxCode || '0312671412'}</div>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', color: '#1674D5', fontWeight: 800 }}>Liên kết nhanh</h4>
                {/* Reset list-style để xóa lỗi chấm tròn xấu xí */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><Link href="/" style={{ color: 'white', opacity: 0.6, textDecoration: 'none' }} className="hover-opacity">Trang chủ</Link></li>
                  <li><Link href="/gioi-thieu" style={{ color: 'white', opacity: 0.6, textDecoration: 'none' }} className="hover-opacity">Giới thiệu công ty</Link></li>
                  <li><Link href="/du-an" style={{ color: 'white', opacity: 0.6, textDecoration: 'none' }} className="hover-opacity">Dự án tiêu biểu</Link></li>
                  <li><Link href="/tin-tuc" style={{ color: 'white', opacity: 0.6, textDecoration: 'none' }} className="hover-opacity">Tin tức & Thị trường</Link></li>
                  <li><Link href="/lien-he" style={{ color: 'white', opacity: 0.6, textDecoration: 'none' }} className="hover-opacity">Liên hệ tư vấn</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '4px', color: '#1674D5', fontWeight: 800 }}>Văn phòng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px', color: 'white', opacity: 0.6, lineHeight: 1.6 }}>
                  <p>Địa chỉ: {config.contact?.address || '868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh'}</p>
                  <p>Email: <a href={`mailto:${config.contact?.email}`} style={{ color: 'white', textDecoration: 'none' }}>{config.contact?.email || 'contact@xaylapcholon.com'}</a></p>
                  <p>Hotline: <strong style={{ color: 'white', fontWeight: 700 }}>{config.contact?.phone || '090 123 4567'}</strong></p>
                  <p>Giờ làm việc: {config.contact?.workingHours || '8:00 - 17:00 (Thứ 2 - 7)'}</p>
                </div>
              </div>
            </div>

            <hr style={{ margin: '0 0 40px 0', borderColor: 'rgba(255,255,255,0.05)', borderStyle: 'solid' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ opacity: 0.4, fontSize: '13px', color: 'white', letterSpacing: '1px' }}>© {new Date().getFullYear()} {config.general?.companyName || 'CÔNG TY CỔ PHẦN XÂY LẮP CHỢ LỚN'}. ALL RIGHTS RESERVED.</p>
              <div style={{ display: 'flex', gap: '30px', fontSize: '13px', opacity: 0.4, letterSpacing: '1px', textTransform: 'uppercase' }}>
                <Link href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover-opacity">Chính sách bảo mật</Link>
                <Link href="#" style={{ color: 'white', textDecoration: 'none' }} className="hover-opacity">Điều khoản sử dụng</Link>
              </div>
            </div>
          </div>
        </footer>
        <FloatingContact />
      </body>
    </html>
  );
}
