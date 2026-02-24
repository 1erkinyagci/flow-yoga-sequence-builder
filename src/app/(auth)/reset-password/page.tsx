'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, Container } from '@/components/ui';

function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  // Supabase automatically handles the token exchange from the email link.
  // We just need to verify a session exists.
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setHasSession(!!session);
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Still checking session
  if (hasSession === null) {
    return (
      <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      </Card>
    );
  }

  // No session — invalid or expired link
  if (!hasSession) {
    return (
      <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-error-light mx-auto mb-4 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-error" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Invalid or expired link</h1>
        <p className="text-neutral-600 mb-6">
          This password reset link is no longer valid. Please request a new one.
        </p>
        <Link href="/forgot-password">
          <Button className="w-full">
            Request new link
          </Button>
        </Link>
      </Card>
    );
  }

  if (success) {
    return (
      <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
          <Check className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Password updated</h1>
        <p className="text-neutral-600 mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        <Link href="/login">
          <Button className="w-full">
            Sign in
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Set new password</h1>
        <p className="text-neutral-600">
          Choose a new password for your account
        </p>
      </div>

      {error && (
        <div className="bg-error-light border border-error/30 rounded-xl p-3 mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          label="New password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          hint="At least 8 characters"
          required
        />
        <Input
          type="password"
          label="Confirm password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Update password
        </Button>
      </form>
    </Card>
  );
}

function ResetPasswordSkeleton() {
  return (
    <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

      <Container size="sm" className="relative flex-1 flex flex-col justify-center py-12">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-semibold text-neutral-900">FLOW</span>
        </Link>

        <Suspense fallback={<ResetPasswordSkeleton />}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </div>
  );
}
