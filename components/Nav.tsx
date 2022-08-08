import Link from 'next/link';

export const Nav = (): JSX.Element => {
  return (
    <div className='bottom-0 flex items-center justify-around text-offwhite font-bold w-full absolute bg-darkblue h-12'>
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
  );
};
