import Link from 'next/link';

export const Nav = (): JSX.Element => {
  return (
    <div className='bg-darkblue bottom-0 absolute w-full'>
      <div className='flex items-center justify-between text-offwhite font-bold w-full max-w-3xl mx-auto h-12'>
        <Link href='/'>
          <button className='cursor-pointer mx-6'>Home</button>
        </Link>
        <Link href='/history'>
          <button className='cursor-pointer mx-6'>History</button>
        </Link>
        <Link href='/settings'>
          <button className='cursor-pointer mx-6'>Settings</button>
        </Link>
      </div>
    </div>
  );
};
