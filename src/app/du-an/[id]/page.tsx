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
        <main style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
            {/* Project Hero - Cinematic */}
            <section style={{
                position: 'relative',
                height: '70vh',
                minHeight: '600px',
                width: '100%',
                backgroundColor: '#0a192f',
                overflow: 'hidden',
                marginTop: '-90px'
            }}>
                <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, rgba(10, 25, 47, 0.95))'
                }}></div>

                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '80px', zIndex: 10 }}>
                    <div className="fade-in">
                        <Link href="/du-an" style={{
                            color: 'var(--gold-accent)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '800',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '30px'
                        }}>
                            <span style={{ fontSize: '24px' }}>←</span> Danh mục dự án
                        </Link>
                        <span style={{ color: 'white', opacity: 0.6, fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px' }}>
                            {project.year} • {project.category}
                        </span>
                        <h1 style={{
                            color: 'white',
                            fontSize: 'clamp(40px, 6vw, 72px)',
                            fontWeight: '950',
                            lineHeight: '1.1',
                            marginTop: '20px',
                            letterSpacing: '-1.5px',
                            maxWidth: '1000px'
                        }}>
                            {project.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Project Overview - Executive Style */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '80px' }}>
                        <div className="fade-in">
                            <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                                <span style={{ width: '40px', height: '2px', background: 'var(--gold-accent)' }}></span>
                                Tổng quan dự án
                            </span>
                            <div style={{ fontSize: '22px', lineHeight: '1.8', color: '#475569', fontWeight: '450', whiteSpace: 'pre-wrap' }}>
                                {project.description}
                            </div>

                            {/* Detailed Stats in content */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '60px' }}>
                                <div style={{ background: 'white', padding: '40px', borderLeft: '6px solid var(--gold-accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                    <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '10px' }}>VỊ TRÍ DỰ ÁN</h5>
                                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#0a192f', margin: 0 }}>TP. Hồ Chí Minh & Khu vực phía Nam</p>
                                </div>
                                <div style={{ background: 'white', padding: '40px', borderLeft: '6px solid #0a192f', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                    <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '10px' }}>TIÊU CHUẨN KỸ THUẬT</h5>
                                    <p style={{ fontSize: '18px', fontWeight: '800', color: '#0a192f', margin: 0 }}>ISO 9001:2015</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                            <div style={{
                                background: '#0a192f',
                                padding: '50px',
                                color: 'white',
                                position: 'sticky',
                                top: '120px',
                                borderTop: '6px solid var(--gold-accent)'
                            }}>
                                <h4 style={{ fontSize: '20px', fontWeight: '950', marginBottom: '40px', letterSpacing: '1px' }}>Hồ Sơ Dự Án</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    <div>
                                        <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '800', letterSpacing: '2px' }}>Chủ đầu tư</span>
                                        <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '5px' }}>Đối tác chiến lược CHOLONCONS</p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '800', letterSpacing: '2px' }}>Quy mô & Lĩnh vực</span>
                                        <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '5px' }}>{project.category}</p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '800', letterSpacing: '2px' }}>Thời gian thi công</span>
                                        <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '5px' }}>Năm {project.year}</p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', fontWeight: '800', letterSpacing: '2px' }}>Tình trạng</span>
                                        <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '5px', color: 'var(--gold-accent)' }}>Bàn giao thành công ✓</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid - High Impact */}
            {project.images && project.images.length > 0 && (
                <section style={{ padding: '100px 0', background: '#f8fafc' }}>
                    <div className="container">
                        <div className="text-center mb-80 fade-in">
                            <span style={{ color: 'var(--gold-accent)', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                                <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                                Hình ảnh hiện trường
                                <span style={{ width: '30px', height: '2px', background: 'var(--gold-accent)' }}></span>
                            </span>
                            <h2 style={{ fontSize: '42px', color: '#0a192f', fontWeight: '950' }}>Chi Tiết Triển Khai</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                            {project.images.map((img: string, idx: number) => (
                                <div key={idx} className="fade-in" style={{ height: '500px', overflow: 'hidden', borderRadius: '0' }}>
                                    <img src={img} alt={`${project.name} gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <section style={{ backgroundColor: '#0a192f', padding: '160px 0', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', fontSize: '20vw', fontWeight: '950', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }}>CHOLON</div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '56px', fontWeight: '950', marginBottom: '40px' }}>Kiến tạo giải pháp đẳng cấp</h2>
                    <p style={{ fontSize: '24px', opacity: 0.8, maxWidth: '800px', margin: '0 auto 60px', fontWeight: 300 }}>Bạn đang tìm kiếm cộng sự tin cậy cho dự án sắp tới? Hãy kết nối với đội ngũ chuyên gia của chúng tôi.</p>
                    <Link href="/lien-he" className="btn btn-primary" style={{ padding: '25px 80px', borderRadius: '0', fontWeight: '900', fontSize: '20px', backgroundColor: 'var(--gold-accent)', border: 'none', color: '#0a192f', textTransform: 'uppercase', letterSpacing: '4px' }}>Hợp tác ngay</Link>
                </div>
            </section>
        </main>
    );
}
