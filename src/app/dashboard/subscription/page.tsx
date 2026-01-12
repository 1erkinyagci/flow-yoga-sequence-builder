import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container, Card } from '@/components/ui';
import { getUser, getUserProfile } from '@/lib/supabase/server';
import { SubscriptionManager } from './SubscriptionManager';
import type { Profile } from '@/types';

export default async function SubscriptionPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getUserProfile() as Profile | null;

  const userForHeader = {
    id: user.id,
    email: user.email || '',
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header user={userForHeader} profile={profile} />

      <main className="flex-1 pt-16 md:pt-20 pb-8">
        <Container size="md">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Manage Subscription
            </h1>
            <p className="text-neutral-600">
              View and manage your FLOW Pro subscription.
            </p>
          </div>

          <Card variant="glass" padding="lg">
            <SubscriptionManager profile={profile} />
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
