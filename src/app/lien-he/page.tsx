export default function ContactPage() {
    return (
        <div className="section-padding">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="text-center mb-60 fade-in">
                    <h1 style={{ fontSize: '48px', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>Kết Nối Với Chúng Tôi</h1>
                    <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--primary-color)', margin: '20px auto' }}></div>
                    <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng dự án của bạn.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '100px' }}>
                    <div className="fade-in">
                        <h2 className="mb-40" style={{ color: 'var(--primary-color)', fontSize: '32px' }}>Thông Tin Trụ Sở</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)', fontSize: '18px', textTransform: 'uppercase' }}>Địa Chỉ:</h4>
                                <p style={{ fontSize: '17px' }}>868 Đường Tạ Quang Bửu, Phường Chánh Hưng, Quận 8, TP. Hồ Chí Minh</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)', fontSize: '18px', textTransform: 'uppercase' }}>Số Điện Thoại:</h4>
                                <p style={{ fontSize: '17px' }}>090 123 4567 - 028 3844 5566</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)', fontSize: '18px', textTransform: 'uppercase' }}>Email:</h4>
                                <p style={{ fontSize: '17px' }}>contact@xaylapcholon.com</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)', fontSize: '18px', textTransform: 'uppercase' }}>Mã Số Thuế:</h4>
                                <p style={{ fontSize: '17px' }}>0312671412</p>
                            </div>
                        </div>
                    </div>

                    <div className="fade-in" style={{ backgroundColor: 'var(--secondary-color)', padding: '60px', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                        <h2 className="mb-40" style={{ color: 'var(--primary-color)', fontSize: '32px' }}>Gửi Lời Nhắn</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontWeight: '500', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-light)' }}>Họ và Tên</label>
                                <input type="text" placeholder="Nhập tên của bạn..." style={{ padding: '15px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontWeight: '500', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-light)' }}>Email</label>
                                <input type="email" placeholder="Nhập email..." style={{ padding: '15px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontWeight: '500', fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-light)' }}>Nội Dung Cần Tư Vấn</label>
                                <textarea rows={6} placeholder="Mô tả dự án hoặc câu hỏi của bạn..." style={{ padding: '15px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" style={{ marginTop: '20px' }}>Gửi Thông Tin Ngay</button>
                        </form>
                    </div>
                </div>

                {/* Mock Map with Premium Look */}
                <div className="fade-in" style={{ marginTop: '100px', height: '500px', backgroundColor: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', border: '1px solid #ddd', overflow: 'hidden', position: 'relative' }}>
                    <p style={{ position: 'relative', zIndex: 2 }}>Bản đồ sẽ được tích hợp tại đây (Google Maps API)</p>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,51,102,0.05)' }}></div>
                </div>
            </div>
        </div>
    );
}
