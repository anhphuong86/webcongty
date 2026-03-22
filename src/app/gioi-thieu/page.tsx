import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import styles from "./about.module.css";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
    let config: any = { about: {}, heroImages: {} };
    try {
        const fileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(fileContent);
    } catch (e) { console.error(e); }

    return (
        <main>
            {/* Sub Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={`${styles.breadcrumb} fade-in`}>
                        <Link href="/">Trang chủ</Link>
                        <span>/</span>
                        <p>Giới thiệu</p>
                    </div>
                    <h1 className="fade-in">{config.about?.heroTitle || 'Về Xây Lắp Chợ Lớn'}</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.aboutContent}>
                <div className="container">
                    <div className={styles.grid}>
                        <div className={`${styles.textSection} fade-in`}>
                            <h2>Tầm Nhìn & Sứ Mệnh</h2>
                            <p className={styles.description}>
                                {config.about?.vision || 'Được thành lập với khát khao nâng tầm chất lượng công trình Việt, Công ty CP Xây lắp Chợ Lớn đã không ngừng nỗ lực để trở thành biểu tượng của sự uy tín.'}
                            </p>
                            <p className={styles.description}>
                                {config.about?.mission || 'Sứ mệnh của chúng tôi không chỉ là xây dựng nên những khối bê tông, mà là kiến tạo nên không gian sống đẳng cấp.'}
                            </p>

                            <div className={styles.coreValues}>
                                <div className={styles.valueCard}>
                                    <h4>Uy Tín</h4>
                                    <p>Cam kết tuyệt đối về chất lượng và tiến độ trong từng hạng mục thi công.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <h4>Sáng Tạo</h4>
                                    <p>Luôn đổi mới giải pháp kỹ thuật để tối ưu hóa chi phí và công năng dự án.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <h4>Tận Tâm</h4>
                                    <p>Đồng hành và thấu hiểu mọi nguyện vọng của đối tác từ khâu lên ý tưởng.</p>
                                </div>
                                <div className={styles.valueCard}>
                                    <h4>Toàn Cầu</h4>
                                    <p>Kết nối và nhập khẩu trang thiết bị hiện đại từ các đối tác hàng đầu thế giới.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.imageBox} fade-in`} style={{ animationDelay: '0.2s', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                            <img
                                src={config.about?.heroImage || "/hero.png"}
                                alt="Dự án Xây Lắp Chợ Lớn"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ backgroundColor: 'var(--primary-dark)', padding: '100px 0', textAlign: 'center', color: 'white' }}>
                <div className="container">
                    <h2 className="mb-30" style={{ fontSize: '36px', fontWeight: '800' }}>Sẵn sàng kiến tạo dự án cùng chuyên gia?</h2>
                    <p className="mb-40" style={{ fontSize: '18px', opacity: 0.8, maxWidth: '700px', margin: '0 auto 40px' }}>
                        Hãy để Xây Lắp Chợ Lớn đồng hành cùng bạn hiện thực hóa những công trình mang tầm di sản.
                    </p>
                    <Link href="/lien-he" className="btn btn-primary" style={{ padding: '18px 45px' }}>Nhận tư vấn ngay</Link>
                </div>
            </section>
        </main>
    );
}
