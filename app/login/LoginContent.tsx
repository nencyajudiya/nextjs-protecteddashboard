// app/login/LoginContent.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('from') || '/dashboard';

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log('[LOGIN PAGE] Submitting login:', values);

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      console.log('[LOGIN PAGE] Response status:', res.status);

      const data = await res.json();
      console.log('[LOGIN PAGE] Response data:', data);

      if (!res.ok) {
        alert('Login failed: ' + data.message);
        return;
      }

      alert('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      console.error('[LOGIN PAGE] Error submitting form:', err);
      alert('Something went wrong while logging in.');
    }
  };

  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Login
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='space-y-5'>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Email
              </label>
              <Field
                name='email'
                type='email'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                placeholder='Enter your email'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Password
              </label>
              <Field
                name='password'
                type='password'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none'
                placeholder='Enter your password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold'
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className='text-center text-gray-600 mt-6 text-sm'>
          New user?{' '}
          <Link
            href='/register'
            className='text-blue-600 font-medium hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
