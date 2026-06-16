import { NotificationBar } from '@/components/portal/notification-bar';
import { PortalHeader } from '@/components/portal/portal-header';
import { Footer } from '@/components/sections/footer';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      {/* Promo banner sits above the nav, per the Figma. */}
      <NotificationBar />
      <PortalHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
