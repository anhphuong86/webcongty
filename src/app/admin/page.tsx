"use client";
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

// --- Types ---
interface Post { id: number; category: string; title: string; date: string; excerpt: string; content: string; image: string; }
interface Project { id: string; name: string; category: string; image: string; year: string; }
interface MediaFile { name: string; url: string; size: number; mtime: string; }

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('config'); // config, pages, services, posts, projects, media
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Core Data
    const [posts, setPosts] = useState<Post[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [media, setMedia] = useState<MediaFile[]>([]);

    // Form / Modal States
    const [editingPost, setEditingPost] = useState<any>(null);
    const [editingProj, setEditingProj] = useState<any>(null);

    useEffect(() => {
        if (sessionStorage.getItem('admin_auth') === 'true') {
            setIsLoggedIn(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [p, c, pr, m] = await Promise.all([
                fetch('/api/posts').then(res => res.json()),
                fetch('/api/config').then(res => res.json()),
                fetch('/api/projects').then(res => res.json()),
                fetch('/api/media').then(res => res.json())
            ]);
            setPosts(p); setConfig(c); setProjects(pr); setMedia(m);
        } catch (e) { setMessage('Lỗi tải dữ liệu.'); }
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'xaylapcholon@anhphuong86') {
            setIsLoggedIn(true);
            sessionStorage.setItem('admin_auth', 'true');
            fetchData();
        } else { alert('Mật khẩu sai!'); }
    };

    const saveConfig = async (newConfig = config) => {
        setMessage('Đang lưu...');
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newConfig)
            });
            if (res.ok) {
                setMessage('Cập nhật thành công!');
                setConfig(newConfig);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (e) { setMessage('Lỗi lưu cấu hình.'); }
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
            fetchData(); // Refresh all
            return data.url;
        }
        return null;
    };

    // --- Post Actions ---
    const savePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingPost.id ? 'PUT' : 'POST';
        const res = await fetch('/api/posts', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingPost)
        });
        if (res.ok) { fetchData(); setEditingPost(null); setMessage('Đã lưu bài viết!'); }
    };

    const deletePost = async (id: number) => {
        if (!confirm('Xóa bài viết này?')) return;
        const res = await fetch('/api/posts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.ok) fetchData();
    };

    // --- Project Actions ---
    const saveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = projects.find(p => p.id === editingProj.id) ? 'PUT' : 'POST';
        const res = await fetch('/api/projects', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProj)
        });
        if (res.ok) { fetchData(); setEditingProj(null); setMessage('Đã lưu dự án!'); }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Xóa dự án này?')) return;
        const res = await fetch('/api/projects', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (res.ok) fetchData();
    };

    // --- Media Actions ---
    const deleteMedia = async (name: string) => {
        if (!confirm('Xóa vĩnh viễn tệp này?')) return;
        const res = await fetch('/api/media', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (res.ok) fetchData();
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginGlass}>
                    <img src="/logo.jpg" className={styles.loginLogo} />
                    <h1>CHOLONCONS ADMIN</h1>
                    <p>Enter administrative key to unlock</p>
                    <form onSubmit={handleLogin}>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoFocus />
                        <button type="submit">XÁC THỰC TRUY CẬP</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminElite}>
            {/* Elite Sidebar */}
            <aside className={styles.eliteSidebar}>
                <div className={styles.sideBrand}>
                    <img src="/logo.jpg" />
                    <div>
                        <strong>CHOLONCONS</strong>
                        <span>Control Portal v2.0</span>
                    </div>
                </div>

                <nav className={styles.eliteNav}>
                    <div className={styles.navGroup}>NỀN TẢNG</div>
                    <button className={activeTab === 'config' ? styles.active : ''} onClick={() => setActiveTab('config')}>⚙️ Cấu hình chung</button>
                    <button className={activeTab === 'pages' ? styles.active : ''} onClick={() => setActiveTab('pages')}>📄 Nội dung Trang</button>
                    <button className={activeTab === 'services' ? styles.active : ''} onClick={() => setActiveTab('services')}>🛠️ Dịch vụ & Năng lực</button>

                    <div className={styles.navGroup}>DỮ LIỆU</div>
                    <button className={activeTab === 'posts' ? styles.active : ''} onClick={() => setActiveTab('posts')}>📰 Bản tin Tin tức</button>
                    <button className={activeTab === 'projects' ? styles.active : ''} onClick={() => setActiveTab('projects')}>🏗️ Hồ sơ Dự án</button>
                    <button className={activeTab === 'media' ? styles.active : ''} onClick={() => setActiveTab('media')}>🖼️ Kho Media</button>
                </nav>

                <div className={styles.sideFooter}>
                    <button onClick={() => { sessionStorage.removeItem('admin_auth'); setIsLoggedIn(false); }}>ĐĂNG XUẤT</button>
                </div>
            </aside>

            {/* Elite Content */}
            <main className={styles.eliteMain}>
                <header className={styles.eliteHeader}>
                    <h2>{activeTab.toUpperCase()} MANAGEMENT</h2>
                    {message && <span className={styles.statusToast}>{message}</span>}
                </header>

                <div className={styles.scrollArea}>
                    {/* CONFIG TAB */}
                    {activeTab === 'config' && config && (
                        <div className={styles.glassCard}>
                            <h3>1. NHẬN DIỆN THƯƠNG HIỆU</h3>
                            <div className={styles.formGrid}>
                                <div className={styles.field}><label>Tên Công Ty</label><input type="text" value={config.general.companyName} onChange={e => setConfig({ ...config, general: { ...config.general, companyName: e.target.value } })} /></div>
                                <div className={styles.field}><label>Slogan Thương Hiệu</label><input type="text" value={config.general.slogan} onChange={e => setConfig({ ...config, general: { ...config.general, slogan: e.target.value } })} /></div>
                                <div className={styles.field}><label>Hotline</label><input type="text" value={config.contact.phone} onChange={e => setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })} /></div>
                                <div className={styles.field}><label>Email</label><input type="text" value={config.contact.email} onChange={e => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })} /></div>
                            </div>
                            <button className={styles.saveBtn} onClick={() => saveConfig()}>LƯU CẤU HÌNH</button>
                        </div>
                    )}

                    {/* PAGES TAB */}
                    {activeTab === 'pages' && config && (
                        <div className={styles.glassCard}>
                            <h3>2. TRANG CHỦ & GIỚI THIỆU</h3>
                            <div className={styles.field}><label>Hero Tiêu Đề</label><textarea rows={2} value={config.home.heroTitle} onChange={e => setConfig({ ...config, home: { ...config.home, heroTitle: e.target.value } })} /></div>
                            <div className={styles.field}><label>Hero Slogan</label><textarea rows={3} value={config.home.heroSlogan} onChange={e => setConfig({ ...config, home: { ...config.home, heroSlogan: e.target.value } })} /></div>
                            <hr style={{ opacity: 0.1, margin: '30px 0' }} />
                            <div className={styles.field}><label>Tầm nhìn (Vision)</label><textarea rows={3} value={config.about.vision} onChange={e => setConfig({ ...config, about: { ...config.about, vision: e.target.value } })} /></div>
                            <div className={styles.field}><label>Sứ mệnh (Mission)</label><textarea rows={3} value={config.about.mission} onChange={e => setConfig({ ...config, about: { ...config.about, mission: e.target.value } })} /></div>
                            <button className={styles.saveBtn} onClick={() => saveConfig()}>CẬP NHẬT NỘI DUNG</button>
                        </div>
                    )}

                    {/* SERVICES TAB */}
                    {activeTab === 'services' && config && (
                        <div className={styles.glassCard}>
                            <h3>3. HÌNH ẢNH DỊCH VỤ & NĂNG LỰC</h3>
                            <div className={styles.imageGrid}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className={styles.imageBox}>
                                        <label>Dịch vụ {i}</label>
                                        <div className={styles.imgPreview}>
                                            <img src={(config.services as any)[`img${i}`]} />
                                            <input type="file" onChange={async e => {
                                                const url = await handleUpload(e.target.files![0]);
                                                if (url) saveConfig({ ...config, services: { ...config.services, [`img${i}`]: url } });
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* POSTS TAB */}
                    {activeTab === 'posts' && (
                        <div className={styles.dataModule}>
                            <div className={styles.moduleHeader}>
                                <h3>DANH SÁCH TIN TỨC ({posts.length})</h3>
                                <button className={styles.addBtn} onClick={() => setEditingPost({ title: '', category: 'Tin công ty', content: '', excerpt: '', image: '', date: new Date().toLocaleDateString('vi-VN') })}>+ THÊM BÀI MỚI</button>
                            </div>

                            {editingPost && (
                                <div className={styles.modalOverlay}>
                                    <div className={styles.glassCard + ' ' + styles.modal}>
                                        <h3>{editingPost.id ? 'HIỆU CHỈNH BÀI VIẾT' : 'TẠO BÀI VIẾT MỚI'}</h3>
                                        <form onSubmit={savePost}>
                                            <div className={styles.field}><label>Tiêu đề</label><input required value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} /></div>
                                            <div className={styles.formGrid}>
                                                <div className={styles.field}><label>Danh mục</label><input value={editingPost.category} onChange={e => setEditingPost({ ...editingPost, category: e.target.value })} /></div>
                                                <div className={styles.field}><label>Ngày đăng</label><input value={editingPost.date} onChange={e => setEditingPost({ ...editingPost, date: e.target.value })} /></div>
                                            </div>
                                            <div className={styles.field}><label>Ảnh đại diện (URL)</label><input value={editingPost.image} onChange={e => setEditingPost({ ...editingPost, image: e.target.value })} /></div>
                                            <div className={styles.field}><label>Nội dung</label><textarea rows={10} value={editingPost.content} onChange={e => setEditingPost({ ...editingPost, content: e.target.value })} /></div>
                                            <div className={styles.modalBtns}>
                                                <button type="button" onClick={() => setEditingPost(null)}>HỦY BỎ</button>
                                                <button type="submit" className={styles.saveBtn}>LƯU BÀI VIẾT</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className={styles.tableWrapper}>
                                <table className={styles.eliteTable}>
                                    <thead><tr><th>Tiêu đề</th><th>Danh mục</th><th>Ngày</th><th>Thao tác</th></tr></thead>
                                    <tbody>
                                        {posts.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.title}</td>
                                                <td>{p.category}</td>
                                                <td>{p.date}</td>
                                                <td>
                                                    <button onClick={() => setEditingPost(p)}>Sửa</button>
                                                    <button onClick={() => deletePost(p.id)} style={{ color: '#f87171' }}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className={styles.dataModule}>
                            <div className={styles.moduleHeader}>
                                <h3>HỒ SƠ DỰ ÁN ({projects.length})</h3>
                                <button className={styles.addBtn} onClick={() => setEditingProj({ id: Date.now().toString(), name: '', category: 'Dân dụng', year: '2024', image: '' })}>+ THÊM DỰ ÁN</button>
                            </div>

                            {editingProj && (
                                <div className={styles.modalOverlay}>
                                    <div className={styles.glassCard + ' ' + styles.modal}>
                                        <h3>THÔNG TIN DỰ ÁN</h3>
                                        <form onSubmit={saveProject}>
                                            <div className={styles.field}><label>Tên dự án</label><input required value={editingProj.name} onChange={e => setEditingProj({ ...editingProj, name: e.target.value })} /></div>
                                            <div className={styles.formGrid}>
                                                <div className={styles.field}><label>Lĩnh vực</label><input value={editingProj.category} onChange={e => setEditingProj({ ...editingProj, category: e.target.value })} /></div>
                                                <div className={styles.field}><label>Năm hoàn thành</label><input value={editingProj.year} onChange={e => setEditingProj({ ...editingProj, year: e.target.value })} /></div>
                                            </div>
                                            <div className={styles.field}><label>Ảnh công trình (URL)</label><input value={editingProj.image} onChange={e => setEditingProj({ ...editingProj, image: e.target.value })} /></div>
                                            <div className={styles.modalBtns}>
                                                <button type="button" onClick={() => setEditingProj(null)}>HỦY BỎ</button>
                                                <button type="submit" className={styles.saveBtn}>LƯU DỰ ÁN</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className={styles.projectsGridAdmin}>
                                {projects.map(p => (
                                    <div key={p.id} className={styles.projCardAdmin}>
                                        <img src={p.image} />
                                        <div className={styles.projMeta}>
                                            <strong>{p.name}</strong>
                                            <span>{p.category} • {p.year}</span>
                                        </div>
                                        <div className={styles.projActions}>
                                            <button onClick={() => setEditingProj(p)}>SỬA</button>
                                            <button onClick={() => deleteProject(p.id)} style={{ color: '#f87171' }}>XÓA</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MEDIA TAB */}
                    {activeTab === 'media' && (
                        <div className={styles.dataModule}>
                            <div className={styles.moduleHeader}>
                                <h3>THƯ VIỆN HÌNH ẢNH ({media.length})</h3>
                                <div className={styles.uploadBtn}>
                                    <label>TẢI LÊN ẢNH MỚI</label>
                                    <input type="file" onChange={e => handleUpload(e.target.files![0])} />
                                </div>
                            </div>
                            <div className={styles.mediaGallery}>
                                {media.map(m => (
                                    <div key={m.name} className={styles.mediaCard}>
                                        <img src={m.url} />
                                        <div className={styles.mediaInfo}>
                                            <span className={styles.fileName}>{m.name}</span>
                                            <button onClick={() => { navigator.clipboard.writeText(window.location.origin + m.url); setMessage('Đã sao chép URL!'); setTimeout(() => setMessage(''), 2000); }}>COPY URL</button>
                                            <button onClick={() => deleteMedia(m.name)} style={{ color: '#f87171' }}>XÓA</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
