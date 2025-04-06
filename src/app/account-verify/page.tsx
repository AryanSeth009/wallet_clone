'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AccountVerifyPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (response.ok) {
        if (data.passwordValid) {
          toast.success('Account verification successful!');
        } else {
          toast.error('Password verification failed. Try fixing the account.');
        }
      } else {
        toast.error(data.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  const handleFix = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fix: true,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (response.ok && data.fixResult?.passwordFixed) {
        toast.success('Account fixed successfully! Try logging in now.');
      } else {
        toast.error(data.error || data.fixResult?.error || 'Failed to fix account');
      }
    } catch (error) {
      console.error('Fix error:', error);
      toast.error('An error occurred while fixing the account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Account Verification Tool</h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>

            <button
              type="button"
              onClick={handleFix}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              disabled={loading || !result}
            >
              Fix Account
            </button>
          </div>

          <div className="flex justify-between">
            <Link href="/login" className="text-sm text-blue-400 hover:text-blue-300">
              Back to Login
            </Link>
            
            <Link href="/signup" className="text-sm text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </div>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md">
            <h2 className="text-lg font-semibold text-white mb-2">Verification Result</h2>
            <pre className="text-xs text-gray-300 overflow-auto max-h-60">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 