import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import styles from "./projects.module.css";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    let dynamicPosts = [];

    try {
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        dynamicPosts = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read dynamic posts:', error);
    }

    const staticProjects = [
        // Nhóm 1: Xây dựng Dân dụng & Công nghiệp
        { id: 's1', name: "Nhà Máy Thực Phẩm Masan (HACCP)", category: "Công nghiệp", image: "/service1.png", year: "2023" },
        { id: 's2', name: "Kho Lạnh Logistics Tân Tạo", category: "Công nghiệp", image: "/hero.png", year: "2022" },
        { id: 's3', name: "Xưởng Sản Xuất May Mặc Quận 8", category: "Công nghiệp", image: "/service1.png", year: "2023" },
        { id: 's4', name: "Cụm Nhà Xưởng Tiền Chế Long An", category: "Công nghiệp", image: "/hero.png", year: "2024" },
        { id: 's5', name: "Showroom Ô Tô Cao Cấp Tạ Quang Bửu", category: "Dân dụng", image: "/service1.png", year: "2023" },
        { id: 's6', name: "Tòa Nhà Văn Phòng Central Chợ Lớn", category: "Dân dụng", image: "/hero.png", year: "2022" },
        { id: 's7', name: "Chung Cư Cao Tầng Phường Chánh Hưng", category: "Dân dụng", image: "/service1.png", year: "2023" },
        { id: 's8', name: "Nhà Xưởng Thông Minh 4.0 - VSIP", category: "Công nghiệp", image: "/hero.png", year: "2023" },
        { id: 's9', name: "Biệt Thự Song Lập Bình Chánh", category: "Dân dụng", image: "/service1.png", year: "2022" },
        { id: 's10', name: "Khu Phức Hộp Thương Mại Quận 10", category: "Dân dụng", image: "/hero.png", year: "2023" },

        // Nhóm 2: Điện & Năng lượng Tái tạo
        { id: 's11', name: "Được Áp Mái Năng Lượng Mặt Trời 1MWp", category: "Năng lượng", image: "/service2.png", year: "2024" },
        { id: 's12', name: "Điện Mặt Trời Mái Nhà Xưởng CP", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 's13', name: "Hệ Thống Pin Lưu Trữ Hybrid Gia Đình", category: "Năng lượng", image: "/service2.png", year: "2024" },
        { id: 's14', name: "Trạm Biến Áp 110kV KCN Hiệp Phước", category: "Hệ thống Điện", image: "/service2.png", year: "2023" },
        { id: 's15', name: "Điện Mặt Trời Mái Kính Văn Phòng", category: "Năng lượng", image: "/service2.png", year: "2022" },
        { id: 's16', name: "Hệ Thống Đèn Đường Solar Quận 8", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 's17', name: "Trạm Sạc Nhanh Xe Điện VinFast", category: "Hệ thống Điện", image: "/service2.png", year: "2024" },
        { id: 's18', name: "Hợp Tác PPA Điện Mặt Trời 500kWp", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 's19', name: "Hệ Thống Tủ Điện Phân Phối Tòa Nhà", category: "Hệ thống Điện", image: "/service2.png", year: "2022" },
        { id: 's20', name: "Nâng Cấp Trạm Hạ Thế Phường 5", category: "Hệ thống Điện", image: "/service2.png", year: "2023" }
    ];

    // Convert dynamic posts to project format
    const dynamicProjects = dynamicPosts.map((p: any) => ({
        id: p.id,
        name: p.title,
        category: p.category || "Dự án mới",
        image: p.image || "/hero.png",
        year: p.date?.split('/')[2] || "2024"
    }));

    // Combine all
    const allProjects = [...dynamicProjects, ...staticProjects];

    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-60 fade-in">
                    <h1 className={styles.pageTitle}>Hồ Sơ Năng Lực Dự Án</h1>
                    <div className={styles.titleLine}></div>
                    <p className={styles.pageSubtitle}>Xây Lắp Chợ Lớn tự hào đồng hành cùng {allProjects.length}+ dự án tiêu biểu trải rộng trên tất cả các mảng kinh doanh chiến lược.</p>
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
        </div>
    );
}
