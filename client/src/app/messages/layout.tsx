import Navbar from '@/components/navbar';
import AuthLayout from '../AuthLayout';
import { SocketContextProvider } from '@/context/socketContext';

export default function MessagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthLayout>
            <SocketContextProvider>
                <div className="flex h-screen flex-col md:flex-row">
                    <Navbar />
                    <main className="flex-1 overflow-hidden">
                        <div className="w-full h-full">{children}</div>
                    </main>
                </div>
            </SocketContextProvider>
        </AuthLayout>
    );
}
