import Link from 'next/link';

export const Nav = (): JSX.Element => {
  return (
    <div className='flex px-5 bg-darkblue w-full sticky bottom-0'>
      <div className='flex items-center justify-between text-offwhite font-bold w-full max-w-3xl mx-auto h-12'>
        <Link href='/'>
          <button className='cursor-pointer'>Home</button>
        </Link>
        <Link href='/history'>
          <button className='cursor-pointer'>History</button>
        </Link>
        <Link href='/settings'>
          <button className='cursor-pointer'>Settings</button>
        </Link>
      </div>
    </div>
  );
};
