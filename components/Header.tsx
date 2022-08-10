import Link from 'next/link';
import { Search } from './Search';

export const Header = (): JSX.Element => {
  return (
    <div className='bg-darkblue sticky w-full top-0'>
      <div className='px-5'>
        <div className='flex items-center flex-col w-full max-w-3xl mx-auto'>
          <div className='flex flex-col items-center'>
            <div className='text-lightpink text-3xl font-bold cursor-pointer p-4'>
              Crynance
            </div>
            <div className='text-offwhite text-5xl'>$500</div>
            <div className='text-lightblue p-4'>$400</div>
          </div>
          <div className='flex justify-between w-full mb-8'>
            <Link href='/bought'>
              <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 mr-5'>
                Buy
              </button>
            </Link>
            <Link href='/sold'>
              <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 ml-5'>
                Sell
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
};
