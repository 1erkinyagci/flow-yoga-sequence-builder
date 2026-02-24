'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, AlertCircle, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, Container } from '@/components/ui';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

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

  if (success) {
    return (
      <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
          <Check className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check your email</h1>
        <p className="text-neutral-600 mb-6">
          We&apos;ve sent a password reset link to <strong>{email}</strong>. Click the link to set a new password.
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            Back to login
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Reset your password</h1>
        <p className="text-neutral-600">
          Enter your email and we&apos;ll send you a reset link
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
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-neutral-600 mt-6">
        Remember your password?{' '}
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}

export default function ForgotPasswordPage() {
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

        <ForgotPasswordForm />
      </Container>
    </div>
  );
}
