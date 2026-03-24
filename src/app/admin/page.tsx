"use client";
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';

// --- Types ---
interface Post {
    id: number;
    category: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
}

interface Project {
    id: string;
    name: string;
    category: string;
    image: string;
    year: string;
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('config'); // 'config', 'news', 'projects', 'media'
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // News Form states
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [postTitle, setPostTitle] = useState('');
    const [postCat, setPostCat] = useState('Công nghệ & BIM');
    const [postExcerpt, setPostExcerpt] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState('');

    // Project Form states
    const [editingProj, setEditingProj] = useState<Project | null>(null);
    const [projName, setProjName] = useState('');
    const [projCat, setProjCat] = useState('Thương mại');
    const [projYear, setProjYear] = useState('2024');
    const [projImage, setProjImage] = useState('');

    useEffect(() => {
        const savedAuth = sessionStorage.getItem('admin_auth');
        if (savedAuth === 'true') {
            setIsLoggedIn(true);
            fetchInitialData();
        }
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [postsRes, configRes, projsRes] = await Promise.all([
                fetch('/api/posts'),
                fetch('/api/config'),
                fetch('/api/projects')
            ]);
            if (postsRes.ok) setPosts(await postsRes.json());
            if (configRes.ok) setConfig(await configRes.json());
            if (projsRes.ok) setProjects(await projsRes.json());
        } catch (e) {
            console.error("Data fetch failed", e);
        }
        setLoading(false);
    };

