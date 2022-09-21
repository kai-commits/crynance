import { LogOut } from 'react-feather';
import { auth } from '../firebase';

export const SignOut = () => {
  return <LogOut onClick={() => auth.signOut()} className='cursor-pointer'>Sign Out</LogOut>;
};
