import { auth } from '../firebase';

export const SignOut = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};
