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
            <h1 className={styles.heroTitle}>KIẾN TẠO DI SẢN <br />VỮNG XÂY <br /><span className="logoHighlight">TƯƠNG LAI</span></h1>
            <p className={styles.heroDesc}>Công ty CP Xây Lắp Chợ Lớn là đơn vị tiên phong trong lĩnh vực hạ tầng kỹ thuật và xây dựng dân dụng, mang đến những giải pháp đột phá, bền vững và đạt chuẩn mực quốc tế hàng đầu tại Việt Nam.</p>
            <div className={styles.heroBtns}>
              <Link href="/du-an" className="btn btn-primary">Khám phá dự án</Link>
              <Link href="/lien-he" className="btn btn-secondary" style={{ marginLeft: '20px', backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>Nhận báo giá ngay</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid Style */}
      <section className="section-padding" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container">
          <div className="text-center mb-60 fade-in">
            <h2 style={{ fontSize: '48px', color: 'var(--primary-color)', textTransform: 'uppercase' }}>Giải Pháp Đa Ngành - Vững Chãi Niềm Tin</h2>
            <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--accent-color)', margin: '20px auto' }}></div>
            <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>Tối ưu hóa nguồn lực và ứng dụng kỹ thuật tiên tiến để mang đến hệ sinh thái dịch vụ xây dựng toàn diện, đạt chuẩn mực quốc tế hàng đầu.</p>
          </div>

          <div className={styles.bentoGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`${styles.bentoItem} ${styles[service.size]} fade-in`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.bentoImage}>
                  <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
                  <div className={styles.bentoOverlay}></div>
                </div>
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

      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={`${styles.trustInfo} fade-in`}>
              <span className={styles.heroSubtitle}>Năng Lực Thực Thi & Sự Minh Bạch</span>
              <h2 className="mb-20" style={{ fontSize: '42px', color: 'var(--primary-color)' }}>Bản Lĩnh Qua Từng Công Trình</h2>
              <p className="mb-40" style={{ fontSize: '18px', color: 'var(--text-light)' }}>
                Với nền tảng kỹ thuật vững chắc và kinh nghiệm triển khai đa lĩnh vực, Xây Lắp Chợ Lớn đã khẳng định vị thế qua hàng trăm dự án trọng điểm,
                đóng góp vào sự phát triển hạ tầng hiện đại của khu vực.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>12+</span>
                  <p>Năm Kinh nghiệm</p>
                  <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>Khởi đầu từ 2014 với khát vọng vươn tầm.</small>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>500+</span>
                  <p>Dự án hoàn thành</p>
                  <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>Tiêu biểu: <strong>Cụm nhà ở Tạ Quang Bửu, KCN Lê Minh Xuân.</strong></small>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>100%</span>
                  <p>Đúng tiến độ</p>
                  <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>Đối tác tin cậy: <strong>Điện lực TP.HCM, Cấp nước Chợ Lớn.</strong></small>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>98%</span>
                  <p>Hài lòng tuyệt đối</p>
                  <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>Cam kết chất lượng đạt chuẩn <strong>ISO 9001:2015.</strong></small>
                </div>
              </div>
            </div>

            <div className={`${styles.trustImageWrapper} fade-in`}>
              <div className={styles.mainImageCard}>
                <Image src="/hero.png" alt="Dự án Tiêu biểu" fill style={{ objectFit: 'cover' }} />
                <div className={styles.imageTag}>DỰ ÁN TRỌNG ĐIỂM 2024</div>
                <div className={styles.imageInfo}>
                  <h4>Khu Phức Hợp Chợ Lớn</h4>
                  <p>Hạng mục: Xây dựng dân dụng & Hệ thống M&E</p>
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

      {/* CTA Section - Sophisticated */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <div className="container text-center fade-in">
          <h2 style={{ fontSize: '42px', marginBottom: '30px' }}>Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay</h2>
          <p style={{ fontSize: '20px', marginBottom: '50px', opacity: 0.9 }}>Tối ưu hóa khả năng tiếp cận và nhận tư vấn chuyên sâu từ đội ngũ kỹ sư hàng đầu.</p>
          <Link href="/lien-he" className="btn" style={{ padding: '20px 50px', backgroundColor: 'white', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '18px' }}>Yêu cầu báo giá chi tiết</Link>
        </div>
      </section>
    </div>
  );
}
