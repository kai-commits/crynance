import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen bg-darkblue'>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container max-w-5xl mx-auto'>
        <Header />
      </div>
    </div>
  );
};

export default Home;
