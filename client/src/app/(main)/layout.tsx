import Navbar from '@/components/navbar';

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex h-screen flex-col md:flex-row select-none">
            <Navbar />
            <main className="flex-1 overflow-y-auto scroll_thin">
                <div className="mx-auto max-w-[935px] py-10 px-6 h-full">{children}</div>
            </main>
        </div>
    );
};

export default MainLayout;
