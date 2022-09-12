import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { roundNumber } from '../../helpers/math';

interface ModalProps {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  name: string;
  symbol: string;
  currentMarketValue: number;
}

export const CoinModal = ({
  setModalActive,
  name,
  symbol,
  currentMarketValue,
}: ModalProps) => {
  const [purchaseAmount, setPurchaseAmount] = useState<string>('0');
  const [equivalentValue, setEquivalentValue] = useState<number>(0);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPurchaseAmount(event.target.valueAsNumber.toFixed(2));
    console.log(purchaseAmount)
    setEquivalentValue(event.target.valueAsNumber * currentMarketValue);
  };

  return (
    <div className='fixed z-[500] h-2/4 bottom-0 right-0 left-0 w-full bg-offwhite rounded-t-lg max-w-3xl mx-auto'>
      <div className='flex flex-col items-center w-full'>
        <button
          onClick={() => setModalActive(false)}
          className='absolute top-0 right-0 pr-2 pt-1'
        >
          X
        </button>
        <div className='text-xl text-darkblue font-semibold p-3'>
          Buy {name}
        </div>
        <form className='flex'>
          <input
            type='number'
            value={purchaseAmount}
            onChange={(event) => inputHandler(event)}
            className='text-3xl text-lightpink focus-visible:outline-none text-center center'
          ></input>
          <label className=''>{symbol.toUpperCase()}</label>
        </form>
        <div className='text-xl text-darkblue p-3'>${roundNumber(equivalentValue, 2)}</div>
      </div>
    </div>
  );
};
