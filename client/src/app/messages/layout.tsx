import Navbar from '@/components/navbar';
import AuthLayout from '../AuthLayout';

export default function MessagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthLayout>
            <div className="flex h-screen flex-col md:flex-row">
                <Navbar />
                <main className="flex-1">
                    <div className="w-full h-full">{children}</div>
                </main>
            </div>
        </AuthLayout>
    );
}
