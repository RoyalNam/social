import Navbar from '@/components/navbar';

export default function MessagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <Navbar />
            <main className="flex-1">
                <div className="w-full h-full">{children}</div>
            </main>
        </div>
    );
}
