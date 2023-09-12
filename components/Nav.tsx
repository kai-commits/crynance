import Link from 'next/link';
import { SignIn } from './SignIn';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignOut } from './SignOut';
import { BookOpen, Home, Settings } from 'react-feather';

export const Nav = (): JSX.Element => {
  const [user] = useAuthState(auth);

  return (
    <div className='sticky sm:bottom-9 bottom-0 sm:rounded-b-[4rem] z-30 flex w-full px-5 pb-1 bg-blackeye-blue sm:border-black sm:border-x-8 sm:border-b-8'>
      <div className='flex items-center justify-around w-full h-12 max-w-4xl mx-auto font-bold text-offwhite'>
        <Link href='/'>
          <Home className='mr-1 cursor-pointer' />
        </Link>
        {/* <BookOpen className='cursor-pointer' />
        <Settings className='cursor-pointer' /> */}
        {user ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
};
