import Link from 'next/link';
import { SignIn } from './SignIn';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignOut } from './SignOut';
import { BookOpen, Home, Settings } from 'react-feather';

export const Nav = (): JSX.Element => {
  const [user] = useAuthState(auth);

  return (
    <div className='flex px-5 bg-blackeye-blue w-full sticky bottom-0 z-[100]'>
      <div className='flex items-center justify-between text-offwhite font-bold w-full max-w-4xl mx-auto h-12'>
        <Home className='cursor-pointer' />
        <BookOpen className='cursor-pointer' />
        <Settings className='cursor-pointer' />
        {user ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
};
