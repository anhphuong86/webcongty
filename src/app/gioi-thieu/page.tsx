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
                            <h2>Hành Trình & Năng Lực</h2>
                            <p className={styles.description}>
                                Công Ty Cổ Phần Xây Lắp Chợ Lớn (CHOLONCONS) bắt đầu hoạt động từ năm 2014. Được điều hành bởi ban lãnh đạo có tầm nhìn và tài chính vững mạnh, chúng tôi đã khẳng định vị thế và thương hiệu trên thị trường xây dựng Việt Nam.
                            </p>
                            <p className={styles.description}>
                                Với quy trình quản lý chất lượng <strong>ISO 9001-2015</strong>, chúng tôi không ngừng đầu tư vào nguồn nhân lực và công nghệ mới. Hiện nay, công ty quy tụ đội ngũ hơn <strong>50 cán bộ chuyên môn</strong> và <strong>1.000 công nhân</strong> lành nghề làm việc tại khắp các công trình trọng điểm.
                            </p>
                        </div>

                        <div className={`${styles.imageBox} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <img
                                src="/projects/CENTRE MALL CU CHI.jpg"
                                alt="Dự án Xây Lắp Chợ Lớn"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>

                    <div className={styles.coreValues}>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>🛡️</span>
                            <h4>Uy Tín</h4>
                            <p>Được các ngân hàng lớn như BIDV, Vietcombank tin tưởng hỗ trợ vốn.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>🏗️</span>
                            <h4>Kinh Nghiệm</h4>
                            <p>Hợp tác lâu dài với Saigon Co.op và Tổng Công Ty May Việt Tiến.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>💎</span>
                            <h4>Chất Lượng</h4>
                            <p>Áp dụng chuẩn ISO 9001:2015, cam kết hiệu suất thi công cao nhất.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>🤝</span>
                            <h4>Trách Nhiệm</h4>
                            <p>Đồng hành cùng cộng đồng qua các hoạt động an sinh xã hội hằng năm.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Updated to Grid */}
            <section className={styles.timelineSection}>
                <div className="container">
                    <div className="text-center mb-60 fade-in">
                        <h2 style={{ fontSize: '36px', color: 'white', marginBottom: '20px' }}>Lịch Sử Phát Triển</h2>
                        <p style={{ opacity: 0.6, maxWidth: '600px', margin: '0 auto' }}>Hành trình 10 năm kiến tạo giá trị và khẳng định niềm tin.</p>
                    </div>

                    <div className={styles.timelineGrid}>
                        <div className={`${styles.timelineItem} fade-in`}>
                            <span className={styles.timelineYear}>2014</span>
                            <div className={styles.timelineContent}>
                                <h4>Thành lập & Khởi đầu</h4>
                                <p>Chính thức thành lập ngày 04/03/2014, đặt viên gạch đầu tiên cho khát vọng xây dựng.</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <span className={styles.timelineYear}>2017</span>
                            <div className={styles.timelineContent}>
                                <h4>Bứt tốc & Khẳng định</h4>
                                <p>Trở thành nhà thầu chiến lược cho chuỗi Co.op Mart và các đơn vị may mặc lớn.</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} fade-in`} style={{ animationDelay: '0.4s' }}>
                            <span className={styles.timelineYear}>Nay</span>
                            <div className={styles.timelineContent}>
                                <h4>Vững bước tương lai</h4>
                                <p>Vận hành chuẩn ISO 9001:2015 với đội ngũ nhân sự và máy móc hùng hậu.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ backgroundColor: '#f8fafc', padding: '100px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '48px', color: 'var(--primary-color)', fontWeight: '900' }}>10+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b' }}>Năm Kinh Nghiệm</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '48px', color: 'var(--primary-color)', fontWeight: '900' }}>50+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b' }}>Cán Bộ Kỹ Thuật</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '48px', color: 'var(--primary-color)', fontWeight: '900' }}>1000+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b' }}>Công Nhân Lành Nghề</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '48px', color: 'var(--primary-color)', fontWeight: '900' }}>ISO</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b' }}>9001:2015</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Section - Table Grid with Colors */}
            <section className={styles.partnerSection}>
                <div className="container">
                    <div className="text-center mb-40 fade-in">
                        <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', fontWeight: '900' }}>Hệ Thống Đối Tác Chiến Lược</h2>
                        <p style={{ opacity: 0.6 }}>Danh sách các đơn vị và tổ chức tín dụng đồng hành cùng CHOLONCONS</p>
                    </div>

                    <div className={styles.partnerGrid}>
                        {/* Row 1 */}
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_coop}`}>SAIGON CO.OP</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_viettien}`}>MAY VIỆT TIẾN</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_bidv}`}>BIDV BANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_vcb}`}>VIETCOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_ctg}`}>VIETINBANK</div></div>
                        {/* Row 2 */}
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_agri}`}>AGRIBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_tcb}`}>TECHCOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_mb}`}>MB BANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_stb}`}>SACOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_lotte}`}>LOTTE MART</div></div>
                        {/* Row 3 */}
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_win}`}>WINMART</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_aeon}`}>AEON MALL</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_central}`}>CENTRAL RETAIL</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_m10}`}>MAY 10</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_vlong}`}>VIỆT LONG HƯNG</div></div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ backgroundColor: 'var(--primary-dark)', padding: '120px 0', textAlign: 'center', color: 'white' }}>
                <div className="container">
                    <h2 className="mb-30" style={{ fontSize: '42px', fontWeight: '900' }}>Hợp tác cùng Xây Lắp Chợ Lớn ngay</h2>
                    <p className="mb-40" style={{ fontSize: '20px', opacity: 0.8, maxWidth: '800px', margin: '0 auto 50px' }}>
                        Chúng tôi luôn sẵn sàng mang đến những giải pháp xây dựng tối ưu, bền vững và chuyên nghiệp nhất cho dự án của bạn.
                    </p>
                    <Link href="/lien-he" className="btn btn-primary" style={{ padding: '20px 60px', borderRadius: '50px', fontWeight: '700', fontSize: '18px' }}>Liên hệ ngay</Link>
                </div>
            </section>
        </main>
    );
}
