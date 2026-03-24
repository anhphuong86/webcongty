'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const QUICK_ACTIONS = [
    { label: '💰 Báo giá thi công', value: 'quote' },
    { label: '🏗️ Dịch vụ MEP', value: 'mep' },
    { label: '📍 Địa chỉ công ty', value: 'address' },
    { label: '🏭 Nhà xưởng Công nghiệp', value: 'industrial' },
];


const KEYWORDS: { words: string[], responseKey: string }[] = [
    { words: ['giá', 'phí', 'bao nhiêu', 'tiền'], responseKey: 'quote' },
    { words: ['địa chỉ', 'đâu', 'văn phòng', 'công ty'], responseKey: 'address' },
    { words: ['điện', 'nước', 'mep', 'điều hòa', 'lạnh'], responseKey: 'mep' },
    { words: ['nhà xưởng', 'kho', 'công nghiệp'], responseKey: 'industrial' },
];

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Xin chào! Tôi là Trợ lý phản hồi nhanh của Chợ Lớn Cons. Tôi có thể giúp gì cho bạn ngay bây giờ?' }
    ]);
    const [input, setInput] = useState('');
    const [isLeadCaptured, setIsLeadCaptured] = useState(false);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(e => console.error(e));
    }, []);

    const dynamicResponses: Record<string, string> = {
        'quote': `Chào bạn! Để nhận báo giá chính xác cho công trình, bạn vui lòng để lại số điện thoại hoặc gọi ngay số cố định: ${config?.contact?.phone || '028.6262.8057'}. Chuyên viên của Chợ Lớn Cons sẽ tư vấn giải pháp tối ưu nhất cho bạn!`,
        'mep': 'Chợ Lớn Cons là chuyên gia trong lĩnh vực Cơ điện (MEP) với hơn 20 năm kinh nghiệm thi công cho các đối tác lớn như Co.op Mart, Centre Mall. Bạn cần tư vấn cho hạng mục Điện, Nước hay PCCC ạ?',
        'address': `📍 Trụ sở chính: ${config?.contact?.address || '868 Tạ Quang Bửu, Quận 8, TP.HCM'}.\n\n📞 Điện thoại: ${config?.contact?.phone || '028.6262.8057'}\n📧 Email: ${config?.contact?.email || 'choloncons@xaylapcholon.com'}`,
        'industrial': 'Chúng tôi chuyên thi công nhà xưởng, kho bãi quy mô lớn. Dự án tiêu biểu: Xưởng may Việt Long Hưng, Việt Tân... Bạn có mặt bằng dự kiến cho xưởng chưa ạ?',
        'default': 'Chào bạn! Tôi có thể hỗ trợ các thông tin về: Báo giá thi công, Dịch vụ MEP, Nhà xưởng hoặc thông tin liên hệ. Bạn có thể chọn các nút gợi ý bên dưới giúp tôi nhé!'
    };
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleAction = (value: string) => {
        const response = dynamicResponses[value] || dynamicResponses['default'];
        const userLabel = QUICK_ACTIONS.find(a => a.value === value)?.label || value;
        
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: userLabel },
            { role: 'ai', content: response }
        ]);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim().toLowerCase();
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');

        // Logic xử lý từ khóa
        let foundResponse = '';
        for (const item of KEYWORDS) {
            if (item.words.some(word => userMsg.includes(word))) {
                foundResponse = dynamicResponses[item.responseKey];
                break;
            }
        }

        // Logic thu thập số điện thoại
        const phoneRegex = /(0[35789])([0-9]{8})\b/g;
        if (phoneRegex.test(userMsg)) {
            setIsLeadCaptured(true);
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'ai', content: 'Cảm ơn bạn đã để lại thông tin! Chuyên viên của Chợ Lớn Cons sẽ liên hệ lại với bạn trong thời gian sớm nhất.' }]);
            }, 600);
            return;
        }

        setTimeout(() => {
            setMessages(prev => [
                ...prev, 
                { role: 'ai', content: foundResponse || RESPONSES['default'] }
            ]);
        }, 600);
    };

    return (
        <div className={styles.chatWrapper}>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <h3>PHẢN HỒI NHANH CHOLONCONS</h3>
                            <span>Trực tuyến 24/7 • Phản hồi tức thì</span>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    <div className={styles.messagesArea}>
                        {messages.map((m, idx) => (
                            <div key={idx} className={`${styles.message} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
                                {m.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {!isLeadCaptured && (
                        <div className={styles.quickActions}>
                            {QUICK_ACTIONS.map(action => (
                                <button key={action.value} onClick={() => handleAction(action.value)} className={styles.actionBtn}>
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className={styles.inputArea}>
                        <input 
                            type="text" 
                            placeholder="Đặt câu hỏi hoặc nhập số điện thoại..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className={styles.sendBtn} onClick={handleSend} disabled={!input.trim()}>
                            ➤
                        </button>
                    </div>
                </div>
            )}

            <button 
                className={`${styles.triggerBtn} ${isOpen ? styles.triggerActive : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {!isOpen && <span className={styles.chatLabel}>Tư vấn ngay</span>}
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                    </svg>
                )}
            </button>
        </div>
    );
}
