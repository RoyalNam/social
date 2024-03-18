import Navbar from '@/components/Navbar';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col md:flex-row">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-[935px] py-10 px-6 h-full">{children}</div>
            </main>
        </div>
    );
}
