import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CHOLONCONS | Admin Portal v2.0",
    description: "Hệ thống quản trị nội dung cao cấp - CHOLONCONS",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ backgroundColor: '#020617', minHeight: '100vh' }}>
            {children}
        </div>
    );
}
