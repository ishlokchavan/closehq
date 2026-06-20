import { PersonaProvider } from '@/components/portal/dashboard/persona-context';
import { DashboardDataProvider } from '@/components/portal/dashboard/data-context';
import { DashboardShell } from '@/components/portal/dashboard/dashboard-shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PersonaProvider>
      <DashboardDataProvider>
        <DashboardShell>{children}</DashboardShell>
      </DashboardDataProvider>
    </PersonaProvider>
  );
}
