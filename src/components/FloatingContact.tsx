'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        fetch('/api/config').then(res => res.json()).then(data => setConfig(data)).catch(e => console.error(e));
    }, []);

    const contacts = [
        { 
            name: 'Zalo', 
            icon: <img src="/icons/zalo.png" alt="Zalo" />, 
            link: `https://zalo.me/${config?.contact?.zalo || '0967894400'}` 
        },
        { 
            name: 'Facebook', 
            icon: <img src="/icons/facebook.png" alt="Facebook" />, 
            link: config?.general?.facebook || 'https://www.facebook.com/profile.php?id=100045436852377' 
        },
        { 
            name: 'Telegram', 
            icon: <img src="/icons/telegram.webp" alt="Telegram" />, 
            link: '#' 
        },
        { 
            name: 'TikTok', 
            icon: (
                <svg viewBox="0 0 24 24" fill="#000000">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.12-.85.34-1.13 1.13-1.64 2.01-.13.71.07 1.46.5 2.03.46.61 1.18.99 1.93 1.05.62.06 1.24-.1 1.76-.43.68-.42 1.17-1.18 1.25-1.98.02-3.46 0-6.91.01-10.37h.01Z"/>
                </svg>
            ), 
            link: '#' 
        },
    ];

    return (
        <div className={styles.floatingWrapper}>
            {/* Social Buttons List - Expands horizontally to the left */}
            <div className={`${styles.socialList} ${isOpen ? styles.listOpen : ''}`}>
                {contacts.map((contact, index) => (
                    <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialItem}
                        title={contact.name}
                    >
                        <span className={styles.socialIcon}>{contact.icon}</span>
                        <span className={styles.socialName}>{contact.name}</span>
                    </a>
                ))}
            </div>

            {/* Main Chat Trigger - Always visible */}
            <button
                className={`${styles.chatTrigger} ${isOpen ? styles.triggerActive : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Contact Customer Support"
            >
                <div className={styles.pulse}></div>
                <span className={styles.chatIcon}>
                    {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                        </svg>
                    )}
                </span>
                {!isOpen && <span className={styles.chatLabel}>Hotline</span>}
            </button>
        </div>
    );
}
