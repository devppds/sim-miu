import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '@/lib/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export const metadata = {
  title: "Dashboard MIU",
  description: "Sistem Informasi Manajemen Madrasah Ihya' Ulumuddin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <div className="app-container">
            <Sidebar />
            <div className="content-wrapper">
              <Header />
              <main>
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
