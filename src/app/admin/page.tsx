"use client";
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';

export default function AdminPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('list'); // 'list', 'form', 'ai', 'config'

    // Form states (Posts)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Xây dựng Dân dụng & Công nghiệp');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [images, setImages] = useState<string[]>([]);

    // AI states
    const [aiTopic, setAiTopic] = useState('');
    const [aiKeywords, setAiKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        fetchPosts();
        fetchConfig();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
    };

    const fetchConfig = async () => {
        const res = await fetch('/api/config');
        if (res.ok) {
            const data = await res.json();
            setConfig(data);
        }
    };

    // --- Post Handlers ---
    const handleImageChange = (e: any) => {
        const files = Array.from(e.target.files);
        files.forEach((file: any) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage('Đang xử lý bài viết...');

        const postData = {
            id: currentPost?.id, title, category, excerpt, content,
            image: images[0] || '/hero.png', images, videoUrl
        };

        const method = isEditing ? 'PUT' : 'POST';
        try {
            const res = await fetch('/api/posts', {
                method, headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            if (res.ok) {
                setMessage(isEditing ? 'Cập nhật thành công!' : 'Đã đăng bài thành công!');
                resetForm(); fetchPosts(); setActiveTab('list');
            } else {
                setMessage('Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            setMessage('Lỗi kết nối máy chủ.');
        }
    };

    const handleEdit = (post: any) => {
        setIsEditing(true); setCurrentPost(post); setTitle(post.title);
        setCategory(post.category || 'Xây dựng Dân dụng & Công nghiệp');
        setExcerpt(post.excerpt); setContent(post.content); setVideoUrl(post.videoUrl || '');
        setImages(post.images || [post.image]); setActiveTab('form');
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
            if (res.ok) { fetchPosts(); setMessage('Đã xóa bài viết.'); }
        } catch (error) { setMessage('Lỗi khi xóa bài viết.'); }
    };

    const resetForm = () => {
        setIsEditing(false); setCurrentPost(null); setTitle(''); setExcerpt('');
        setContent(''); setVideoUrl(''); setImages([]); setMessage('');
    };

    // --- AI Handlers ---
    const handleGenerateAI = async () => {
        if (!aiTopic) { setMessage('Vui lòng nhập chủ đề bài viết!'); return; }
        setIsGenerating(true); setMessage('AI đang suy nghĩ và viết bài...');
        try {
            const res = await fetch('/api/ai-generate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: aiTopic, keywords: aiKeywords })
            });
            const data = await res.json();
            if (res.ok) {
                setTitle(data.title); setExcerpt(data.excerpt); setContent(data.content);
                setActiveTab('form'); setMessage('AI đã viết xong! Vui lòng kiểm tra và xuất bản.');
            } else { setMessage('Lỗi AI: Vui lòng kiểm tra API Key.'); }
        } catch (error) { setMessage('Lỗi kết nối API AI.'); }
        setIsGenerating(false);
    };

    // --- Config Handlers ---
    const handleConfigChange = (section: string, key: string, value: string) => {
        setConfig({
            ...config,
            [section]: {
                ...config[section],
                [key]: value
            }
        });
    };

    const handleConfigImageChange = (e: any, section: string, key: string) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleConfigChange(section, key, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveConfig = async () => {
        setMessage('Đang lưu cấu hình...');
        try {
            const res = await fetch('/api/config', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            if (res.ok) {
                setMessage('Lưu cấu hình website thành công!');
            } else {
                setMessage('Lỗi khi lưu cấu hình.');
            }
        } catch (error) {
            setMessage('Lỗi kết nối máy chủ.');
        }
    };

    return (
        <div className={styles.adminContainer}>
            <div className="container">
                <div className={styles.adminHeader} style={{ flexWrap: 'wrap', gap: '20px' }}>
                    <h1 className="fade-in">CMS Administration V19</h1>
                    <div className={styles.adminActions}>
                        <button className={`btn ${activeTab === 'list' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('list')}>Bài viết</button>
                        <button className={`btn ${activeTab === 'form' ? 'btn-primary' : ''}`} onClick={() => { resetForm(); setActiveTab('form'); }}>+ Thêm bài mới</button>
                        <button className={`btn ${activeTab === 'config' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('config')} style={{ backgroundColor: activeTab === 'config' ? '#0a192f' : 'transparent', color: activeTab === 'config' ? 'white' : '#0a192f', border: '1px solid #0a192f' }}>⚙ Cấu hình Website</button>
                        <button className={`btn ${activeTab === 'ai' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('ai')} style={{ backgroundColor: activeTab === 'ai' ? '#10a37f' : 'transparent', color: activeTab === 'ai' ? 'white' : 'inherit', border: activeTab === 'ai' ? 'none' : '1px solid #ddd' }}>✨ Trợ lý AI</button>
                    </div>
                </div>

                {message && <div className={styles.alert}>{message}</div>}

                {/* TAB: DANH SÁCH BÀI VIẾT */}
                {activeTab === 'list' && (
                    <div className={`${styles.postsTableWrapper} fade-in`}>
                        {loading ? <p>Đang tải dữ liệu...</p> : (
                            <table className={styles.postsTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Hình ảnh</th>
                                        <th>Tiêu đề & Chuyên mục</th>
                                        <th>Ngày đăng</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post: any) => (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td><div className={styles.thumbnail}><img src={post.image} alt="thumb" /></div></td>
                                            <td><div className={styles.postMeta}><span className={styles.postTitle}>{post.title}</span><span className={styles.postCategory}>{post.category}</span></div></td>
                                            <td>{post.date}</td>
                                            <td><div className={styles.actionBtns}><button onClick={() => handleEdit(post)} className={styles.editBtn}>Sửa</button><button onClick={() => handleDelete(post.id)} className={styles.deleteBtn}>Xóa</button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* TAB: CẤU HÌNH WEBSITE */}
                {activeTab === 'config' && config && (
                    <div className={`${styles.adminForm} fade-in`} style={{ maxWidth: '1000px' }}>
                        <h2 className="mb-30" style={{ color: 'var(--primary-dark)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>⚙ Cài đặt Cấu hình Toàn trang</h2>

                        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                            {/* General & Contact */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h3 className="mb-20" style={{ color: 'var(--primary-color)' }}>1. Thông tin Doanh nghiệp</h3>
                                <div className={styles.formGroup}>
                                    <label>Tên Công Ty</label>
                                    <input type="text" className={styles.input} value={config.general.companyName} onChange={e => handleConfigChange('general', 'companyName', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Slogan / Phương châm</label>
                                    <input type="text" className={styles.input} value={config.general.slogan} onChange={e => handleConfigChange('general', 'slogan', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Số điện thoại Hotline</label>
                                    <input type="text" className={styles.input} value={config.contact.phone} onChange={e => handleConfigChange('contact', 'phone', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email liên hệ</label>
                                    <input type="email" className={styles.input} value={config.contact.email} onChange={e => handleConfigChange('contact', 'email', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Địa chỉ Trụ sở</label>
                                    <textarea className={styles.input} rows={2} value={config.contact.address} onChange={e => handleConfigChange('contact', 'address', e.target.value)} />
                                </div>
                            </div>

                            {/* Home Page Config */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h3 className="mb-20" style={{ color: 'var(--primary-color)' }}>2. Nội dung Trang Chủ</h3>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Nền Hero (Trang Chủ)</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.home.heroImage && <img src={config.home.heroImage} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'home', 'heroImage')} style={{ fontSize: '14px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Tiêu đề Hero (Trang Chủ)</label>
                                    <textarea className={styles.input} rows={2} value={config.home.heroTitle} onChange={e => handleConfigChange('home', 'heroTitle', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Từ khóa Highlight (Chữ Vàng)</label>
                                    <input type="text" className={styles.input} value={config.home.heroHighlight} onChange={e => handleConfigChange('home', 'heroHighlight', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mô tả ngắn Hero</label>
                                    <textarea className={styles.input} rows={3} value={config.home.heroSlogan} onChange={e => handleConfigChange('home', 'heroSlogan', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tiêu đề phần Giới thiệu (Home)</label>
                                    <input type="text" className={styles.input} value={config.home.aboutTitle} onChange={e => handleConfigChange('home', 'aboutTitle', e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Nội dung phần Giới thiệu (Home)</label>
                                    <textarea className={styles.input} rows={4} value={config.home.aboutContent} onChange={e => handleConfigChange('home', 'aboutContent', e.target.value)} />
                                </div>
                            </div>

                            {/* Images & Other */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h3 className="mb-20" style={{ color: 'var(--primary-color)' }}>3. Hình ảnh Các Trang Con</h3>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Giới thiệu Công ty</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.about?.heroImage && <img src={config.about.heroImage} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'about', 'heroImage')} style={{ fontSize: '14px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Cover Trang Dự Án</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.heroImages?.projects && <img src={config.heroImages.projects} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'heroImages', 'projects')} style={{ fontSize: '14px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Cover Trang Tin Tức</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.heroImages?.news && <img src={config.heroImages.news} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'heroImages', 'news')} style={{ fontSize: '14px' }} />
                                    </div>
                                </div>

                                <h3 className="mb-20" style={{ color: 'var(--primary-color)', marginTop: '30px' }}>4. Hình ảnh Dịch Vụ & Năng Lực (Trang Chủ)</h3>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Dịch vụ 1 & 2</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.services?.img1 && <img src={config.services.img1} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img1')} style={{ fontSize: '12px' }} />
                                        {config.services?.img2 && <img src={config.services.img2} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img2')} style={{ fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Dịch vụ 3 & 4</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.services?.img3 && <img src={config.services.img3} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img3')} style={{ fontSize: '12px' }} />
                                        {config.services?.img4 && <img src={config.services.img4} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img4')} style={{ fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Dịch vụ 5 & 6</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.services?.img5 && <img src={config.services.img5} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img5')} style={{ fontSize: '12px' }} />
                                        {config.services?.img6 && <img src={config.services.img6} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'services', 'img6')} style={{ fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Ảnh Bản Lĩnh / Năng lực (Chính & Phụ)</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        {config.trust?.imgMain && <img src={config.trust.imgMain} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'trust', 'imgMain')} style={{ fontSize: '12px' }} />
                                        {config.trust?.imgSide && <img src={config.trust.imgSide} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                        <input type="file" accept="image/*" onChange={(e) => handleConfigImageChange(e, 'trust', 'imgSide')} style={{ fontSize: '12px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formBtns} style={{ marginTop: '40px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                            <button onClick={handleSaveConfig} className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '18px' }}>💾 Lưu Toàn Bộ Cấu Hình</button>
                        </div>
                    </div>
                )}

                {/* TAB: FORM THÊM/SỬA BÀI VIẾT */}
                {activeTab === 'form' && (
                    <div className={`${styles.adminForm} fade-in`}>
                        <form onSubmit={handleSubmit}>
                            {/* Giữ nguyên Form UI như cũ */}
                            <div className={styles.formGroup}>
                                <label>Tiêu đề bài viết / Dự án</label>
                                <input type="text" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Chuyên mục</label>
                                    <select className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option>Xây dựng Dân dụng & Công nghiệp</option>
                                        <option>Điện & Năng lượng Tái tạo</option>
                                        <option>Cấp thoát nước & Điều hòa</option>
                                        <option>Giao thông & Thủy lợi</option>
                                        <option>Thương mại & Dịch vụ Phụ trợ</option>
                                        <option>Nhập khẩu & Phân phối Thiết bị</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Link Video (YouTube/Vimeo)</label>
                                    <input type="url" className={styles.input} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Trích dẫn ngắn (Excerpt)</label>
                                <textarea className={styles.textarea} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Nội dung chi tiết</label>
                                <textarea className={`${styles.textarea} ${styles.largeTextarea}`} value={content} onChange={(e) => setContent(e.target.value)} required />
                            </div>
                            <div className={styles.formBtns}>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Cập Nhật' : 'Xuất Bản'}</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TAB: TRỢ LÝ AI */}
                {activeTab === 'ai' && (
                    <div className={`${styles.adminForm} fade-in`}>
                        <h2 className="mb-30" style={{ color: 'var(--primary-dark)' }}>✨ Trợ lý Viết Bài Tự Động (Gemini API)</h2>
                        <div className={styles.formGroup}>
                            <label>Chủ đề bài viết mong muốn (*)</label>
                            <input type="text" className={styles.input} value={aiTopic} onChange={e => setAiTopic(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Từ khóa SEO gợi ý (Tùy chọn)</label>
                            <input type="text" className={styles.input} value={aiKeywords} onChange={e => setAiKeywords(e.target.value)} />
                        </div>
                        <div className={styles.formBtns} style={{ marginTop: '30px' }}>
                            <button onClick={handleGenerateAI} disabled={isGenerating} className="btn btn-primary" style={{ backgroundColor: '#10a37f', color: 'white' }}>
                                {isGenerating ? 'Đang sáng tạo...' : 'Bắt đầu viết bài'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
