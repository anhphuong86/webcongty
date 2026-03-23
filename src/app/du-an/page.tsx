import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import styles from "./projects.module.css";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
    let config: any = { heroImages: {} };

    try {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    } catch (error) {
        console.error('Failed to read config:', error);
    }
    const staticProjects = [
        // Nhóm 1: Công trình Thương mại & Siêu thị
        { id: 's1', name: "Trung Tâm Thương Mại Centre Mall Củ Chi", category: "Thương mại", image: "/projects/CENTRE MALL CU CHI.jpg", year: "2024" },
        { id: 's1a', name: "Centre Mall Củ Chi - Phối cảnh mặt đứng", category: "Thương mại", image: "/projects/CENTRE MALL CU CHI-min.jpg", year: "2024" },
        { id: 's2', name: "Siêu Thị Co.op Mart Sư Vạn Hạnh", category: "Thương mại", image: "/projects/COOP SU VAN HANH.jpg", year: "2023" },
        { id: 's3', name: "Trung Tâm Thương Mại Sense City Cà Mau", category: "Thương mại", image: "/projects/Sense Camau thuc te.JPG", year: "2023" },
        { id: 's4', name: "Tòa Nhà Văn Phòng 648 Cách Mạng Tháng 8", category: "Văn phòng", image: "/projects/648 CMT8 V3.jpg", year: "2024" },
        { id: 's4a', name: "Văn Phòng 648 CMT8 - Kiến trúc Skyline", category: "Văn phòng", image: "/projects/648 CMT8 V2.jpg", year: "2024" },
        { id: 's4b', name: "Sảnh Đón khách Tòa nhà 648", category: "Nội thất", image: "/projects/Sanh 648.jpg", year: "2024" },

        // Nhóm 2: Công trình Công nghiệp
        { id: 's5', name: "Hệ Thống Xưởng May Việt Long Hưng", category: "Công nghiệp", image: "/projects/XUONG MAY VIET LONG HUNG v2.jpg", year: "2023" },
        { id: 's11', name: "Tổ Hợp Xưởng May Việt Long Hưng - Giai Đoạn 3", category: "Công nghiệp", image: "/projects/VL1.jpg", year: "2024" },
        { id: 's6', name: "Xưởng May Việt Tân - Quy mô lớn", category: "Công nghiệp", image: "/projects/XUONG MAY VIET TAN V2.jpg", year: "2022" },
        { id: 's7', name: "Xưởng Sản Xuất Việt Phát - KCN Bình An", category: "Công nghiệp", image: "/projects/Xuong Viet phat kcn Binh an.jpg", year: "2023" },
        { id: 's8', name: "Kho Vận Logistics Việt Khánh", category: "Công nghiệp", image: "/projects/XUONG MAY VIET KHANH-min.jpg", year: "2024" },
        { id: 's12', name: "Nhà máy Sản xuất IP Vietnam Heritage", category: "Công nghiệp", image: "/projects/phoi-canh-ipvietnam-factory-for-lease-in-vietnam-1.jpg", year: "2024" },

        // Nhóm 3: Công trình Dân dụng
        { id: 's9', name: "Biệt Thự Phố 953 Cách Mạng Tháng 8", category: "Dân dụng", image: "/projects/NHA 953 CMT8 VEIW 1.jpg", year: "2023" },
        { id: 's10', name: "Nhà Phố Cao Cấp Lê Đại Hành", category: "Dân dụng", image: "/projects/NHA LE DAI HANH.jpg", year: "2022" }
    ];

    // Combine all
    const allProjects = [...staticProjects];

    return (
        <main>
            {/* Sub Hero Section */}
            <section className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.8), rgba(10, 25, 47, 0.95)), url(${config.heroImages?.projects || '/hero.png'})` }}>
                <div className="container">
                    <div className={`${styles.breadcrumb} fade-in`}>
                        <Link href="/">Trang chủ</Link>
                        <span>/</span>
                        <p>Dự án</p>
                    </div>
                    <h1 className="fade-in">Hồ Sơ Năng Lực Dự Án</h1>
                </div>
            </section>

            <section className={styles.projectsContent}>
                <div className="container">
                    <div className="text-center mb-80 fade-in">
                        <p className={styles.pageSubtitle}>Xây Lắp Chợ Lớn tự hào đồng hành cùng {allProjects.length}+ dự án tiêu biểu trải rộng trên tất cả các mảng kinh doanh chiến lược.</p>
                        <div className={styles.titleLine}></div>
                    </div>

                    <div className={styles.projectsGrid}>
                        {allProjects.map((project: any) => (
                            <div key={project.id} className={`${styles.projectCard} fade-in`}>
                                <div className={styles.imageContainer}>
                                    <Image src={project.image} alt={project.name} fill style={{ objectFit: 'cover' }} />
                                    <div className={styles.projectYear}>{project.year}</div>
                                </div>
                                <div className={styles.projectContent}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectName}>{project.name}</h3>
                                    <Link href="/lien-he" className={styles.projectLink}>Tư vấn giải pháp tương tự →</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-100 fade-in">
                        <h2 style={{ fontSize: '32px', color: 'var(--primary-dark)', marginBottom: '30px', fontWeight: '800' }}>Bạn cần đối tác thi công uy tín cho dự án sắp tới?</h2>
                        <Link href="/lien-he" className="btn btn-primary" style={{ padding: '18px 45px' }}>Gửi yêu cầu hợp tác ngay</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
