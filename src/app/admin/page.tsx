"use client";
import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Link from 'next/link';

export default function AdminPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'

    // Form states
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
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
    };

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
        setMessage('Đang xử lý...');

        const postData = {
            id: currentPost?.id,
            title,
            category,
            excerpt,
            content,
            image: images[0] || '/hero.png', // Main image
            images, // All images array
            videoUrl
        };

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch('/api/posts', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            if (res.ok) {
                setMessage(isEditing ? 'Cập nhật thành công!' : 'Đã đăng bài thành công!');
                resetForm();
                fetchPosts();
                setActiveTab('list');
            } else {
                setMessage('Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch (error) {
            setMessage('Lỗi kết nối máy chủ.');
        }
    };

    const handleEdit = (post: any) => {
        setIsEditing(true);
        setCurrentPost(post);
        setTitle(post.title);
        setCategory(post.category || 'Xây dựng Dân dụng & Công nghiệp');
        setExcerpt(post.excerpt);
        setContent(post.content);
        setVideoUrl(post.videoUrl || '');
        setImages(post.images || [post.image]);
        setActiveTab('form');
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;

        try {
            const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
                setMessage('Đã xóa bài viết.');
            }
        } catch (error) {
            setMessage('Lỗi khi xóa bài viết.');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentPost(null);
        setTitle('');
        setExcerpt('');
        setContent('');
        setVideoUrl('');
        setImages([]);
        setMessage('');
    };

    const handleGenerateAI = async () => {
        if (!aiTopic) {
            setMessage('Vui lòng nhập chủ đề bài viết!');
            return;
        }
        setIsGenerating(true);
        setMessage('AI đang phân tích và soạn thảo bài viết, vui lòng đợi...');
        try {
            const res = await fetch('/api/ai-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: aiTopic, keywords: aiKeywords })
            });
            const data = await res.json();
            if (res.ok) {
                setTitle(data.title);
                setExcerpt(data.excerpt);
                setContent(data.content);
                setActiveTab('form');
                setMessage('AI đã viết xong! Vui lòng kiểm tra, chọn hình ảnh chuyên mục trước khi xuất bản.');
            } else {
                setMessage('Lỗi AI: ' + (data.error || 'Thử lại sau. Kiểm tra GEMINI_API_KEY.'));
            }
        } catch (error) {
            setMessage('Lỗi kết nối API AI.');
        }
        setIsGenerating(false);
    };

    return (
        <div className={styles.adminContainer}>
            <div className="container">
                <div className={styles.adminHeader}>
                    <h1 className="fade-in">Quản Trị Hệ Sinh Thái Nội Dung</h1>
                    <div className={styles.adminActions}>
                        <button
                            className={`btn ${activeTab === 'list' ? 'btn-primary' : ''}`}
                            onClick={() => setActiveTab('list')}
                        >Danh sách bài</button>
                        <button
                            className={`btn ${activeTab === 'form' ? 'btn-primary' : ''}`}
                            onClick={() => { resetForm(); setActiveTab('form'); }}
                        >+ Thêm bài mới</button>
                        <button
                            className={`btn ${activeTab === 'ai' ? 'btn-primary' : ''}`}
                            onClick={() => setActiveTab('ai')}
                            style={{ backgroundColor: activeTab === 'ai' ? '#10a37f' : 'transparent', color: activeTab === 'ai' ? 'white' : 'inherit', border: activeTab === 'ai' ? 'none' : '1px solid #ddd' }}
                        >✨ Trợ lý AI</button>
                    </div>
                </div>

                {message && <div className={styles.alert}>{message}</div>}

                {activeTab === 'list' ? (
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
                                            <td>
                                                <div className={styles.thumbnail}>
                                                    <img src={post.image} alt="thumb" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.postMeta}>
                                                    <span className={styles.postTitle}>{post.title}</span>
                                                    <span className={styles.postCategory}>{post.category}</span>
                                                </div>
                                            </td>
                                            <td>{post.date}</td>
                                            <td>
                                                <div className={styles.actionBtns}>
                                                    <button onClick={() => handleEdit(post)} className={styles.editBtn}>Sửa</button>
                                                    <button onClick={() => handleDelete(post.id)} className={styles.deleteBtn}>Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : activeTab === 'ai' ? (
                    <div className={`${styles.adminForm} fade-in`}>
                        <h2 className="mb-30" style={{ color: 'var(--primary-dark)' }}>✨ Trợ lý Viết Bài Tự Động (Gemini API)</h2>
                        <p style={{ marginBottom: '20px', color: '#666' }}>Hệ thống AI sẽ tự động nghiên cứu và viết bài chuẩn SEO dựa trên chủ đề của bạn. Sau khi AI viết xong, bạn có thể chỉnh sửa lại trước khi xuất bản.</p>
                        <div className={styles.formGroup}>
                            <label>Chủ đề bài viết mong muốn (*)</label>
                            <input
                                type="text"
                                placeholder="VD: Tương lai của điện năng lượng mặt trời áp mái năm 2025"
                                className={styles.input}
                                value={aiTopic}
                                onChange={e => setAiTopic(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Từ khóa SEO gợi ý (Tùy chọn)</label>
                            <input
                                type="text"
                                placeholder="VD: điện mặt trời, tiết kiệm điện, năng lượng xanh"
                                className={styles.input}
                                value={aiKeywords}
                                onChange={e => setAiKeywords(e.target.value)}
                            />
                        </div>
                        <div className={styles.formBtns} style={{ marginTop: '30px' }}>
                            <button onClick={handleGenerateAI} disabled={isGenerating} className="btn btn-primary" style={{ backgroundColor: '#10a37f', color: 'white' }}>
                                {isGenerating ? 'Đang sáng tạo...' : 'Bắt đầu viết bài'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.adminForm} fade-in`}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Tiêu đề bài viết / Dự án</label>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề sang trọng và thu hút..."
                                    className={styles.input}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Chuyên mục</label>
                                    <select
                                        className={styles.input}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
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
                                    <input
                                        type="url"
                                        placeholder="https://youtube.com/watch?v=..."
                                        className={styles.input}
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Trích dẫn ngắn (Excerpt)</label>
                                <textarea
                                    placeholder="Mô tả ngắn gọn về bài viết để thu hút người đọc..."
                                    className={styles.textarea}
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Nội dung chi tiết</label>
                                <textarea
                                    placeholder="Viết nội dung bài viết một cách chuyên nghiệp tại đây..."
                                    className={`${styles.textarea} ${styles.largeTextarea}`}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Hình ảnh (Có thể chọn nhiều ảnh)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className={styles.input}
                                    onChange={handleImageChange}
                                />
                                <div className={styles.imageGallery}>
                                    {images.map((img, idx) => (
                                        <div key={idx} className={styles.previewItem}>
                                            <img src={img} alt="preview" />
                                            <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formBtns}>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Cập Nhật Bài Viết' : 'Xuất Bản Bài Viết'}
                                </button>
                                <button type="button" className={styles.cancelLink} onClick={() => { resetForm(); setActiveTab('list'); }}>
                                    Hủy bỏ & Quay lại
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
