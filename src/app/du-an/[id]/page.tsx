import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import styles from '../projects.module.css';

export const dynamic = 'force-dynamic';

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    let project = null;

    try {
        const fileContent = fs.readFileSync(projectsFilePath, 'utf8');
        const projects = JSON.parse(fileContent);
        project = projects.find((p: any) => p.id === id);
    } catch (error) {
        console.error('Failed to read projects:', error);
    }

    if (!project) {
        return notFound();
    }

    return (
        <div className="section-padding" style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '180px' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <Link href="/du-an" style={{ color: 'var(--primary-color)', marginBottom: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px', textDecoration: 'none' }}>
                    <span style={{ fontSize: '18px' }}>←</span> QUAY LẠI DANH SÁCH DỰ ÁN
                </Link>

                <div className="fade-in">
                    <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>{project.year} | {project.category}</span>
                    <h1 className="mb-40" style={{ color: 'var(--primary-dark)', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.1', marginTop: '15px', fontWeight: '900' }}>{project.name}</h1>
                </div>

                {/* Main Hero Image */}
                <div className="fade-in" style={{ position: 'relative', height: 'clamp(300px, 50vh, 650px)', marginBottom: '50px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
                    <img
                        src={project.image}
                        alt={project.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px', marginTop: '60px' }}>
                    {/* Left: Description */}
                    <div style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '25px', color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tổng quan dự án</h3>
                        {project.description || 'Thông tin chi tiết về dự án đang được cập nhật...'}
                    </div>

                    {/* Right: Project Highlights */}
                    <div>
                        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '30px', color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '10px', display: 'inline-block' }}>Thông số kỹ thuật</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '700' }}>Lĩnh vực</span>
                                    <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '16px' }}>{project.category}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '700' }}>Năm hoàn thành</span>
                                    <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '16px' }}>{project.year}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '700' }}>Địa điểm</span>
                                    <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '16px' }}>TP. Hồ Chí Minh & Lân cận</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                {project.images && project.images.length > 0 && (
                    <div className="fade-in" style={{ marginTop: '100px', paddingBottom: '100px' }}>
                        <h2 className="mb-40" style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary-dark)', textAlign: 'center', textTransform: 'uppercase' }}>Hình ảnh thực tế công trường</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                            {project.images.map((img: string, idx: number) => (
                                <div key={idx} className={styles.galleryItem}>
                                    <img src={img} alt={`${project.name} gallery ${idx}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="fade-in" style={{ background: 'linear-gradient(135deg, var(--primary-dark), #1e3a8a)', padding: '80px 40px', marginTop: '100px', textAlign: 'center', borderRadius: '24px', color: 'white', boxShadow: '0 30px 60px rgba(10, 25, 47, 0.2)' }}>
                    <h3 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '25px' }}>Kiến tạo giá trị cùng CHOLONCONS</h3>
                    <p className="mb-40" style={{ opacity: 0.8, fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>Chúng tôi sẵn sàng mang đến giải pháp tối ưu nhất cho dự án của bạn với cam kết chất lượng và tiến độ tuyệt đối.</p>
                    <Link href="/lien-he" className="btn btn-primary" style={{ background: 'white', color: 'var(--primary-dark)', padding: '20px 50px', borderRadius: '50px', fontWeight: '900', fontSize: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>NHẬN BÁO GIÁ & TƯ VẤN NGAY</Link>
                </div>
            </div>
        </div>
    );
}
