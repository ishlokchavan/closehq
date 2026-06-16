import { PortalHeader } from '@/components/portal/portal-header';
import { Footer } from '@/components/sections/footer';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <PortalHeader />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
