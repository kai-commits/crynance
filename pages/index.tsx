import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';

const Home: NextPage = () => {
  return (
    <div className='h-screen mx-auto'>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <Header />
        <Main />
        <Nav />
      </div>
    </div>
  );
};

export default Home;
