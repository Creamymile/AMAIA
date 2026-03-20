import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardSidebar role="ADMIN" />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
