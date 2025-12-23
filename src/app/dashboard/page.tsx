import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, FileText, Settings, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card, Button } from '@/components/ui';
import { getUser, getUserProfile } from '@/lib/supabase/server';
import type { Profile } from '@/types';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getUserProfile() as Profile | null;
  const isPro = profile?.subscription_tier === 'paid';
  const flowCount = profile?.flows_created || 0;
  const maxFlows = isPro ? Infinity : 5;

  // Placeholder flows for demo
  const recentFlows = [
    { id: '1', title: 'Morning Vinyasa Flow', poseCount: 12, updatedAt: '2024-01-15' },
    { id: '2', title: 'Gentle Evening Practice', poseCount: 8, updatedAt: '2024-01-14' },
  ];

  const userForHeader = {
    id: user.id,
    email: user.email || '',
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header user={userForHeader} profile={profile} />

      <main className="flex-1 pt-24 md:pt-28 pb-8">
        <Container size="xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Yogi'}
            </h1>
            <p className="text-neutral-600">
              Ready to create your next class sequence?
            </p>
          </div>

          {/* Upgrade Banner (if free) */}
          {!isPro && (
            <Card
              variant="default"
              padding="md"
              className="mb-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white border-none"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
                    <p className="text-primary-100 text-sm">
                      Get unlimited flows, AI suggestions, and PDF exports for just
                      $4.99/month.
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-primary-50"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Plans
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card variant="glass" padding="md">
                <h2 className="font-semibold text-neutral-900 mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="/builder">
                    <Button
                      variant="primary"
                      className="w-full justify-start"
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      Create New Flow
                    </Button>
                  </Link>
                  <Link href="/poses">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      leftIcon={<FileText className="w-4 h-4" />}
                    >
                      Browse Poses
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Recent Flows */}
              <Card variant="glass" padding="md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-neutral-900">Recent Flows</h2>
                  <span className="text-sm text-neutral-500">
                    {flowCount} / {maxFlows === Infinity ? '∞' : maxFlows} flows
                  </span>
                </div>

                {recentFlows.length > 0 ? (
                  <div className="space-y-3">
                    {recentFlows.map((flow) => (
                      <Link
                        key={flow.id}
                        href={`/builder?id=${flow.id}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-100 transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-neutral-900 group-hover:text-primary-600">
                            {flow.title}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {flow.poseCount} poses - Updated {flow.updatedAt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="mb-4">No flows yet. Create your first one!</p>
                    <Link href="/builder">
                      <Button>Create Flow</Button>
                    </Link>
                  </div>
                )}

                {recentFlows.length > 0 && (
                  <Link
                    href="/dashboard/flows"
                    className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-4"
                  >
                    View all flows
                  </Link>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Card */}
              <Card variant="glass" padding="md">
                <h2 className="font-semibold text-neutral-900 mb-4">Your Account</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="text-neutral-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Plan</p>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-900">
                        {isPro ? 'Pro' : 'Free'}
                      </span>
                      {isPro && (
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 space-y-2">
                    <Link href="/dashboard/settings">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        leftIcon={<Settings className="w-4 h-4" />}
                      >
                        Settings
                      </Button>
                    </Link>
                    {isPro && (
                      <Link href="/dashboard/subscription">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          leftIcon={<CreditCard className="w-4 h-4" />}
                        >
                          Manage Subscription
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>

              {/* Usage Stats */}
              <Card variant="glass" padding="md">
                <h2 className="font-semibold text-neutral-900 mb-4">This Month</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-neutral-500">Flows Created</span>
                      <span className="text-neutral-900 font-medium">
                        {flowCount}
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (flowCount / (maxFlows === Infinity ? 100 : maxFlows)) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  {!isPro && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-500">AI Suggestions</span>
                        <span className="text-neutral-900 font-medium">
                          {profile?.ai_suggestions_today || 0} / 3
                        </span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-500 rounded-full"
                          style={{
                            width: `${((profile?.ai_suggestions_today || 0) / 3) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
