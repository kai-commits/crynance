import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { LogIn } from "react-feather";
import { auth } from "../firebase";


const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export const SignIn = () => {
  return <LogIn onClick={googleSignIn}></LogIn>;
};
