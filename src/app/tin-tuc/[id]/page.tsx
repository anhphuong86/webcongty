import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PostDetail({ params }: { params: { id: string } }) {
    const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    let post = null;

    try {
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        const posts = JSON.parse(fileContent);
        post = posts.find((p: any) => p.id === Number(params.id));
    } catch (error) {
        console.error('Failed to read post:', error);
    }

    if (!post) {
        return notFound();
    }

    // Function to get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = post.videoUrl ? getYouTubeId(post.videoUrl) : null;

    return (
        <div className="section-padding">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <Link href="/tin-tuc" className="fade-in" style={{ color: 'var(--primary-color)', marginBottom: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px' }}>
                    <span style={{ fontSize: '18px' }}>←</span> Quay lại tin tức
                </Link>

                <div className="fade-in">
                    <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>{post.date} | {post.category}</span>
                    <h1 className="mb-40" style={{ color: 'var(--primary-dark)', fontSize: '48px', lineHeight: '1.2', marginTop: '10px' }}>{post.title}</h1>
                </div>

                <div className="fade-in" style={{ position: 'relative', height: '550px', marginBottom: '40px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div className="fade-in" style={{ fontSize: '19px', lineHeight: '2', color: 'var(--text-main)', whiteSpace: 'pre-wrap', maxWidth: '850px', margin: '0 auto' }}>
                    {post.content}
                </div>

                {/* Multiple Images Gallery */}
                {post.images && post.images.length > 1 && (
                    <div className="fade-in" style={{ marginTop: '80px' }}>
                        <h3 className="mb-30" style={{ fontSize: '24px', textTransform: 'uppercase', color: 'var(--primary-dark)' }}>Thư viện hình ảnh chi tiết</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {post.images.map((img: string, idx: number) => (
                                <div key={idx} style={{ position: 'relative', height: '200px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                                    <img src={img} alt={`detail-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video Section */}
                {youtubeId && (
                    <div className="fade-in" style={{ marginTop: '80px' }}>
                        <h3 className="mb-30" style={{ fontSize: '24px', textTransform: 'uppercase', color: 'var(--primary-dark)' }}>Video thực tế công trình</h3>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                            <iframe
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                <div className="fade-in" style={{ backgroundColor: 'var(--secondary-color)', padding: '60px', marginTop: '100px', textAlign: 'center', borderRadius: '4px' }}>
                    <h3 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '20px' }}>Bạn cần tư vấn cho dự án sắp tới?</h3>
                    <p className="mb-40" style={{ color: 'var(--text-light)', fontSize: '18px' }}>Đội ngũ chuyên gia của Xây Lắp Chợ Lớn luôn sẵn sàng hỗ trợ bạn kiến tạo nên công trình hoàn mỹ nhất.</p>
                    <Link href="/lien-he" className="btn btn-primary">Liên hệ tư vấn miễn phí</Link>
                </div>
            </div>
        </div>
    );
}
