'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header({ initialConfig }: { initialConfig?: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const companyName = initialConfig?.general?.companyName || "XÂY LẮP CHỢ LỚN";
  const logoImage = initialConfig?.general?.logoUrl || "/logo.jpg";

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <img
              src={logoImage}
              alt="Logo Cty"
              className={styles.logoImage}
              onError={(e) => {
                console.error("Logo failed to load:", logoImage);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTop}>CÔNG TY CỔ PHẦN</span>
              <span className={styles.logoMain}>
                XÂY LẮP <span className={styles.logoHighlightSmall}>CHỢ LỚN</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMenuOpen ? styles.toggleActive : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul>
            <li><Link href="/" className={pathname === '/' ? styles.active : ''}>Trang chủ</Link></li>
            <li><Link href="/gioi-thieu" className={pathname === '/gioi-thieu' ? styles.active : ''}>Giới thiệu</Link></li>
            <li><Link href="/du-an" className={pathname === '/du-an' ? styles.active : ''}>Dự án</Link></li>
            <li><Link href="/tin-tuc" className={pathname === '/tin-tuc' ? styles.active : ''}>Tin tức</Link></li>
            <li><Link href="/lien-he" className={pathname === '/lien-he' ? styles.active : ''}>Liên hệ</Link></li>
          </ul>

          <div className={styles.mobileCta}>
            <Link href="/lien-he" className="btn btn-primary">Yêu cầu báo giá</Link>
          </div>
        </nav>

        <div className={styles.cta}>
          <Link href="/lien-he" className="btn btn-primary">Yêu cầu báo giá</Link>
        </div>
      </div>
    </header>
  );
}
