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
            {/* Signature Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <img src="/projects/CENTRE MALL CU CHI.jpg" alt="Hero Background" />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <div className="container">
                        <div className={`${styles.breadcrumb} fade-in`}>
                            <Link href="/">Trang chủ</Link>
                            <span>/</span>
                            <p>Giới thiệu</p>
                        </div>
                        <h1 className="fade-in">Kiến Tạo<br />Giá Trị Bền Vững</h1>
                    </div>
                </div>
            </section>

            {/* Mosaic Introduction */}
            <section className={styles.aboutContent}>
                <div className="container">
                    <div className={styles.mosaicGrid}>
                        <div className={`${styles.textSection} fade-in`}>
                            <div className={styles.decorativeLine}></div>
                            <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '20px' }}>Về CholonCons</span>
                            <h2 className={styles.signatureTitle}>Vững Bước Cùng<br />Thịnh Vượng</h2>
                            <p className={styles.signatureDescription}>
                                Công Ty Cổ Phần Xây Lắp Chợ Lớn (CHOLONCONS) bắt đầu hành trình từ năm 2014. Với tâm thế của những người tiên phong, chúng tôi không ngừng nỗ lực để mang đến những giải pháp xây dựng tối ưu, bền vững và chuyên nghiệp nhất cho dự án của bạn.
                            </p>
                            <p style={{ fontSize: '20px', lineHeight: '1.9', color: '#64748b' }}>
                                Quy tụ đội ngũ chuyên môn nòng cốt với quy trình quản lý ISO 9001-2015, chúng tôi tự tin đáp ứng những tiêu chuẩn kỹ thuật khắt khe nhất trong ngành xây dựng hiện đại.
                            </p>
                        </div>

                        <div className={`${styles.imageMosaic} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.mainImage}>
                                <img
                                    src="/projects/CENTRE MALL CU CHI.jpg"
                                    alt="Dự án tiêu biểu"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                            <div className={styles.overlayCard}>
                                <h3>10</h3>
                                <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800' }}>Năm hành trình kiến tạo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Iconic Core Values Section */}
            <section className={styles.coreValuesSection}>
                <div className="container">
                    <div className="text-center fade-in">
                        <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '15px' }}>Giá trị cốt lõi</span>
                        <h2 style={{ fontSize: '48px', fontWeight: '950', color: '#0f172a', letterSpacing: '-1.5px' }}>Triết Lý Hành Động</h2>
                    </div>

                    <div className={styles.coreValuesGrid}>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.1s' }}>
                            <span className={styles.valueNumber}>01</span>
                            <span className={styles.valueIconLarge}>🛡️</span>
                            <h4>Uy Tín</h4>
                            <p>Xây dựng niềm tin thông qua sự minh bạch và cam kết chất lượng trong từng hạng mục thi công.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <span className={styles.valueNumber}>02</span>
                            <span className={styles.valueIconLarge}>🏗️</span>
                            <h4>Kinh Nghiệm</h4>
                            <p>Kế thừa và phát huy năng lực triển khai hàng trăm dự án trọng điểm trên toàn quốc từ năm 2014.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.3s' }}>
                            <span className={styles.valueNumber}>03</span>
                            <span className={styles.valueIconLarge}>💎</span>
                            <h4>Chất Lượng</h4>
                            <p>Không ngừng cải tiến kỹ thuật, áp dụng tiêu chuẩn ISO 9001:2015 để mang lại sự bền vững lâu dài.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.4s' }}>
                            <span className={styles.valueNumber}>04</span>
                            <span className={styles.valueIconLarge}>🤝</span>
                            <h4>Tận Tâm</h4>
                            <p>Luôn lắng nghe và đồng hành cùng khách hàng để tìm ra giải pháp tối ưu nhất cho mọi bài toán kinh tế.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Timeline Section */}
            <section className={styles.timelineSection}>
                <div className="container">
                    <div className="text-center mb-60 fade-in">
                        <span style={{ color: 'var(--primary-color)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '13px', display: 'block', marginBottom: '15px' }}>Dấu ấn một thập kỷ</span>
                        <h2 style={{ fontSize: '60px', fontWeight: '950', color: 'white', marginBottom: '20px', letterSpacing: '-2px' }}>Hành Trình Kiến Tạo</h2>
                        <p style={{ opacity: 0.4, maxWidth: '800px', margin: '0 auto', fontSize: '20px' }}>Hành trình từ khát vọng vươn tầm đến vị thế đơn vị xây dựng uy tín hàng đầu Việt Nam.</p>
                    </div>

                    <div className={styles.timelineContainer}>
                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick}>2014</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>2014</span>
                                    <h4>Điểm Khởi Đầu</h4>
                                    <p>Thành lập vào ngày 04/03/2014, đặt nền móng cho một hành trình tận tâm phục vụ ngành xây dựng dân dụng & công nghiệp.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>

                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick} style={{ left: 'auto', right: 0 }}>2017</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>2017</span>
                                    <h4>Khẳng Định Vị Thế</h4>
                                    <p>Trở thành đối tác chiến lược cho các chuỗi bán lẻ quốc tế và trong nước, triển khai hàng loạt dự án siêu thị quy mô lớn.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>

                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick}>Hôm Nay</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>HIỆN TẠI</span>
                                    <h4>Tầm Nhìn Vươn Xa</h4>
                                    <p>Vận hành chuyên nghiệp với 1.000+ nhân sự, áp dụng tiêu chuẩn ISO và công nghệ BIM hiện đại trong xây dựng.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Premium Design */}
            <section style={{ backgroundColor: '#ffffff', padding: '120px 0', borderTop: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
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
