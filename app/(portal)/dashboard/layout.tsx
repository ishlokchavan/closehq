import { PersonaProvider } from '@/components/portal/dashboard/persona-context';
import { DashboardShell } from '@/components/portal/dashboard/dashboard-shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PersonaProvider>
      <DashboardShell>{children}</DashboardShell>
    </PersonaProvider>
  );
}
