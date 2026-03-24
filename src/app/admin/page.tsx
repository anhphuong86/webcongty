"use client";
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

// --- Types ---
interface Post { id: number; category: string; title: string; date: string; excerpt: string; content: string; image: string; }
interface Project { id: string; name: string; category: string; image: string; year: string; }

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

    // Form States
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editingProj, setEditingProj] = useState<Project | null>(null);

    useEffect(() => {
        if (sessionStorage.getItem('admin_auth') === 'true') {
            setIsLoggedIn(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [p, c, pr] = await Promise.all([
                fetch('/api/posts').then(res => res.json()),
                fetch('/api/config').then(res => res.json()),
                fetch('/api/projects').then(res => res.json())
            ]);
            setPosts(p); setConfig(c); setProjects(pr);
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
            }
        } catch (e) { setMessage('Lỗi lưu cấu hình.'); }
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.success ? data.url : null;
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
                                <div className={styles.field}>
                                    <label>Tên Công Ty</label>
                                    <input type="text" value={config.general.companyName} onChange={e => setConfig({ ...config, general: { ...config.general, companyName: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Slogan Thương Hiệu</label>
                                    <input type="text" value={config.general.slogan} onChange={e => setConfig({ ...config, general: { ...config.general, slogan: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Hotline</label>
                                    <input type="text" value={config.contact.phone} onChange={e => setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })} />
                                </div>
                                <div className={styles.field}>
                                    <label>Email</label>
                                    <input type="text" value={config.contact.email} onChange={e => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })} />
                                </div>
                            </div>
                            <button className={styles.saveBtn} onClick={() => saveConfig()}>LƯU CẤU HÌNH</button>
                        </div>
                    )}

                    {/* PAGES TAB (Vision, Mission, Hero Content) */}
                    {activeTab === 'pages' && config && (
                        <div className={styles.glassCard}>
                            <h3>2. TRANG CHỦ & GIỚI THIỆU</h3>
                            <div className={styles.field}>
                                <label>Hero Tiêu Đề (Trang chủ)</label>
                                <textarea rows={2} value={config.home.heroTitle} onChange={e => setConfig({ ...config, home: { ...config.home, heroTitle: e.target.value } })} />
                            </div>
                            <div className={styles.field}>
                                <label>Hero Slogan</label>
                                <textarea rows={3} value={config.home.heroSlogan} onChange={e => setConfig({ ...config, home: { ...config.home, heroSlogan: e.target.value } })} />
                            </div>
                            <hr style={{ opacity: 0.1, margin: '30px 0' }} />
                            <div className={styles.field}>
                                <label>Tầm nhìn (Vision)</label>
                                <textarea rows={3} value={config.about.vision} onChange={e => setConfig({ ...config, about: { ...config.about, vision: e.target.value } })} />
                            </div>
                            <div className={styles.field}>
                                <label>Sứ mệnh (Mission)</label>
                                <textarea rows={3} value={config.about.mission} onChange={e => setConfig({ ...config, about: { ...config.about, mission: e.target.value } })} />
                            </div>
                            <button className={styles.saveBtn} onClick={() => saveConfig()}>CẬP NHẬT NỘI DUNG TRANG</button>
                        </div>
                    )}

                    {/* SERVICES & TRUST TAB */}
                    {activeTab === 'services' && config && (
                        <div className={styles.glassCard}>
                            <h3>3. HÌNH ẢNH DỊCH VỤ & NĂNG LỰC</h3>
                            <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '20px' }}>Thay đổi hình ảnh đại diện cho các khối chuyên môn trên Trang Chủ.</p>
                            <div className={styles.imageGrid}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className={styles.imageBox}>
                                        <label>Dịch vụ {i}</label>
                                        <div className={styles.imgPreview}>
                                            <img src={(config.services as any)[`img${i}`]} />
                                            <input type="file" onChange={async e => {
                                                const url = await handleUpload(e.target.files![0]);
                                                if (url) {
                                                    const newConf = { ...config, services: { ...config.services, [`img${i}`]: url } };
                                                    saveConfig(newConf);
                                                }
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Placeholder for others */}
                    {(activeTab === 'posts' || activeTab === 'projects' || activeTab === 'media') && (
                        <div className={styles.emptyState}>
                            <h3>Đang nâng cấp module chuyên sâu...</h3>
                            <p>Tính năng {activeTab} đang được đồng bộ hóa với hệ thống quản trị Agency.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
