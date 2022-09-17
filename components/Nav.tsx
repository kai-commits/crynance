import Link from 'next/link';
import { SignIn } from './SignIn';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignOut } from './SignOut';
import { BookOpen, Home, Settings } from 'react-feather';

export const Nav = (): JSX.Element => {
  const [user] = useAuthState(auth);

  return (
    <div className='flex px-5 bg-darkblue w-full sticky bottom-0 z-[100]'>
      <div className='flex items-center justify-between text-offwhite font-bold w-full max-w-3xl mx-auto h-12'>
        <Link href='/'>
          <Home className='cursor-pointer' />
        </Link>
        <Link href='/history'>
          <BookOpen className='cursor-pointer' />
        </Link>
        <Link href='/settings'>
          <Settings className='cursor-pointer' />
        </Link>
        {user ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
};
