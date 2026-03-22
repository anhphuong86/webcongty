import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import fs from 'fs';
import path from 'path';

export default async function Home() {
  const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
  let config: any = { home: { heroImage: '', heroTitle: '', heroHighlight: '', heroSlogan: '', aboutTitle: '', aboutContent: '' }, services: {}, trust: {} };
  try {
    const fileContent = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read config:', error);
  }

  const services = [
    {
      title: "Xây dựng Dân dụng & Công nghiệp",
      desc: "Chuyên sâu nhà ở, văn phòng, nhà xưởng và hạ tầng kỹ thuật dân dụng cao cấp.",
      icon: "🏗️",
      image: config.services?.img1 || "/service1.png",
      size: "large",
      color: "orange"
    },
    {
      title: "Điện & Năng lượng Tái tạo",
      desc: "Trạm biến áp, pin mặt trời, tuabin gió và hệ thống PCCC chuẩn quốc tế.",
      icon: "⚡",
      image: config.services?.img2 || "/service2.png",
      size: "medium",
      color: "yellow"
    },
    {
      title: "Cấp thoát nước & Điều hòa",
      desc: "Mạng lưới cấp thoát nước đô thị và hệ thống điều hòa trung tâm.",
      icon: "💧",
      image: config.services?.img3 || "/service3.png",
      size: "small",
      color: "blue"
    },
    {
      title: "Giao thông & Thủy lợi",
      desc: "Xây dựng đường bộ, đường sắt, cầu cống và các công trình thủy lợi quy mô lớn.",
      icon: "🛣️",
      image: config.services?.img4 || "/hero.png",
      size: "small",
      color: "green"
    },
    {
      title: "Thương mại & Dịch vụ Phụ trợ",
      desc: "Cung cấp máy móc xây dựng và tư vấn bất động sản chuyên nghiệp.",
      icon: "🤝",
      image: config.services?.img5 || "/service1.png",
      size: "medium",
      color: "purple"
    },
    {
      title: "Nhập khẩu & Phân phối Thiết bị",
      desc: "Cung cấp trang thiết bị xây dựng, máy móc kỹ thuật cao nhập khẩu chính hãng.",
      icon: "🚢",
      image: config.services?.img6 || "/service3.png",
      size: "medium",
      color: "cyan"
    }
  ];

  return (
    <div className={styles.main}>
      {/* Hero Section - Elite Split Layout */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={config.home?.heroImage || "/hero.png"} alt="Xây Lắp Chợ Lớn Building" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className={styles.heroOverlay}></div>

        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left Column: Core Message */}
            <div className={`${styles.heroLeft} fade-in`}>
              <div className={styles.heroBadge}>SINCE 2014 • ISO 9001:2015</div>
              <h1 className={styles.heroTitle} style={{ whiteSpace: 'pre-line' }}>
                {config.home.heroTitle || 'KIẾN TẠO \nGIẢI PHÁP ĐẲNG CẤP'} <span className={styles.logoHighlight}>{config.home.heroHighlight || 'TƯƠNG LAI'}</span>
              </h1>
              <div className={styles.heroDivider}></div>
              <p className={styles.heroDesc}>
                {config.home.heroSlogan || 'Công ty CP Xây Lắp Chợ Lớn tiên phong trong các giải pháp hạ tầng kỹ thuật cao, mang đến chuẩn mực xây dựng bền vững và đổi mới không ngừng cho mọi công trình.'}
              </p>
              <div className={styles.heroBtns}>
                <Link href="/du-an" className="btn btn-primary">XEM DỰ ÁN TIÊU BIỂU</Link>
                <Link href="/lien-he" className="btn btn-outline" style={{ border: '2px solid white', color: 'white' }}>NHẬN TƯ VẤN NGAY</Link>
              </div>
            </div>

            {/* Right Column: Logic Highlights Card */}
            <div className={`${styles.heroRight} fade-in`} style={{ animationDelay: '0.3s' }}>
              <div className={styles.logicCard}>
                <div className={styles.cardHeader}>
                  <h3>GIÁ TRỊ CỐT LÕI</h3>
                  <p>Tại sao chọn Xây Lắp Chợ Lớn?</p>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.logicItem}>
                    <div className={styles.logicIcon}>✔️</div>
                    <div className={styles.logicText}>
                      <strong>Minh bạch tuyệt đối</strong>
                      <p>Cam kết 100% vật tư đúng chủng loại và khối lượng.</p>
                    </div>
                  </div>
                  <div className={styles.logicItem}>
                    <div className={styles.logicIcon}>🏆</div>
                    <div className={styles.logicText}>
                      <strong>Chất lượng đỉnh cao</strong>
                      <p>Thi công đạt chuẩn xây dựng quốc tế khắt khe nhất.</p>
                    </div>
                  </div>
                  <div className={styles.logicItem}>
                    <div className={styles.logicIcon}>⏱️</div>
                    <div className={styles.logicText}>
                      <strong>Tiến độ thần tốc</strong>
                      <p>Đảm bảo bàn giao đúng hoặc trước thời hạn cam kết.</p>
                    </div>
                  </div>
                </div>
                <Link href="/gioi-thieu" className={styles.cardLink}>Tìm hiểu về năng lực chúng tôi →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid Style */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} fade-in`}>
            <span className={styles.sectionSubtitle}>Giải Pháp Đa Ngành</span>
            <h2 className={styles.sectionTitle}>Chuyên Môn Vững Chãi - Niềm Tin Tuyệt Đối</h2>
            <p className={styles.sectionDesc}>Tối ưu hóa nguồn lực và ứng dụng kỹ thuật tiên tiến để mang đến hệ sinh thái dịch vụ xây dựng toàn diện, đạt chuẩn mực quốc tế hàng đầu.</p>
          </div>

          <div className={styles.bentoGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`${styles.bentoItem} ${styles[service.size]} ${styles[service.color]} fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image src={service.image} alt={service.title} fill className={styles.bentoImage} />
                <div className={styles.bentoOverlay}></div>
                <div className={styles.bentoContent}>
                  <div className={styles.bentoIcon}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <Link href="/du-an" className={styles.bentoLink}>Tìm hiểu thêm →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={`${styles.trustInfo} fade-in`}>
              <span className={styles.sectionSubtitle}>Năng Lực & Minh Bạch</span>
              <h2 className={styles.sectionTitle}>Bản Lĩnh Qua Từng Công Trình</h2>
              <p className={styles.sectionDesc}>
                Với nền tảng kỹ thuật vững chắc và kinh nghiệm triển khai đa lĩnh vực, Xây Lắp Chợ Lớn đã khẳng định vị thế qua hàng trăm dự án trọng điểm.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>12+</span>
                  <p>Năm Kinh nghiệm</p>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>500+</span>
                  <p>Dự án hoàn thành</p>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>100%</span>
                  <p>Đúng tiến độ</p>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>98%</span>
                  <p>Hài lòng tuyệt đối</p>
                </div>
              </div>
            </div>

            <div className={`${styles.trustImageWrapper} fade-in`}>
              <div className={styles.mainImageCard}>
                <Image src={config.trust?.imgMain || "/hero.png"} alt="Dự án Tiêu biểu" fill style={{ objectFit: 'cover' }} />
                <div className={styles.imageTag}>DỰ ÁN TRỌNG ĐIỂM 2024</div>
                <div className={styles.imageInfo}>
                  <h4>Khu Phức Hợp Chợ Lớn</h4>
                </div>
              </div>
              <div className={styles.sideImageCard}>
                <Image src={config.trust?.imgSide || "/service2.png"} alt="Công trình hạ tầng" fill style={{ objectFit: 'cover' }} />
                <div className={styles.sideImageInfo}>
                  <p>Trạm Biến Áp 220kV Quận 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <div className="container fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)', fontWeight: '900', marginBottom: '30px' }}>Sẵn Sàng Cho Những Giải Pháp Đột Phá?</h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', marginBottom: '50px', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>Liên hệ ngay với chúng tôi để nhận tư vấn chuyên sâu và báo giá tối ưu cho dự án của bạn.</p>
          <div style={{ marginTop: '40px' }}>
            <Link href="/lien-he" className="btn" style={{ padding: '18px 50px', backgroundColor: 'white', color: 'var(--primary-color)', fontWeight: '800', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>YÊU CẦU TƯ VẤN NGAY</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
