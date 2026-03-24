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
    const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    let allProjects = [];

    try {
        const fileContent = fs.readFileSync(projectsFilePath, 'utf8');
        allProjects = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read projects:', error);
    }

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
