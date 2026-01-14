import { AdminGuard } from "./components/admin-guard";
import { SidebarNav } from "./components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Posts",
    href: "/admin/posts",
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="relative container min-h-screen py-10">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
}
