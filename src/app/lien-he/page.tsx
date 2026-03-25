import Link from "next/link";
import fs from 'fs';
import path from 'path';
import styles from "./contact.module.css";

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
    let config: any = { contact: {} };
    try {
        const fileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(fileContent);
    } catch (e) { console.error(e); }

    return (
        <main>
            {/* Sub Hero Section */}
            <section className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.95)), url(${config.heroImages?.contact || '/service2.png'})` }}>
                <div className="container">
                    <div className={`${styles.breadcrumb} fade-in`}>
                        <Link href="/">Trang chủ</Link>
                        <span>/</span>
                        <p>Liên hệ</p>
                    </div>
                    <h1 className="fade-in">Kết Nối Với Chúng Tôi</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.contactContent}>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={`${styles.infoSection} fade-in`}>
                            <h2>Liên hệ trực tiếp</h2>
                            <p className="mb-40" style={{ fontSize: '18px', color: 'var(--text-light)', lineHeight: '1.8' }}>
                                Đội ngũ chuyên gia của Xây Lắp Chợ Lớn luôn sẵn sàng lắng nghe và tư vấn giải pháp tối ưu cho mọi công trình của bạn.
                            </p>

                            <div className={styles.infoItem}>
                                <h4>Địa chỉ trụ sở</h4>
                                <p>{config.contact?.address || '868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh'}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <h4>Hotline hỗ trợ 24/7</h4>
                                <p>{config.contact?.phone || '090 123 4567 - 028 3844 5566'}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <h4>Hòm thư điện tử</h4>
                                <p>{config.contact?.email || 'contact@xaylapcholon.com'}</p>
                            </div>

                            <div className={styles.infoItem}>
                                <h4>Thông tin pháp lý</h4>
                                <p>Mã số thuế: {config.contact?.taxCode || '0312671412'}</p>
                            </div>
                        </div>

                        <div className={`${styles.formBox} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <h2>Gửi lời nhắn cho chúng tôi</h2>
                            <form>
                                <div className={styles.inputGroup}>
                                    <label>Họ và Tên</label>
                                    <input type="text" placeholder="Nhập tên của bạn..." />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Địa chỉ Email</label>
                                    <input type="email" placeholder="Nhập email của bạn..." />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Nội dung cần tư vấn</label>
                                    <textarea rows={5} placeholder="Mô tả dự án hoặc câu hỏi của bạn..."></textarea>
                                </div>
                                <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '20px' }}>Gửi Thông Tin Ngay</button>
                            </form>
                        </div>
                    </div>

                    {/* Map Box */}
                    <div className={`${styles.mapBox} fade-in`}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
                            <p style={{ color: '#999', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>Vị trí bản đồ sẽ được tích hợp tại đây</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
