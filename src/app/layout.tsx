import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

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
        <Header />
        <main>{children}</main>
        <footer className="fade-in" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)', padding: '100px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px' }}>
              <div>
                <h3 className="mb-20" style={{ fontSize: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>CÔNG TY CP XÂY LẮP <span className="logoHighlight">CHỢ LỚN</span></h3>
                <p style={{ opacity: 0.8, fontSize: '15px' }}>Kiến tạo những công trình bền vững theo thời gian. Chúng tôi đồng hành cùng sự phát triển của bạn trên mọi chặng đường.</p>
                <div style={{ marginTop: '30px', fontSize: '13px', opacity: 0.6, letterSpacing: '1px' }}>MST: 0312671412</div>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px' }}>Liên kết nhanh</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px' }}>
                  <li><Link href="/" style={{ opacity: 0.8 }} className="hover-opacity">Trang chủ</Link></li>
                  <li><Link href="/gioi-thieu" style={{ opacity: 0.8 }} className="hover-opacity">Giới thiệu công ty</Link></li>
                  <li><Link href="/du-an" style={{ opacity: 0.8 }} className="hover-opacity">Dự án tiêu biểu</Link></li>
                  <li><Link href="/tin-tuc" style={{ opacity: 0.8 }} className="hover-opacity">Tin tức & Thị trường</Link></li>
                  <li><Link href="/lien-he" style={{ opacity: 0.8 }} className="hover-opacity">Liên hệ tư vấn</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-20" style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px' }}>Văn phòng</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px', opacity: 0.8 }}>
                  <p>Địa chỉ: 868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh</p>
                  <p>Email: contact@xaylapcholon.com</p>
                  <p>Hotline: 090 123 4567</p>
                  <p>Giờ làm việc: 8:00 - 17:00 (Thứ 2 - 7)</p>
                </div>
              </div>
            </div>

            <hr style={{ margin: '60px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ opacity: 0.6, fontSize: '14px' }}>© 2024 CÔNG TY CỔ PHẦN XÂY LẮP CHỢ LỚN. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', opacity: 0.6 }}>
                <Link href="#">Chính sách bảo mật</Link>
                <Link href="#">Điều khoản sử dụng</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
