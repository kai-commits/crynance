import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';

const Home: NextPage = () => {
  return (
    <div className='h-screen bg-lightblue'>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container max-w-3xl mx-auto'>
        <Header />
        <Nav />
      </div>
    </div>
  );
};

export default Home;
