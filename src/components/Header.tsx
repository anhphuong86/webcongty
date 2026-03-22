import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>CP Xây Lắp <span className={styles.logoHighlight}>Chợ Lớn</span></span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
            <li><Link href="/du-an">Dự án</Link></li>
            <li><Link href="/tin-tuc">Tin tức</Link></li>
            <li><Link href="/lien-he">Liên hệ</Link></li>
          </ul>
        </nav>
        <div className={styles.cta}>
          <Link href="/lien-he" className="btn btn-primary">Yêu cầu báo giá</Link>
        </div>
      </div>
    </header>
  );
}
