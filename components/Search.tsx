import { Search as SearchIcon } from 'react-feather';

export const Search = () => {
  return (
    <div className='bg-blackeye-blue'>
      <form>
        <div className='relative max-w-3xl mx-auto'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none mx-3'>
            <SearchIcon className='text-lightblue'/>
          </div>
          <input
            type='search'
            id='default-search'
            className='block p-4 pl-14 w-full text-sm text-offwhite bg-blackeye-blue focus-visible:outline-none mx-auto'
            placeholder='Search coins...'
            required
          />
          <button
            type='submit'
            className='text-offwhite absolute right-2.5 bottom-2.5 bg-blackeye-blue border-lightpink border-2 font-medium rounded text-sm px-3 py-1 mx-3'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
