import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-60 fade-in">
                    <h1 style={{ fontSize: '48px', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>Về Xây Lắp Chợ Lớn</h1>
                    <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--primary-color)', margin: '20px auto' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '80px', alignItems: 'center' }}>
                    <div className="fade-in">
                        <h2 className="mb-40" style={{ color: 'var(--primary-color)', fontSize: '32px' }}>Tầm Nhìn & Sứ Mệnh</h2>
                        <p className="mb-20" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                            Được thành lập với khát khao nâng tầm chất lượng công trình Việt, Công ty CP Xây lắp Chợ Lớn
                            đã không ngừng nỗ lực để trở thành biểu tượng của sự uy tín trong ngành xây dựng.
                        </p>
                        <p className="mb-40" style={{ fontSize: '18px', lineHeight: '1.8' }}>
                            Sứ mệnh của chúng tôi là kiến tạo nên những không gian sống và làm việc đẳng cấp,
                            kết hợp hài hòa giữa công nghệ xây dựng tiên tiến và tính thẩm mỹ trường tồn.
                        </p>

                        <h2 className="mb-40" style={{ color: 'var(--primary-color)', fontSize: '32px' }}>Giá Trị Cốt Lõi</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)' }}>UY TÍN</h4>
                                <p style={{ fontSize: '15px' }}>Cam kết tuyệt đối về chất lượng và tiến độ.</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)' }}>SÁNG TẠO</h4>
                                <p style={{ fontSize: '15px' }}>Luôn đổi mới trong thiết kế và giải pháp thi công.</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)' }}>TẬN TÂM</h4>
                                <p style={{ fontSize: '15px' }}>Lắng nghe và thấu hiểu mọi nguyện vọng của khách hàng.</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)' }}>BỀN VỮNG</h4>
                                <p style={{ fontSize: '15px' }}>Xây dựng những giá trị lâu dài cho cộng đồng.</p>
                            </div>
                            <div>
                                <h4 className="mb-10" style={{ color: 'var(--primary-dark)' }}>TOÀN CẦU</h4>
                                <p style={{ fontSize: '15px' }}>Nhập khẩu trang thiết bị hiện đại từ các đối tác quốc tế.</p>
                            </div>
                        </div>
                    </div>

                    <div className="fade-in" style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                        <Image src="/hero.png" alt="Xây Lắp Chợ Lớn Office" fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
