import Link from 'next/link';
import { Dumbbell, Users, FileText, TrendingUp } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Get counts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const { count: posesCount } = await db
    .from('poses')
    .select('*', { count: 'exact', head: true });

  const { count: usersCount } = await db
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  const { count: flowsCount } = await db
    .from('flows')
    .select('*', { count: 'exact', head: true });

  const stats = [
    {
      label: 'Total Poses',
      value: posesCount || 0,
      icon: Dumbbell,
      href: '/admin/poses',
      color: 'bg-primary-500',
    },
    {
      label: 'Total Users',
      value: usersCount || 0,
      icon: Users,
      href: '/admin/users',
      color: 'bg-accent-500',
    },
    {
      label: 'Total Flows',
      value: flowsCount || 0,
      icon: FileText,
      href: '#',
      color: 'bg-info',
    },
    {
      label: 'Pro Users',
      value: 0,
      icon: TrendingUp,
      href: '#',
      color: 'bg-success',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-600">Manage your yoga application</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className="text-sm text-neutral-500">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/poses/new"
            className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
          >
            <Dumbbell className="w-5 h-5" />
            <span className="font-medium">Add New Pose</span>
          </Link>
          <Link
            href="/admin/poses"
            className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Manage Poses</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">View Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
