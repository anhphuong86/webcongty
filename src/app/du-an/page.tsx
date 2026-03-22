import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
    const projects = [
        // Nhóm 1: Xây dựng Dân dụng & Công nghiệp
        { id: 1, name: "Nhà Máy Thực Phẩm Masan (HACCP)", category: "Công nghiệp", image: "/service1.png", year: "2023" },
        { id: 2, name: "Kho Lạnh Logistics Tân Tạo", category: "Công nghiệp", image: "/hero.png", year: "2022" },
        { id: 3, name: "Xưởng Sản Xuất May Mặc Quận 8", category: "Công nghiệp", image: "/service1.png", year: "2023" },
        { id: 4, name: "Cụm Nhà Xưởng Tiền Chế Long An", category: "Công nghiệp", image: "/hero.png", year: "2024" },
        { id: 5, name: "Showroom Ô Tô Cao Cấp Tạ Quang Bửu", category: "Dân dụng", image: "/service1.png", year: "2023" },
        { id: 6, name: "Tòa Nhà Văn Phòng Central Chợ Lớn", category: "Dân dụng", image: "/hero.png", year: "2022" },
        { id: 7, name: "Chung Cư Cao Tầng Phường Chánh Hưng", category: "Dân dụng", image: "/service1.png", year: "2023" },
        { id: 8, name: "Nhà Xưởng Thông Minh 4.0 - VSIP", category: "Công nghiệp", image: "/hero.png", year: "2023" },
        { id: 9, name: "Biệt Thự Song Lập Bình Chánh", category: "Dân dụng", image: "/service1.png", year: "2022" },
        { id: 10, name: "Khu Phức Hợp Thương Mại Quận 10", category: "Dân dụng", image: "/hero.png", year: "2023" },

        // Nhóm 2: Điện & Năng lượng Tái tạo
        { id: 11, name: "Được Áp Mái Năng Lượng Mặt Trời 1MWp", category: "Năng lượng", image: "/service2.png", year: "2024" },
        { id: 12, name: "Điện Mặt Trời Mái Nhà Xưởng CP", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 13, name: "Hệ Thống Pin Lưu Trữ Hybrid Gia Đình", category: "Năng lượng", image: "/service2.png", year: "2024" },
        { id: 14, name: "Trạm Biến Áp 110kV KCN Hiệp Phước", category: "Hệ thống Điện", image: "/service2.png", year: "2023" },
        { id: 15, name: "Điện Mặt Trời Mái Kính Văn Phòng", category: "Năng lượng", image: "/service2.png", year: "2022" },
        { id: 16, name: "Hệ Thống Đèn Đường Solar Quận 8", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 17, name: "Trạm Sạc Nhanh Xe Điện VinFast", category: "Hệ thống Điện", image: "/service2.png", year: "2024" },
        { id: 18, name: "Hợp Tác PPA Điện Mặt Trời 500kWp", category: "Năng lượng", image: "/service2.png", year: "2023" },
        { id: 19, name: "Hệ Thống Tủ Điện Phân Phối Tòa Nhà", category: "Hệ thống Điện", image: "/service2.png", year: "2022" },
        { id: 20, name: "Nâng Cấp Trạm Hạ Thế Phường 5", category: "Hệ thống Điện", image: "/service2.png", year: "2023" },

        // Nhóm 3: Nhập khẩu & Phân phối Thiết bị (Priority)
        { id: 21, name: "Hệ Thống Tủ Đông Siêu Thị Co.op Mart", category: "Thiết bị", image: "/service1.png", year: "2024" },
        { id: 22, name: "Bếp Ăn Công Nghiệp Trường Quốc Tế", category: "Bếp Công Nghiệp", image: "/service1.png", year: "2023" },
        { id: 23, name: "Tủ Mát Trưng bày WinMart+", category: "Thiết bị", image: "/service1.png", year: "2024" },
        { id: 24, name: "Hệ Thống Tủ Lạnh Y Tế BV Chợ Rẫy", category: "Điện Lạnh", image: "/service1.png", year: "2023" },
        { id: 25, name: "Thiết Bị Bếp Khách Sạn 5 Sao Quận 1", category: "Bếp Công Nghiệp", image: "/service1.png", year: "2022" },
        { id: 26, name: "Kho Lạnh Bảo Quản Thủy Sản", category: "Điện Lạnh", image: "/service1.png", year: "2023" },
        { id: 27, name: "Lắp Đặt Quầy Kệ Siêu Thị Mega Market", category: "Thiết bị", image: "/service1.png", year: "2023" },
        { id: 28, name: "Hệ Thống Máy Làm Đá Viên Cao Cấp", category: "Thiết bị", image: "/service1.png", year: "2024" },
        { id: 29, name: "Bàn Đông/Mát Inox Bếp Nhà Hàng", category: "Bếp Công Nghiệp", image: "/service1.png", year: "2023" },
        { id: 30, name: "Hệ Thống Tủ Trưng Bày Bánh GS25", category: "Thiết bị", image: "/service1.png", year: "2023" },

        // Nhóm 4, 5, 6 (Rút gọn tên nhưng đủ 10 bài cho mỗi mục)
        { id: 31, name: "Hệ Thống Thoát Nước Mưa Quận 8", category: "Thủy lợi", image: "/service3.png", year: "2023" },
        { id: 32, name: "Cấp Nước Sinh Hoạt Cần Giuộc", category: "Thủy lợi", image: "/service3.png", year: "2022" },
        { id: 33, name: "Điều Hòa VRV Trụ Sở Ngân Hàng", category: "Điều hòa", image: "/service3.png", year: "2023" },
        { id: 34, name: "Xử Lý Nước Thải KCN Bình Chánh", category: "Môi trường", image: "/service3.png", year: "2024" },
        { id: 35, name: "Trạm Bơm Tiêu Úng Phường Chánh Hưng", category: "Thủy lợi", image: "/service3.png", year: "2023" },
        { id: 36, name: "Điều Hòa Công Nghiệp Nhà Máy Dệt", category: "Điều hòa", image: "/service3.png", year: "2023" },
        { id: 37, name: "Thông Gió Trung Tâm Tòa Nhà AB", category: "Điều hòa", image: "/service3.png", year: "2022" },
        { id: 38, name: "Lọc Nước Tổng Khu Dân Cư Mới", category: "Thủy lợi", image: "/service3.png", year: "2023" },
        { id: 39, name: "Chống Ngập Triều Cường Ven Sông", category: "Thủy lợi", image: "/service3.png", year: "2024" },
        { id: 40, name: "Hệ Thống HVAC Khách Sạn Seaside", category: "Điều hòa", image: "/service3.png", year: "2023" },

        { id: 41, name: "Cầu Vượt Giao Thông Tạ Quang Bửu", category: "Giao thông", image: "/hero.png", year: "2023" },
        { id: 42, name: "Kè Chống Sạt Lở Sông Chợ Lớn", category: "Thủy lợi", image: "/hero.png", year: "2022" },
        { id: 43, name: "Đường Nhựa Nội Bộ KCN Tân Kim", category: "Giao thông", image: "/hero.png", year: "2023" },
        { id: 44, name: "Nâng Cấp Quốc Lộ 50 (Phân Đoạn)", category: "Giao thông", image: "/hero.png", year: "2024" },
        { id: 45, name: "Hệ Thống Đèn Tín Hiệu Giao Thông", category: "Giao thông", image: "/hero.png", year: "2023" },
        { id: 46, name: "Cầu Kênh Ngang Quận 8", category: "Giao thông", image: "/hero.png", year: "2023" },
        { id: 47, name: "Cống Kiểm Soát Triều Quy Mô Lớn", category: "Thủy lợi", image: "/hero.png", year: "2022" },
        { id: 48, name: "Đường Ven Sông Cần Giuộc", category: "Giao thông", image: "/hero.png", year: "2023" },
        { id: 49, name: "Trạm Thu Phí Tự Động ETC", category: "Giao thông", image: "/hero.png", year: "2024" },
        { id: 50, name: "Hệ Thống Cấp Nước PCCC Khu Dân Cư", category: "Hạ tầng", image: "/hero.png", year: "2023" },

        { id: 51, name: "Cho Thuê Máy Khoan Cọc Nhồi Bauer", category: "Thiết bị", image: "/service1.png", year: "2023" },
        { id: 52, name: "Tư Vấn Thiết Kế BIM Toà Nhà Sun", category: "Dịch vụ", image: "/service1.png", year: "2022" },
        { id: 53, name: "Môi Giới Đất Công Nghiệp Đồng Nai", category: "Dịch vụ", image: "/service1.png", year: "2023" },
        { id: 54, name: "Phân Phối Gạch Ốp Lát Tây Ban Nha", category: "Thương mại", image: "/service1.png", year: "2024" },
        { id: 55, name: "Kiểm Định Kết Cấu Nhà Xưởng Coca", category: "Dịch vụ", image: "/service1.png", year: "2023" },
        { id: 56, name: "Nâng Cấp Hệ Thống Điện Nước Resort", category: "Dịch vụ", image: "/service1.png", year: "2023" },
        { id: 57, name: "Tư Vấn Pháp Lý Hoàn Công Nhà Xưởng", category: "Dịch vụ", image: "/service1.png", year: "2024" },
        { id: 58, name: "Cung Cấp Cáp Điện Trung Thế CADIVI", category: "Thương mại", image: "/service1.png", year: "2023" },
        { id: 59, name: "Thiết Kế Kiến Trúc Biệt Thự Phố", category: "Dịch vụ", image: "/service1.png", year: "2022" },
        { id: 60, name: "Bảo Trì Trạm Biến Áp Định Kỳ", category: "Dịch vụ", image: "/service1.png", year: "2023" }
    ];

    return (
        <div className="section-padding">
            <div className="container">
                <div className="text-center mb-60 fade-in">
                    <h1 style={{ fontSize: '48px', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>Hồ Sơ Năng Lực Dự Án</h1>
                    <div style={{ height: '4px', width: '60px', backgroundColor: 'var(--primary-color)', margin: '20px auto' }}></div>
                    <p style={{ fontSize: '18px' }}>Xây Lắp Chợ Lớn tự hào đồng hành cùng 60+ dự án tiêu biểu trải rộng trên tất cả các mảng kinh doanh chiến lược.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '40px' }}>
                    {projects.map((project) => (
                        <div key={project.id} className="fade-in" style={{
                            background: 'white',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            transition: 'var(--transition)'
                        }}>
                            <div style={{ position: 'relative', height: '280px' }}>
                                <Image src={project.image} alt={project.name} fill style={{ objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    background: 'var(--accent-color)',
                                    color: 'white',
                                    padding: '5px 15px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    borderRadius: '2px'
                                }}>{project.year}</div>
                            </div>
                            <div style={{ padding: '30px' }}>
                                <span style={{ color: 'var(--primary-color)', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{project.category}</span>
                                <h3 style={{ fontSize: '20px', marginTop: '10px', color: 'var(--primary-dark)' }}>{project.name}</h3>
                                <Link href="/lien-he" style={{ display: 'inline-block', marginTop: '20px', color: 'var(--text-light)', fontSize: '13px', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Tư vấn giải pháp tương tự →</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-100 fade-in">
                    <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Bạn cần đối tác thi công uy tín cho dự án sắp tới?</h2>
                    <Link href="/lien-he" className="btn btn-primary">Gửi yêu cầu hợp tác ngay</Link>
                </div>
            </div>
        </div>
    );
}
