export const CoinModal = () => {
  return (
    <div className='fixed z-[500] h-2/4 bottom-0 right-0 left-0 w-full bg-offwhite rounded-t-lg max-w-3xl mx-auto'>
      <div className='flex flex-col items-center w-full'>
        <div className='absolute top-0 right-0 pr-2 pt-1'>X</div>
        <div>Buy Bitcoin</div>
        <form>
          <input></input>
          <label>BTC</label>
        </form>
        <div>$1000</div>
      </div>
    </div>
  );
};
