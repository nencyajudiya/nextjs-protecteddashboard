'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch('/api/me');
      if (res.ok) {
        console.log('✅ User still logged in');
      }
    };
    checkLogin();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800'>
        Welcome to Our App
      </h1>
      <p className='text-gray-600 mb-6'>
        Explore your account, manage your profile, and more.
      </p>
      <button
        onClick={() => router.push('/dashboard')}
        className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
      >
        Go to Dashboard
      </button>
    </div>
  );
}
