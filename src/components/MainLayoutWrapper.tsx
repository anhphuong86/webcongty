'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import AIChat from "@/components/AIChat";
import Link from "next/link";

export default function MainLayoutWrapper({
    children,
    config
}: {
    children: React.ReactNode;
    config: any;
}) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div id="master-layout-wrapper">
            <Header initialConfig={{ general: config.general }} />
            <main>{children}</main>
            <footer id="main-footer-v5" className="fade-in" style={{
                backgroundColor: '#020617',
                color: 'var(--white)',
                padding: '120px 0 60px',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-5%',
                    right: '-10%',
                    fontSize: '25vw',
                    fontWeight: 950,
                    color: 'rgba(255,255,255,0.012)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 0,
                    letterSpacing: '-10px',
                    lineHeight: 1
                }}>CHỢ LỚN</div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', paddingBottom: '80px' }}>
                        <div style={{ gridColumn: 'span 1' }}>
                            <h3 style={{
                                fontSize: '24px',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                color: 'white',
                                fontWeight: 900,
                                marginBottom: '20px',
                                fontFamily: 'var(--font-header)'
                            }}>
                                CP Xây Lắp <span style={{ color: '#1674D5' }}>Chợ Lớn</span> [ROOT-V6]
                            </h3>
                            <div style={{
                                height: '2px',
                                width: '60px',
                                background: 'linear-gradient(to right, #1674D5, transparent)',
                                marginBottom: '30px'
                            }}></div>
                            <p style={{
                                opacity: 0.8,
                                fontSize: '17px',
                                lineHeight: 1.8,
                                maxWidth: '420px',
                                fontWeight: 400,
                                color: '#cbd5e1',
                                fontStyle: 'italic',
                                borderLeft: '4px solid #1674D5',
                                paddingLeft: '20px'
                            }}>
                                "{config.general?.slogan || 'Uy Tín - Chất Lượng - Hiệu Quả'}"
                            </p>
                            <p style={{ opacity: 0.5, fontSize: '14px', marginTop: '25px', lineHeight: 1.6 }}>
                                Tiên phong trong các giải pháp hạ tầng và xây dựng công nghiệp tại Việt Nam từ năm 2014.
                            </p>
                            <div style={{ marginTop: '30px', fontSize: '12px', opacity: 0.3, letterSpacing: '2px' }}>MST: {config.contact?.taxCode || '0312671412'}</div>
                        </div>

                        <div>
                            <h4 style={{
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                color: '#1674D5',
                                fontWeight: 800,
                                marginBottom: '35px'
                            }}>Khám phá</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
                                <li><Link href="/" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: '0.3s' }}>Trang chủ</Link></li>
                                <li><Link href="/gioi-thieu" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: '0.3s' }}>Về chúng tôi</Link></li>
                                <li><Link href="/du-an" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: '0.3s' }}>Dự án tiêu biểu</Link></li>
                                <li><Link href="/tin-tuc" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: '0.3s' }}>Tin tức sự kiện</Link></li>
                                <li><Link href="/lien-he" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: '0.3s' }}>Liên hệ hợp tác</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 style={{
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '3px',
                                color: '#1674D5',
                                fontWeight: 800,
                                marginBottom: '35px'
                            }}>Liên hệ</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '15px', color: '#cbd5e1', opacity: 0.9 }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#1674D5', fontSize: '18px' }}>📍</span>
                                    <p style={{ margin: 0, lineHeight: 1.6 }}>{config.contact?.address || '868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh'}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <span style={{ color: '#1674D5' }}>✉️</span>
                                    <a href={`mailto:${config.contact?.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{config.contact?.email || 'contact@xaylapcholon.com'}</a>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <span style={{ color: '#1674D5' }}>📞</span>
                                    <strong style={{ color: 'white' }}>{config.contact?.phone || '090 123 4567'}</strong>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <span style={{ color: '#1674D5' }}>⏱️</span>
                                    <p style={{ margin: 0 }}>{config.contact?.workingHours || '8:00 - 17:00 (Thứ 2 - 7)'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div>
                            <p style={{ opacity: 0.4, fontSize: '13px', color: 'white', letterSpacing: '1px' }}>
                                © {new Date().getFullYear()} {config.general?.companyName || 'CÔNG TY CỔ PHẦN XÂY LẮP CHỢ LỚN'}. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '30px', fontSize: '12px', opacity: 0.5, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Chính sách bảo mật</Link>
                            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Điều khoản sử dụng</Link>
                        </div>
                    </div>
                </div>
            </footer>
            <FloatingContact />
            <AIChat />
        </div>
    );
}
