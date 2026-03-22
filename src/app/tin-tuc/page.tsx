import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import styles from './tin-tuc.module.css';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    let posts = [];

    try {
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        posts = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read posts:', error);
    }

    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-60 fade-in">
                    <h1 style={{ fontSize: '48px', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>Tin Tức & Sự Kiện Chuyên Ngành</h1>
                    <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--primary-color)', margin: '20px auto' }}></div>
                    <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>Hành trình kiến tạo di sản và cập nhật công nghệ xây dựng hiện đại</p>
                </div>

                <div className={styles.newsGrid}>
                    {posts.map((post: any, index: number) => (
                        <div key={post.id} className={`${styles.newsCard} fade-in`} style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className={styles.newsImg}>
                                <div className={styles.newsIcons}>
                                    {post.images && post.images.length > 1 && (
                                        <div className={styles.iconBadge} title="Có thư viện ảnh">🖼️</div>
                                    )}
                                    {post.videoUrl && (
                                        <div className={styles.iconBadge} title="Có video thực tế">🎬</div>
                                    )}
                                </div>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.newsContent}>
                                <span className={styles.newsDate}>{post.date} | {post.category || 'Tin tức'}</span>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <Link href={`/tin-tuc/${post.id}`} className={styles.readMore}>
                                    Khám phá ngay
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center fade-in">
                        <p style={{ fontSize: '18px', color: '#999' }}>Hiện chưa có bài viết nào. Vui lòng quay lại sau.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
