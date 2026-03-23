import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import NewsContent from './NewsContent';
import styles from './tin-tuc.module.css';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');
    let posts = [];
    let config: any = { heroImages: {} };

    try {
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        posts = JSON.parse(fileContent);
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    } catch (error) {
        console.error('Failed to read posts or config:', error);
    }

    return (
        <main style={{ backgroundColor: '#fdfdfd' }}>
            {/* Header Section */}
            <section className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.98)), url(${config.heroImages?.news || '/media__1774154547684.png'})` }}>
                <div className="container">
                    <div className={`${styles.breadcrumb} fade-in`}>
                        <Link href="/">Trang chủ</Link>
                        <span>/</span>
                        <p>Trung Tâm Tin Tức 2026</p>
                    </div>
                    <h1 className="fade-in">CHOLONCONS <span style={{ color: 'var(--accent-color)' }}>PRESS</span></h1>
                    <p className="fade-in" style={{ fontSize: '20px', maxWidth: '700px', margin: '20px auto 0', opacity: 0.8, fontWeight: '500' }}>Cập nhật kịp thời những bước chuyển mình vĩ đại của ngành xây dựng toàn cầu.</p>
                </div>
            </section>

            <section className={styles.newsContentWrapper}>
                <NewsContent initialPosts={posts} />
            </section>
        </main>
    );
}
