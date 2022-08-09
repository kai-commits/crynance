export const Header = (): JSX.Element => {
  return (
    <div className='bg-darkblue'>
      <div className='flex items-center flex-col w-full sticky max-w-3xl mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='text-lightpink text-3xl font-bold cursor-pointer p-4'>
            Crynance
          </div>
          <div className='text-offwhite text-5xl'>$500</div>
          <div className='text-lightblue p-4'>$400</div>
        </div>
        <div className='flex justify-between w-full mb-8'>
          <button className='bg-lightpink px-6 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 mx-5'>
            Buy
          </button>
          <button className='bg-lightpink px-6 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 mx-5'>
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};
