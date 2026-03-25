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
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8979350438677!2d106.671317775838!3d10.742368959822602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f01017ef69d%3A0x6280436852377!2zODY4IFThuqEgUXVhbmcgQuG7rXUsIFBoxrDhu51uZyA1LCBRdeG6rW4gOCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1711343000000!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Địa chỉ Xây Lắp Chợ Lớn"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}
