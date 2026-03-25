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
                    <img src="/projects/centre-mall-cu-chi.jpg" alt="Hero Background" />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <div className="container">
                        <div className={`${styles.breadcrumb} fade-in`}>
                            <Link href="/">Trang chủ</Link>
                            <span>/</span>
                            <p>Về Chúng Tôi</p>
                        </div>
                        <h1 className="fade-in">Tầm Nhìn <span>Thịnh Vượng</span> Bền Vững</h1>
                    </div>
                </div>
            </section>

            {/* Mosaic Introduction */}
            <section className={styles.aboutContent}>
                <div className="container">
                    <div className={styles.mosaicGrid}>
                        <div className={`${styles.textSection} fade-in`}>
                            <div className={styles.decorativeLine}></div>
                            <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                                <span style={{ width: '40px', height: '2px', background: 'var(--gold-accent)' }}></span>
                                Đối Tác Tin Cậy
                            </span>
                            <h2 className={styles.signatureTitle}>Khát Vọng<br />Vươn Tầm Thế Giới</h2>
                            <p className={styles.signatureDescription}>
                                Công Ty Cổ Phần Xây Lắp Chợ Lớn (CHOLONCONS) không chỉ xây dựng những công trình, chúng tôi kiến tạo những biểu tượng của sự thịnh vượng và bền vững. Với hơn một thập kỷ kinh nghiệm, chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực xây lắp công nghiệp và dân dụng tại Việt Nam.
                            </p>
                            <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#475569', fontWeight: '450', marginBottom: '40px' }}>
                                Chúng tôi vận hành dựa trên sự minh bạch tuyệt đối và tâm thế phụng sự khách hàng. Mỗi dự án là một lời cam kết về chất lượng đạt chuẩn quốc tế ISO 9001:2015.
                            </p>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div style={{ flex: 1, height: '200px', overflow: 'hidden', borderRadius: '4px' }}>
                                    <img src="/projects/xuong-viet-phat-kcn-binh-an.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Construction" />
                                </div>
                                <div style={{ flex: 1, height: '200px', overflow: 'hidden', borderRadius: '4px' }}>
                                    <img src="/projects/coop-su-van-hanh.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Project" />
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.imageMosaic} fade-in`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.mainImage}>
                                <img
                                    src="/projects/centre-mall-cu-chi.jpg"
                                    alt="Dự án tiêu biểu"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                            <div className={styles.overlayCard}>
                                <h3>10+</h3>
                                <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontWeight: '900', fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>Năm Hành Trình Kiến Tạo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Strip - Visual Richness */}
            <div className={styles.projectStrip}>
                <img src="/projects/xuong-viet-phat-kcn-binh-an.jpg" className={styles.stripImage} alt="Project 1" />
                <img src="/projects/coop-su-van-hanh.jpg" className={styles.stripImage} alt="Project 2" />
                <img src="/projects/nha-953-cmt8-veiw-1.jpg" className={styles.stripImage} alt="Project 3" />
                <img src="/projects/centre-mall-cu-chi.jpg" className={styles.stripImage} alt="Project 4" />
            </div>

            {/* Iconic Core Values Section */}
            <section className={styles.coreValuesSection}>
                <div className="container">
                    <div className="text-center fade-in">
                        <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                            Giá trị cốt lõi
                            <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                        </span>
                        <h2 style={{ fontSize: '52px', fontWeight: '950', color: '#0a192f', letterSpacing: '-1.5px', lineHeight: '1.1' }}>Triết Lý Quản Trị</h2>
                    </div>

                    <div className={styles.iconicValueGrid}>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.1s', borderTop: '4px solid #c4a163' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(196, 161, 99, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)', fontWeight: '900', fontSize: '20px' }}>01</div>
                            <h4 style={{ margin: '25px 0 15px', fontWeight: '950' }}>UY TÍN</h4>
                            <p>Danh dự của doanh nghiệp là tài sản quý giá nhất. Chúng tôi bảo vệ uy tín bằng chất lượng công trình thực tế.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.2s', borderTop: '4px solid #0a192f' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(10, 25, 47, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--prestige-navy)', fontWeight: '900', fontSize: '20px' }}>02</div>
                            <h4 style={{ margin: '25px 0 15px', fontWeight: '950' }}>CHUYÊN NGHIỆP</h4>
                            <p>Quy trình quản lý tinh gọn, đội ngũ kỹ sư tinh nhuệ sẵn sàng giải quyết mọi bài toán kỹ thuật phức tạp.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.3s', borderTop: '4px solid #c4a163' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(196, 161, 99, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-accent)', fontWeight: '900', fontSize: '20px' }}>03</div>
                            <h4 style={{ margin: '25px 0 15px', fontWeight: '950' }}>SÁNG TẠO</h4>
                            <p>Không ngừng áp dụng công nghệ mới (BIM, AI) để tối ưu hóa chi phí và đẩy nhanh tiến độ thi công.</p>
                        </div>
                        <div className={`${styles.iconicValueCard} fade-in`} style={{ animationDelay: '0.4s', borderTop: '4px solid #0a192f' }}>
                            <div style={{ width: '50px', height: '50px', background: 'rgba(10, 25, 47, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--prestige-navy)', fontWeight: '900', fontSize: '20px' }}>04</div>
                            <h4 style={{ margin: '25px 0 15px', fontWeight: '950' }}>BỀN VỮNG</h4>
                            <p>Kiến tạo những công trình xanh, thân thiện môi trường và có giá trị sử dụng lâu dài qua nhiều thế hệ.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chairman's Message - Human Connection */}
            <section className={styles.chairmanSection}>
                <div className="container">
                    <div className={styles.chairmanGrid}>
                        <div className={`${styles.chairmanImage} fade-in`}>
                            <img src="/projects/sanh-648.jpg" style={{ width: '100%', height: '520px', objectFit: 'cover' }} alt="Corporate Office" />
                            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--gold-accent)', padding: '30px', color: '#0a192f', boxShadow: '20px 20px 60px rgba(0,0,0,0.2)' }}>
                                <p style={{ fontWeight: '950', fontSize: '26px', margin: 0, letterSpacing: '-1px', textTransform: 'uppercase' }}>Ông LÊ HUY ANH VŨ</p>
                                <p style={{ fontWeight: '700', fontSize: '14px', margin: '5px 0 0', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>GIÁM ĐỐC CÔNG TY XÂY LẮP CHỢ LỚN</p>
                            </div>
                        </div>
                        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                            <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ width: '40px', height: '2px', background: 'var(--gold-accent)' }}></span>
                                Thông điệp Ban Lãnh Đạo
                            </span>
                            <div className={styles.chairmanQuote}>
                                "Tại CHOLONCONS, chúng tôi không chỉ xây dựng bằng bê tông cốt thép, mà bằng cả sự tận tâm và khát vọng kiến tạo giá trị thực cho cộng đồng. Mỗi dự án là một minh chứng cho sự chuyên nghiệp và cam kết bền vững."
                            </div>
                            <p style={{ fontSize: '20px', color: '#475569', lineHeight: '1.9', marginBottom: '40px', fontWeight: '450' }}>
                                Chúng tôi hiểu rằng, sự phát triển của doanh nghiệp luôn song hành cùng sự tin tưởng của đối tác và khách hàng. Với tầm nhìn trở thành tập đoàn xây lắp đa ngành hàng đầu, chúng tôi luôn không ngừng đổi mới, cập nhật công nghệ và bồi dưỡng nhân tài để sẵn sàng chinh phục những thử thách lớn hơn trong kỷ nguyên số.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '50px' }}>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '4px', borderLeft: '6px solid var(--gold-accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                    <p style={{ fontSize: '36px', fontWeight: '950', color: 'var(--prestige-navy)', margin: 0, lineHeight: '1' }}>450+</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', marginTop: '10px', letterSpacing: '1px' }}>Công trình hoàn thiện</p>
                                </div>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '4px', borderLeft: '6px solid var(--prestige-navy)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                    <p style={{ fontSize: '36px', fontWeight: '950', color: 'var(--prestige-navy)', margin: 0, lineHeight: '1' }}>98%</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', marginTop: '10px', letterSpacing: '1px' }}>Khách hàng hài lòng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Timeline Section */}
            <section className={styles.timelineSection}>
                <div className="container">
                    <div className="text-center mb-60 fade-in">
                        <span style={{ color: 'var(--gold-accent)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '6px', fontSize: '14px', display: 'block', marginBottom: '20px' }}>Lịch sử phát triển</span>
                        <h2 style={{ fontSize: '52px', fontWeight: '950', color: 'white', letterSpacing: '-1.5px', lineHeight: '1.1' }}>Hành Trình Thập Kỷ</h2>
                    </div>

                    <div className={styles.timelineContainer}>
                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick}>2014</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>04.03.2014</span>
                                    <h4>KHỞI NGUYÊN</h4>
                                    <p>Đặt những viên gạch đầu tiên tại trung tâm Chợ Lớn với khát vọng thay đổi diện mạo ngành xây lắp Miền Nam.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>

                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick} style={{ left: 'auto', right: 0 }}>2017</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>GIAI ĐOẠN VÀNG</span>
                                    <h4>BƯỚC NGOẶT CHIẾN LƯỢC</h4>
                                    <p>Ký kết hợp tác toàn diện với các tập đoàn bán lẻ hàng đầu: Saigon Co.op, Lotte Mart, Aeon Mall.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>

                        <div className={styles.timelineRow}>
                            <div className={styles.timelineItemCenter}><div className={styles.timelineDotLarge}></div></div>
                            <div className={`${styles.timelineItemSide} fade-in`}>
                                <div className={styles.timelineYearStick}>2024</div>
                                <div className={styles.timelineCardEditorial}>
                                    <span className={styles.actualYear}>VỊ THẾ MỚI</span>
                                    <h4>KIẾN TẠO TƯƠNG LAI</h4>
                                    <p>Khẳng định vị thế nhà thầu hạng nhất với đội ngũ 1.000+ nhân sự và hàng trăm dự án trọng điểm quốc gia.</p>
                                </div>
                            </div>
                            <div className={styles.timelineItemSide}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Executive Dark */}
            <section style={{ background: '#0a192f', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'linear-gradient(#c4a163 1px, transparent 1px), linear-gradient(90deg, #c4a163 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', textAlign: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '72px', color: 'var(--gold-accent)', fontWeight: '950', letterSpacing: '-3px', lineHeight: '1' }}>10+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: '900', color: 'white', marginTop: '20px' }}>Năm Kinh Nghiệm</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '72px', color: 'var(--gold-accent)', fontWeight: '950', letterSpacing: '-3px', lineHeight: '1' }}>50+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: '900', color: 'white', marginTop: '20px' }}>Lãnh Đạo Kỹ Thuật</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '72px', color: 'var(--gold-accent)', fontWeight: '950', letterSpacing: '-3px', lineHeight: '1' }}>1000+</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: '900', color: 'white', marginTop: '20px' }}>Nhân Sự Nòng Cốt</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '72px', color: 'var(--gold-accent)', fontWeight: '950', letterSpacing: '-3px', lineHeight: '1' }}>ISO</h3>
                            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', fontWeight: '900', color: 'white', marginTop: '20px' }}>9001:2015</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Section - Brand Wall */}
            <section className={styles.partnerSection}>
                <div className="container">
                    <div className="text-center mb-80 fade-in">
                        <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '20px', display: 'inline-flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                            <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                            Đồng hành cùng phát triển
                            <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                        </span>
                        <h2 style={{ fontSize: '52px', color: 'var(--prestige-navy)', fontWeight: '950', letterSpacing: '-1.5px', lineHeight: '1.1' }}>Mạng Lưới Đối Tác Hàng Đầu</h2>
                        <p style={{ maxWidth: '800px', margin: '30px auto 0', fontSize: '20px', color: '#64748b' }}>Chúng tôi trân trọng và tự hào là đối tác chiến lược của những định chế tài chính và tập đoàn bán lẻ hàng đầu.</p>
                    </div>

                    <div className={styles.partnerGrid}>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_coop}`}>SAIGON CO.OP</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_viettien}`}>MAY VIỆT TIẾN</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_bidv}`}>NGÂN HÀNG BIDV</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_vcb}`}>VIETCOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_ctg}`}>VIETINBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_agri}`}>AGRIBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_tcb}`}>TECHCOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_mb}`}>MB BANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_stb}`}>SACOMBANK</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_lotte}`}>LOTTE MART</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_win}`}>WINMART</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo} ${styles.p_aeon}`}>AEON MALL</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo}`} style={{ color: '#E31E24' }}>CENTRAL RETAIL</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo}`} style={{ color: '#004A99' }}>MAY 10</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo}`} style={{ color: '#0054A6' }}>VIỆT LONG</div></div>
                        <div className={styles.partnerItem}><div className={`${styles.partnerLogo}`} style={{ color: '#00A1E4' }}>SENCE BEN TRE</div></div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Prestige Dark */}
            <section style={{ backgroundColor: '#0a192f', padding: '160px 0', borderTop: '4px solid var(--gold-accent)' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '52px', fontWeight: '950', color: 'white', letterSpacing: '-1.5px', marginBottom: '30px' }}>Hợp tác xây dựng tương lai?</h2>
                    <p style={{ fontSize: '24px', color: '#cbd5e1', maxWidth: '900px', margin: '0 auto 60px' }}>
                        Hãy để Chợ Lớn Cons đồng hành cùng bạn trong những dự án mang tầm vóc lịch sử.
                    </p>
                    <Link href="/lien-he" className="btn btn-primary" style={{ padding: '25px 80px', borderRadius: '0', fontWeight: '900', fontSize: '20px', backgroundColor: 'var(--gold-accent)', border: 'none', color: '#0a192f', textTransform: 'uppercase', letterSpacing: '4px' }}>Kết nối ngay</Link>
                </div>
            </section>
        </main>
    );
}
