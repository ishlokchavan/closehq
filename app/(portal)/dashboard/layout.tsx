import { PersonaProvider } from '@/components/portal/dashboard/persona-context';
import { DashboardDataProvider } from '@/components/portal/dashboard/data-context';
import { ToastProvider } from '@/components/portal/dashboard/toast';
import { DashboardShell } from '@/components/portal/dashboard/dashboard-shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PersonaProvider>
      <DashboardDataProvider>
        <ToastProvider>
          <DashboardShell>{children}</DashboardShell>
        </ToastProvider>
      </DashboardDataProvider>
    </PersonaProvider>
  );
}
