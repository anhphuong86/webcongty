'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './tin-tuc.module.css';

interface Post {
    id: number;
    category: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
}

export default function NewsContent({ initialPosts }: { initialPosts: Post[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    const categories = useMemo(() => {
        const cats = new Set(initialPosts.map(p => p.category));
        return ['Tất cả', ...Array.from(cats)];
    }, [initialPosts]);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'Tất cả' || post.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [initialPosts, searchTerm, activeCategory]);

    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = otherPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(otherPosts.length / postsPerPage);

    return (
        <div className="container">
            {/* Search & Filter Bar */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin tức xây dựng..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </div>
                <div className={styles.categoryFilter}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
                            onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            {featuredPost && currentPage === 1 && !searchTerm && activeCategory === 'Tất cả' && (
                <div className={`${styles.featuredCard} fade-in`}>
                    <div className={styles.featuredImg}>
                        <img src={featuredPost.image} alt={featuredPost.title} />
                        <div className={styles.featuredBadge}>Tiêu Điểm 2026</div>
                    </div>
                    <div className={styles.featuredContent}>
                        <span className={styles.newsDate}>{featuredPost.date} | {featuredPost.category}</span>
                        <h2>{featuredPost.title}</h2>
                        <p>{featuredPost.excerpt}</p>
                        <Link href={`/tin-tuc/${featuredPost.id}`} className={styles.readMoreLarge}>
                            Đọc bài viết chi tiết
                        </Link>
                    </div>
                </div>
            )}

            {/* News Grid */}
            <div className={styles.newsGrid}>
                {currentPosts.map((post, index) => (
                    <div key={post.id} className={`${styles.newsCard} fade-in`} style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className={styles.newsImg}>
                            <img src={post.image} alt={post.title} />
                            <div className={styles.catOverlay}>{post.category}</div>
                        </div>
                        <div className={styles.newsContent}>
                            <span className={styles.newsDateSmall}>{post.date}</span>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <Link href={`/tin-tuc/${post.id}`} className={styles.readMore}>
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={styles.pageBtn}
                    >
                        Trước
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = currentPage;
                        if (currentPage < 3) pageNum = i + 1;
                        else if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;

                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                            <button
                                key={pageNum}
                                className={`${styles.pageBtn} ${currentPage === pageNum ? styles.activePage : ''}`}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={styles.pageBtn}
                    >
                        Tiếp theo
                    </button>
                </div>
            )}

            {filteredPosts.length === 0 && (
                <div className={styles.noResults} style={{ padding: '100px 20px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px dashed #ccc' }}>
                    <h3 style={{ color: 'var(--primary-color)', fontSize: '24px' }}>Hệ thống tin tức đã sẵn sàng</h3>
                    <p style={{ opacity: 0.7, maxWidth: '500px', margin: '15px auto' }}>Toàn bộ nội dung mẫu đã được xóa sạch. Đội ngũ nhân viên hiện có thể bắt đầu nhập liệu các tin tức thực tế của công ty vào hệ thống.</p>
                </div>
            )}
        </div>
    );
}
