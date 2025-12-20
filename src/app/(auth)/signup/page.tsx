'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, AlertCircle, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, Container } from '@/components/ui';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const plan = searchParams.get('plan');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback?redirect=${redirect}`,
        },
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

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?redirect=${redirect}`,
        },
      });

      if (error) {
        setError(error.message);
      }
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
          We&apos;ve sent a confirmation link to <strong>{email}</strong>. Click the link
          to activate your account.
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
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create your account</h1>
        <p className="text-neutral-600">
          {plan === 'pro'
            ? 'Start your Pro trial today'
            : 'Start building yoga flows for free'}
        </p>
      </div>

      {/* Plan indicator */}
      {plan === 'pro' && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">
              Pro
            </span>
            <span className="font-semibold text-neutral-900">$4.99/month</span>
          </div>
          <p className="text-sm text-neutral-600">
            Unlimited flows, AI suggestions, and exports
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-error-light border border-error/30 rounded-xl p-3 mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Google Signup */}
      <button
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors mb-6"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium text-neutral-700">Continue with Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-neutral-500">or sign up with email</span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          type="text"
          label="Full name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          required
        />
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />
        <Input
          type="password"
          label="Password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          hint="At least 8 characters"
          required
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {plan === 'pro' ? 'Start free trial' : 'Create account'}
        </Button>
      </form>

      <p className="text-center text-xs text-neutral-500 mt-4">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-primary-600 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary-600 hover:underline">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-sm text-neutral-600 mt-6">
        Already have an account?{' '}
        <Link
          href={`/login${redirect !== '/dashboard' ? `?redirect=${redirect}` : ''}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}

function SignupFormSkeleton() {
  return (
    <Card variant="glass" padding="lg" className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    </Card>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

      <Container size="sm" className="relative flex-1 flex flex-col justify-center py-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-semibold text-neutral-900">FLOW</span>
        </Link>

        <Suspense fallback={<SignupFormSkeleton />}>
          <SignupForm />
        </Suspense>
      </Container>
    </div>
  );
}
