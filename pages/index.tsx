import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  
  return (
    <div>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col justify-between h-max mx-auto min-w-fit'>
        <Header title='Crynance' search={true} />
        <Main />
        <Nav />
      </div>
    </div>
  );
};

export default Home;
