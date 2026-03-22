import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const services = [
    {
      title: "Xây dựng Dân dụng & Công nghiệp",
      desc: "Chuyên sâu nhà ở, văn phòng, nhà xưởng và hạ tầng kỹ thuật dân dụng cao cấp.",
      icon: "🏗️",
      image: "/service1.png",
      size: "large"
    },
    {
      title: "Điện & Năng lượng Tái tạo",
      desc: "Trạm biến áp, pin mặt trời, tuabin gió và hệ thống PCCC chuẩn quốc tế.",
      icon: "⚡",
      image: "/service2.png",
      size: "medium"
    },
    {
      title: "Cấp thoát nước & Điều hòa",
      desc: "Mạng lưới cấp thoát nước đô thị và hệ thống điều hòa trung tâm.",
      icon: "💧",
      image: "/service3.png",
      size: "small"
    },
    {
      title: "Giao thông & Thủy lợi",
      desc: "Xây dựng đường bộ, đường sắt, cầu cống và các công trình thủy lợi quy mô lớn.",
      icon: "🛣️",
      image: "/hero.png",
      size: "small"
    },
    {
      title: "Thương mại & Dịch vụ Phụ trợ",
      desc: "Cung cấp máy móc xây dựng và tư vấn bất động sản chuyên nghiệp.",
      icon: "🤝",
      image: "/service1.png",
      size: "medium"
    },
    {
      title: "Nhập khẩu & Phân phối Thiết bị",
      desc: "Cung cấp trang thiết bị xây dựng, máy móc kỹ thuật cao nhập khẩu chính hãng.",
      icon: "🚢",
      image: "/service3.png",
      size: "medium"
    }
  ];

  return (
    <div className={styles.main}>
      {/* Hero Section - Premium Branding */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/hero.png" alt="Xây Lắp Chợ Lớn Building" fill priority style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`${styles.heroContent} fade-in`}>
            <span className={styles.heroSubtitle}>HƠN 12 NĂM KHẲNG ĐỊNH UY TÍN & VỊ THẾ (SINCE 2014)</span>
            <h1 className={styles.heroTitle}>
              KIẾN TẠO DI SẢN <br />
              VỮNG XÂY <br />
              <span className={styles.logoHighlight}>TƯƠNG LAI</span>
            </h1>
            <p className={styles.heroDesc}>Công ty CP Xây Lắp Chợ Lớn là đơn vị tiên phong trong lĩnh vực hạ tầng kỹ thuật và xây dựng dân dụng, mang đến những giải pháp đột phá, bền vững và đạt chuẩn mực quốc tế hàng đầu tại Việt Nam.</p>
            <div className={styles.heroBtns}>
              <Link href="/du-an" className="btn btn-primary">Khám phá dự án</Link>
              <Link href="/lien-he" className="btn btn-outline">Nhận báo giá ngay</Link>
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
                className={`${styles.bentoItem} ${styles[service.size]} fade-in`}
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
                <Image src="/hero.png" alt="Dự án Tiêu biểu" fill style={{ objectFit: 'cover' }} />
                <div className={styles.imageTag}>DỰ ÁN TRỌNG ĐIỂM 2024</div>
                <div className={styles.imageInfo}>
                  <h4>Khu Phức Hợp Chợ Lớn</h4>
                </div>
              </div>
              <div className={styles.sideImageCard}>
                <Image src="/service2.png" alt="Công trình hạ tầng" fill style={{ objectFit: 'cover' }} />
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
        <div className="container text-center fade-in">
          <h2 style={{ fontSize: '46px', fontWeight: '900', marginBottom: '30px' }}>Sẵn Sàng Cho Những Giải Pháp Đột Phá?</h2>
          <p style={{ fontSize: '20px', marginBottom: '50px', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>Liên hệ ngay với chúng tôi để nhận tư vấn chuyên sâu và báo giá tối ưu cho dự án của bạn.</p>
          <div style={{ marginTop: '50px' }}>
            <Link href="/lien-he" className="btn" style={{ padding: '20px 60px', backgroundColor: 'white', color: 'var(--primary-color)', fontWeight: '800' }}>Yêu cầu tư vấn ngay</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
