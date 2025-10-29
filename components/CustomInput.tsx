// components/CustomInput.tsx
import React from 'react';
import { useField } from 'formik';

type Props = {
  label: string;
  name: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CustomInput({ label, ...props }: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium mb-1' htmlFor={props.name}>
        {label}
      </label>
      <input className='input-common' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='text-red-600 text-sm mt-1'>{meta.error}</div>
      ) : null}
    </div>
  );
}
