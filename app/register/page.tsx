'use client';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { post } from '@/utils/axiosInstance'; // ✅ use your existing axios instance

export default function RegisterPage() {
  const router = useRouter();

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'At least 6 characters').required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log('📩 Registering user:', values);
      const res = await post('/api/register', values);
      console.log('✅ Registration response:', res.data);

      if (res.data.ok) {
        alert('Registered successfully!');
        router.push('/login');
      } else {
        alert(res.data.message || 'Registration failed');
      }
    } catch (err: any) {
      console.error('❌ Registration error:', err);
      const message = err.response?.data?.message || err.message;
      alert('Registration failed: ' + message);
    }
  };

  return (
    <main className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-96'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Register
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='space-y-5'>
            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Name
              </label>
              <Field
                name='name'
                type='text'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none'
                placeholder='Enter your name'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <div>
              <label className='block mb-1 text-sm font-medium text-gray-700'>
                Email
              </label>
              <Field
                name='email'
                type='email'
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none'
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
                className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none'
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
              className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold'
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className='text-center text-gray-600 mt-6 text-sm'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-green-600 font-medium hover:underline'
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
