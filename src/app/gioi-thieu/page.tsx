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
                            <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '15px' }}>Khát vọng thịnh vượng</span>
                            <h2 style={{ fontSize: '48px', fontWeight: '950', letterSpacing: '-1.5px', marginBottom: '30px', color: '#0f172a' }}>Hành Trình & Năng Lực</h2>
                            <p className={styles.description} style={{ fontSize: '20px', lineHeight: '1.9', color: '#475569' }}>
                                Công Ty Cổ Phần Xây Lắp Chợ Lớn (CHOLONCONS) bắt đầu hoạt động từ năm 2014. Được điều hành bởi ban lãnh đạo có tầm nhìn và tài chính vững mạnh, chúng tôi đã khẳng định vị thế và thương hiệu trên thị trường xây dựng Việt Nam.
                            </p>
                            <p className={styles.description} style={{ fontSize: '20px', lineHeight: '1.9', color: '#475569' }}>
                                Với quy trình quản lý chất lượng <strong>ISO 9001-2015</strong>, chúng tôi không ngừng đầu tư vào nguồn nhân lực và công nghệ mới. Hiện nay, công ty quy tụ đội ngũ chuyên môn nòng cốt sẵn sàng đáp ứng mọi tiêu chuẩn khắt khe.
                            </p>
                        </div>

                        <div className={`${styles.imageBox} fade-in`} style={{ animationDelay: '0.2s', height: '650px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                            <img
                                src="/projects/CENTRE MALL CU CHI.jpg"
                                alt="Dự án Xây Lắp Chợ Lớn"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>

                    <div className={styles.coreValues}>
                        <div className={styles.valueCard} style={{ animationDelay: '0.1s' }}>
                            <span className={styles.valueIcon}>🛡️</span>
                            <h4>Uy Tín</h4>
                            <p>Được các ngân hàng lớn như BIDV, Vietcombank tin tưởng bảo lãnh và hỗ trợ vốn.</p>
                        </div>
                        <div className={styles.valueCard} style={{ animationDelay: '0.2s' }}>
                            <span className={styles.valueIcon}>🏗️</span>
                            <h4>Kinh Nghiệm</h4>
                            <p>Hợp tác lâu dài với đại diện bán lẻ Saigon Co.op và Tổng Công ty May Việt Tiến.</p>
                        </div>
                        <div className={styles.valueCard} style={{ animationDelay: '0.3s' }}>
                            <span className={styles.valueIcon}>💎</span>
                            <h4>Chất Lượng</h4>
                            <p>Áp dụng chuẩn ISO 9001:2015, cam kết hiệu quả thi công và độ bền vững tối đa.</p>
                        </div>
                        <div className={styles.valueCard} style={{ animationDelay: '0.4s' }}>
                            <span className={styles.valueIcon}>🤝</span>
                            <h4>Trách Nhiệm</h4>
                            <p>Đồng hành cùng cộng đồng qua các hoạt động an sinh và thiện nguyện hàng năm.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Elite Milestone */}
            <section className={styles.timelineSection}>
                <div className="container">
                    <div className="text-center mb-60 fade-in">
                        <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '15px' }}>Lịch sử & Khát vọng</span>
                        <h2 style={{ fontSize: '48px', fontWeight: '950', color: 'white', marginBottom: '20px', letterSpacing: '-1px' }}>Hành Trình Thập Kỷ</h2>
                        <p style={{ opacity: 0.5, maxWidth: '700px', margin: '0 auto', fontSize: '18px', lineHeight: '1.8' }}>Hành trình 10 năm kiến tạo giải pháp xây dựng bền vững và khẳng định niềm tin với đối tác.</p>
                    </div>

                    <div className={styles.timelineGrid}>
                        <div className={`${styles.timelineItem} fade-in`}>
                            <span className={styles.timelineYear}>2014</span>
                            <div className={styles.timelineContent}>
                                <h4>Thành lập & Khởi đầu</h4>
                                <p>Ngày 04/03/2014 đánh dấu sự ra đời của một thương hiệu xây dựng trẻ đầy nhiệt huyết và khát vọng vươn xa.</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <span className={styles.timelineYear}>2017</span>
                            <div className={styles.timelineContent}>
                                <h4>Bứt tốc & Khẳng định</h4>
                                <p>Đạt các mốc doanh thu ấn tượng và trở thành đối tác chiến lược cho chuỗi siêu thị hàng đầu Việt Nam.</p>
                            </div>
                        </div>

                        <div className={`${styles.timelineItem} fade-in`} style={{ animationDelay: '0.4s' }}>
                            <span className={styles.timelineYear}>Nay</span>
                            <div className={styles.timelineContent}>
                                <h4>Vững bước tương lai</h4>
                                <p>Vận hành chuyên nghiệp với đội ngũ 50+ cán bộ kỹ thuật và 1.000+ công nhân lành nghề khắp cả nước.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Premium Design */}
            <section style={{ backgroundColor: '#ffffff', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        <div>
                            <span style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px', fontWeight: '900', color: '#cbd5e1', fontSize: '14px', letterSpacing: '4px' }}>EST. 2014</span>
                            <h3 style={{ fontSize: '64px', color: '#0f172a', fontWeight: '950', letterSpacing: '-2px' }}>10+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b', marginTop: '10px' }}>Năm Kinh Nghiệm</p>
                        </div>
                        <div>
                            <span style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px', fontWeight: '900', color: '#cbd5e1', fontSize: '14px', letterSpacing: '4px' }}>EXPERT</span>
                            <h3 style={{ fontSize: '64px', color: '#0f172a', fontWeight: '950', letterSpacing: '-2px' }}>50+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b', marginTop: '10px' }}>Cán Bộ Kỹ Thuật</p>
                        </div>
                        <div>
                            <span style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px', fontWeight: '900', color: '#cbd5e1', fontSize: '14px', letterSpacing: '4px' }}>STAFF</span>
                            <h3 style={{ fontSize: '64px', color: '#0f172a', fontWeight: '950', letterSpacing: '-2px' }}>1000+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b', marginTop: '10px' }}>Công Nhân Lành Nghề</p>
                        </div>
                        <div>
                            <span style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', display: 'inline-block', marginBottom: '20px', fontWeight: '900', color: '#cbd5e1', fontSize: '14px', letterSpacing: '4px' }}>TRUST</span>
                            <h3 style={{ fontSize: '64px', color: '#0f172a', fontWeight: '950', letterSpacing: '-2px' }}>ISO</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '800', color: '#64748b', marginTop: '10px' }}>9001:2015</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Section - Elite Brand Showcase */}
            <section className={styles.partnerSection} style={{ borderTop: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div className="text-center mb-60 fade-in">
                        <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '15px' }}>Tin cậy & Đồng hành</span>
                        <h2 style={{ fontSize: '40px', color: '#0f172a', fontWeight: '950', letterSpacing: '-1px' }}>Hệ Thống Đối Tác Chiến Lược</h2>
                        <p style={{ opacity: 0.6, fontSize: '17px' }}>Chúng tôi tự hào là đơn vị đồng hành cùng các tập đoàn bán lẻ và ngân hàng uy tín hàng đầu.</p>
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