    // --- Auth Logic ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'xaylapcholon@anhphuong86') {
            setIsLoggedIn(true);
            sessionStorage.setItem('admin_auth', 'true');
            fetchInitialData();
        } else {
            alert('Mật khẩu không chính xác!');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('admin_auth');
    };

    // --- Media Upload Logic ---
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setMessage('Đang tải ảnh lên...');
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                callback(data.url);
                setMessage('Tải ảnh thành công!');
            } else {
                setMessage('Lỗi khi tải ảnh: ' + data.error);
            }
        } catch (error) {
            setMessage('Lỗi kết nối máy chủ khi upload.');
        }
    };

    // --- News/Post CRUD ---
    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Đang lưu bài viết...');
        const isNew = !editingPost;
        const postData = {
            id: editingPost?.id || Date.now(),
            title: postTitle,
            category: postCat,
            excerpt: postExcerpt,
            content: postContent,
            image: postImage || '/hero.png',
            date: editingPost?.date || new Date().toLocaleDateString('vi-VN')
        };

        try {
            const res = await fetch('/api/posts', {
                method: isNew ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            if (res.ok) {
                setMessage('Lưu bài viết thành công!');
                fetchInitialData();
                resetNewsForm();
            }
        } catch (e) { setMessage('Lỗi lưu bài viết.'); }
    };

    const handleDeletePost = async (id: number) => {
        if (!confirm('Xóa bài viết này?')) return;
        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
            if (res.ok) { fetchInitialData(); setMessage('Đã xóa bài.'); }
        } catch (e) { setMessage('Lỗi khi xóa.'); }
    };

    const resetNewsForm = () => {
        setEditingPost(null);
        setPostTitle(''); setPostExcerpt(''); setPostContent(''); setPostImage('');
    };

    const startEditPost = (post: Post) => {
        setEditingPost(post);
        setPostTitle(post.title);
        setPostCat(post.category);
        setPostExcerpt(post.excerpt);
        setPostContent(post.content);
        setPostImage(post.image);
    };

    // --- Projects CRUD ---
    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Đang lưu dự án...');
        const isNew = !editingProj;
        const projData = {
            id: editingProj?.id,
            name: projName,
            category: projCat,
            year: projYear,
            image: projImage || '/hero.png'
        };

        try {
            const res = await fetch('/api/projects', {
                method: isNew ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projData)
            });
            if (res.ok) {
                setMessage('Lưu dự án thành công!');
                fetchInitialData();
                resetProjForm();
            }
        } catch (e) { setMessage('Lỗi lưu dự án.'); }
    };

    const handleDeleteProj = async (id: string) => {
        if (!confirm('Xóa dự án này?')) return;
        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            if (res.ok) { fetchInitialData(); setMessage('Đã xóa dự án.'); }
        } catch (e) { setMessage('Lỗi khi xóa.'); }
    };

    const resetProjForm = () => {
        setEditingProj(null);
        setProjName(''); setProjYear('2024'); setProjImage('');
    };

    const startEditProj = (proj: Project) => {
        setEditingProj(proj);
        setProjName(proj.name);
        setProjCat(proj.category);
        setProjYear(proj.year);
        setProjImage(proj.image);
    };

    // --- Config Save ---
    const handleSaveConfig = async () => {
        setMessage('Đang lưu cấu hình...');
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) setMessage('Cấu hình website đã được cập nhật!');
        } catch (e) { setMessage('Lỗi lưu cấu hình.'); }
    };

    // --- Render Login Gate ---
    if (!isLoggedIn) {
        return (
            <div className={styles.loginOverlay}>
                <div className={styles.loginBox}>
                    <img src="/logo.jpg" alt="Logo" className={styles.loginLogo} />
                    <h2>Hệ Thống Quản Trị CHOLONCONS</h2>
                    <p>Vui lòng nhập mật khẩu để tiếp tục</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Mật khẩu bảo mật"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">Xác Thực Truy Cập</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <img src="/logo.jpg" alt="CHOLONCONS" />
                    <span>CMS CONTROL</span>
                </div>
                <nav className={styles.sideNav}>
                    <button className={activeTab === 'config' ? styles.active : ''} onClick={() => setActiveTab('config')}>⚙ Cấu hình chung</button>
                    <button className={activeTab === 'news' ? styles.active : ''} onClick={() => setActiveTab('news')}>📰 Quản lý Tin tức</button>
                    <button className={activeTab === 'projects' ? styles.active : ''} onClick={() => setActiveTab('projects')}>🏗 Quản lý Dự án</button>
                    <button className={activeTab === 'media' ? styles.active : ''} onClick={() => setActiveTab('media')}>🖼 Thư viện Ảnh</button>
                </nav>
                <button onClick={handleLogout} className={styles.logoutBtn}>Đăng xuất</button>
            </aside>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                <header className={styles.topBar}>
                    <h2>
                        {activeTab === 'config' ? 'Cài đặt Website' :
                            activeTab === 'news' ? 'Quản lý bài viết' :
                                activeTab === 'projects' ? 'Hồ sơ năng lực dự án' : 'Kho phương tiện'}
                    </h2>
                    {message && <div className={styles.topMessage}>{message}</div>}
                </header>

                <div className={styles.contentScroll}>
                    {/* TAB: CẤU HÌNH GENERAL */}
                    {activeTab === 'config' && config && (
                        <div className={styles.formSection}>
                            <h3>1. Thông tin Doanh nghiệp & Liên hệ</h3>
                            <div className={styles.inputGrid}>
                                <div className={styles.inputGroup}>
                                    <label>Tên Công Ty</label>
                                    <input type="text" value={config.general?.companyName} onChange={e => setConfig({ ...config, general: { ...config.general, companyName: e.target.value } })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Hotline</label>
                                    <input type="text" value={config.contact?.phone} onChange={e => setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Email</label>
                                    <input type="text" value={config.contact?.email} onChange={e => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })} />
                                </div>
                            </div>

                            <h3>2. Nội dung Trang Chủ (Hero)</h3>
                            <div className={styles.inputGroup}>
                                <label>Ảnh Nền Hero</label>
                                <div className={styles.imageEdit}>
                                    <img src={config.home?.heroImage} alt="Hero" />
                                    <input type="file" onChange={e => handleFileUpload(e, (url) => setConfig({ ...config, home: { ...config.home, heroImage: url } }))} />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Tiêu đề chính (Dòng 1)</label>
                                <textarea value={config.home?.heroTitle} onChange={e => setConfig({ ...config, home: { ...config.home, heroTitle: e.target.value } })} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Highlight (Dòng mầu vàng)</label>
                                <input type="text" value={config.home?.heroHighlight} onChange={e => setConfig({ ...config, home: { ...config.home, heroHighlight: e.target.value } })} />
                            </div>

                            <button onClick={handleSaveConfig} className="btn btn-primary" style={{ marginTop: '20px' }}>💾 Lưu thay đổi</button>
                        </div>
                    )}

                    {/* TAB: NEWS MANAGEMENT */}
                    {activeTab === 'news' && (
                        <div className={styles.newsSection}>
                            <div className={styles.newsForm}>
                                <h3>{editingPost ? '✏ Chỉnh sửa bài viết' : '➕ Thêm bài viết mới'}</h3>
                                <form onSubmit={handleSavePost}>
                                    <div className={styles.inputGroup}>
                                        <label>Tiêu đề</label>
                                        <input type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Chuyên mục</label>
                                        <select value={postCat} onChange={e => setPostCat(e.target.value)}>
                                            <option>Công nghệ & BIM</option>
                                            <option>Xây dựng Xanh</option>
                                            <option>Hạ tầng Thông minh</option>
                                            <option>Dự án Trọng điểm</option>
                                            <option>Vật liệu Mới</option>
                                            <option>Thị trường & Pháp lý</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Ảnh đại diện</label>
                                        <div className={styles.imageEdit}>
                                            <img src={postImage || '/hero.png'} alt="Preview" />
                                            <input type="file" onChange={e => handleFileUpload(e, setPostImage)} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Trích dẫn ngắn</label>
                                        <textarea value={postExcerpt} onChange={e => setPostExcerpt(e.target.value)} rows={2} required />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Nội dung chi tiết</label>
                                        <textarea value={postContent} onChange={e => setPostContent(e.target.value)} rows={6} required />
                                    </div>
                                    <div className={styles.formActions}>
                                        <button type="submit" className="btn btn-primary">{editingPost ? 'Cập nhật bài viết' : 'Đăng bài ngay'}</button>
                                        {editingPost && <button type="button" onClick={resetNewsForm} className="btn btn-outline">Hủy bỏ</button>}
                                    </div>
                                </form>
                            </div>

                            <div className={styles.newsTable}>
                                <h3>Danh sách bản tin</h3>
                                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ảnh</th>
                                                <th>Tiêu đề</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts.map(post => (
                                                <tr key={post.id}>
                                                    <td><img src={post.image} className={styles.rowThumb} /></td>
                                                    <td className={styles.rowTitle}>{post.title}</td>
                                                    <td>
                                                        <button onClick={() => startEditPost(post)}>Sửa</button>
                                                        <button onClick={() => handleDeletePost(post.id)}>Xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: PROJECT MANAGEMENT */}
                    {activeTab === 'projects' && (
                        <div className={styles.newsSection}>
                            <div className={styles.newsForm}>
                                <h3>{editingProj ? '✏ Chỉnh sửa dự án' : '➕ Thêm dự án mới'}</h3>
                                <form onSubmit={handleSaveProject}>
                                    <div className={styles.inputGrid}>
                                        <div className={styles.inputGroup}>
                                            <label>Tên dự án</label>
                                            <input type="text" value={projName} onChange={e => setProjName(e.target.value)} required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Năm hoàn thành</label>
                                            <input type="text" value={projYear} onChange={e => setProjYear(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Chuyên mục</label>
                                        <select value={projCat} onChange={e => setProjCat(e.target.value)}>
                                            <option>Thương mại</option>
                                            <option>Công nghiệp</option>
                                            <option>Văn phòng</option>
                                            <option>Dân dụng</option>
                                            <option>Nội thất</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Ảnh dự án</label>
                                        <div className={styles.imageEdit}>
                                            <img src={projImage || '/hero.png'} alt="Preview" />
                                            <input type="file" onChange={e => handleFileUpload(e, setProjImage)} />
                                        </div>
                                    </div>
                                    <div className={styles.formActions}>
                                        <button type="submit" className="btn btn-primary">{editingProj ? 'Cập nhật dự án' : 'Thêm dự án'}</button>
                                        {editingProj && <button type="button" onClick={resetProjForm} className="btn btn-outline">Hủy bỏ</button>}
                                    </div>
                                </form>
                            </div>

                            <div className={styles.newsTable}>
                                <h3>Danh sách hồ sơ năng lực</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Dự án</th>
                                            <th>Năm</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map(proj => (
                                            <tr key={proj.id}>
                                                <td><img src={proj.image} className={styles.rowThumb} /></td>
                                                <td className={styles.rowTitle}>{proj.name}</td>
                                                <td>{proj.year}</td>
                                                <td>
                                                    <button onClick={() => startEditProj(proj)}>Sửa</button>
                                                    <button onClick={() => handleDeleteProj(proj.id)}>Xóa</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB: MEDIA LIBRARY */}
                    {activeTab === 'media' && (
                        <div className={styles.mediaSection}>
                            <h3>🖼 Tải lên ảnh vào kho dữ liệu</h3>
                            <div className={styles.uploadBox}>
                                <input type="file" multiple onChange={e => {
                                    const files = e.target.files;
                                    if (files) {
                                        Array.from(files).forEach(f => {
                                            const event = { target: { files: [f] } } as any;
                                            handleFileUpload(event, (url) => {
                                                console.log("Uploaded:", url);
                                            });
                                        });
                                    }
                                }} />
                                <p>Ảnh sẽ được lưu trực tiếp vào thư mục `/public/uploads` với tốc độ load cao.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
