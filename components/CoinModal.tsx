import classNames from 'classnames';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { X } from 'react-feather';
import { roundNumber } from '../helpers/math';
import { AutoWidthInput } from './AutoWidthInput';

interface ModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalActive: boolean;
  modalOpen: boolean;
  modalBuySell: string;
  name: string;
  symbol: string;
  currentMarketValue: number;
}

export const CoinModal = ({
  setModalOpen,
  modalActive,
  modalOpen,
  modalBuySell,
  name,
  symbol,
  currentMarketValue,
}: ModalProps) => {
  const [coinValue, setCoinValue] = useState<string>('0');
  const [usdValue, setUsdValue] = useState<number>(0);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 0) {
      setUsdValue(0);
    } else {
      setUsdValue(event.target.valueAsNumber * currentMarketValue);
    }
    setCoinValue(event.target.value);
  };

  if (!modalActive) {
    return <></>;
  }

  return (
    <div
      className={classNames([
        modalOpen ? 'animate-slideUp' : 'animate-slideDown',
        'fixed z-[500] bottom-0 right-0 left-0 bg-offwhite rounded-t-lg max-w-3xl mx-auto pb-5 transition-all duration-1000',
      ])}
    >
      <div className='flex flex-col items-center px-5'>
        <button
          onClick={() => setModalOpen(false)}
          className='absolute top-0 right-0 p-2 text-darkblue'
        >
          <X />
        </button>
        <div className='text-2xl text-darkblue font-semibold p-3'>
          {modalBuySell === 'buy' ? 'Buy' : 'Sell'} {name}
        </div>
        <form className='flex text-green-500'>
          <AutoWidthInput
            type='number'
            min='0'
            inputHandler={inputHandler}
            textSize='text-4xl'
            className='focus-visible:outline-none text-center text-4xl bg-offwhite underline'
          />
          <label className='flex items-center text-xl pl-2'>
            {symbol.toUpperCase()}
          </label>
        </form>
        <div className='flex text-xl text-darkblue p-4'>
          ${roundNumber(usdValue, 2)}
          <label className='flex text-sm pl-1 items-center'>USD</label>
        </div>
        <div className='flex justify-between w-full pb-4 text-blackeye-blue'>
          <div>Current Balance</div>
          <div>0.125 {symbol.toUpperCase()}</div>
        </div>
        <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer w-full'>
          Purchase
        </button>
      </div>
    </div>
  );
};
