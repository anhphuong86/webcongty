'use client';

import { useState } from 'react';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    const contacts = [
        { name: 'Zalo', icon: '📞', color: '#0068ff', link: 'https://zalo.me/your_number' },
        { name: 'Facebook', icon: '👤', color: '#1877f2', link: 'https://facebook.com/your_page' },
        { name: 'TikTok', icon: '🎵', color: '#000000', link: 'https://tiktok.com/@your_id' },
        { name: 'Telegram', icon: '✈️', color: '#26a5e4', link: 'https://t.me/your_username' },
    ];

    return (
        <div className={styles.floatingWrapper}>
            {/* Social Buttons List */}
            <div className={`${styles.socialList} ${isOpen ? styles.listOpen : ''}`}>
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialItem}
                        style={{ '--bg-color': contact.color } as any}
                        title={contact.name}
                    >
                        <span className={styles.socialIcon}>{contact.icon}</span>
                        <span className={styles.socialName}>{contact.name}</span>
                    </a>
                ))}
            </div>

            {/* Main Chat Trigger */}
            <button
                className={`${styles.chatTrigger} ${isOpen ? styles.triggerActive : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Contact Customer Support"
            >
                <div className={styles.pulse}></div>
                <span className={styles.chatIcon}>{isOpen ? '✕' : '💬'}</span>
                {!isOpen && <span className={styles.chatLabel}>Tư vấn ngay</span>}
            </button>
        </div>
    );
}
