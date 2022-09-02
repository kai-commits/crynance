import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";


const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export const SignIn = () => {
  return <button onClick={googleSignIn}>Sign In</button>;
};
