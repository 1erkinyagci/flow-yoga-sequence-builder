import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Dumbbell, Settings, ArrowLeft, Upload } from 'lucide-react';
import { getUser } from '@/lib/supabase/server';

// Admin emails from environment variable
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Check if user is admin
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-neutral-900 text-white">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-neutral-800 px-6">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold">FLOW Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/poses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Dumbbell className="w-5 h-5" />
              Poses
            </Link>
            <Link
              href="/admin/poses/import"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Upload className="w-5 h-5" />
              Import
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Users className="w-5 h-5" />
              Users
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>

          {/* Back to site */}
          <div className="border-t border-neutral-800 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
