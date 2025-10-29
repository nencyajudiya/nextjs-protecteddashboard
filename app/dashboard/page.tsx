'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaCopyright,
} from 'react-icons/fa';

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('[DASHBOARD] Fetching /api/me...');
        const res = await axios.get('/api/me');
        console.log('[DASHBOARD] Authenticated user:', res.data);
        setUser(res.data.user || res.data); // supports either format
      } catch (error) {
        console.error('[DASHBOARD] Error fetching user:', error);
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('loggedInUser');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed, please try again.');
    }
  };

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screentext-lg'>
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center  px-4'>
      {/* Glass Card */}
      <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-full max-w-lg p-10 text-center transform transition-all hover:scale-[1.02] duration-300'>
        <div className='flex flex-col items-center space-y-4'>
          <FaUserCircle className='text-6xl text-gray-600' />
          <h1 className='text-4xl font-bold tracking-tight'>
            Welcome, <span className=''>{user.name}</span>!
          </h1>
          <p className='text-gray-500 text-sm'>Email: {user.email}</p>
        </div>

        <div className='bg-white/20 rounded-2xl p-5 text-center hover:bg-white/30 transition'>
          <FaHome className='text-3xl mx-auto mb-2' />
          <p className='font-semibold'>Go Home</p>
          <button
            onClick={() => router.push('/')}
            className='text-sm mt-2 text-blue-700 hover:text-blue-500 hover:underline'
          >
            Visit Home →
          </button>
        </div>

        <button
          onClick={handleLogout}
          className='mt-8 w-full bg-red-500 text-white hover:bg-red-600 transition  font-semibold py-3 rounded-xl flex justify-center items-center gap-2'
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <footer className='mt-10 /70 text-sm flex items-center justify-center'>
        <FaCopyright className='mr-1' />
        {new Date().getFullYear()} Secure Dashboard • Built with Next.js
      </footer>
    </div>
  );
}
