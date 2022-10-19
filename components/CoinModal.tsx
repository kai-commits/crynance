import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { X } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
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
  totalAmount: number;
}

export const CoinModal = ({
  setModalOpen,
  modalActive,
  modalOpen,
  modalBuySell,
  name,
  symbol,
  currentMarketValue,
  totalAmount,
}: ModalProps) => {
  const [coinValue, setCoinValue] = useState<string>('0');
  const [usdValue, setUsdValue] = useState<number>(0);
  const [date, setDate] = useState({year: '0000', month: '00', day: '00'});
  const [user] = useAuthState(auth);

  const purchaseDate = dayjs(`${date.year}-${date.month}-${date.day}`).format('MMM D, YYYY');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 0) {
      setUsdValue(0);
    } else {
      setUsdValue(event.target.valueAsNumber * currentMarketValue);
    }
    setCoinValue(event.target.value);
  };

  const transactionHandler = async () => {
    if (user?.email) {
      try {
        const response = await axios.put('api/db/users', {
          user: user.email,
          name: name,
          symbol: symbol.toUpperCase(),
          buyOrSell: modalBuySell,
          date: purchaseDate,
          coinAmount: Number(coinValue),
          usdAmount: usdValue,
        });
        if (response.status === 500) {
          alert('FAIL');
        }
      } catch (error) {
        console.log('error sending transaction data: ', error);
      }
    } else {
      alert('Must be signed in to make a transaction');
    }
    setModalOpen(false);
    window.location.reload();
  };

  const dateHandler = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case 'year':
        setDate({...date, year: event.target.value});
        break;
      case 'month':
        setDate({...date, month: event.target.value});
        break;
      case 'day':
        setDate({...date, day: event.target.value});
        break;
      default:
        break;
    }
  }

  if (!modalActive) {
    return <></>;
  }

  return (
    <div
      className={classNames([
        modalOpen ? 'animate-slideUp' : 'animate-slideDown',
        'fixed z-[500] bottom-0 right-0 left-0 bg-offwhite rounded-t-lg max-w-4xl mx-auto pb-5 transition-all duration-1000',
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
        <form className='flex focus-visible:outline-none bg-offwhite justify-center font-mono'>
        <input type='number' max={4} min={4} onChange={(event) => dateHandler(event, 'year')} placeholder='YYYY' className='mx-1 w-11 text-center'></input>
        <input type='number' max={2} min={2} onChange={(event) => dateHandler(event, 'month')} placeholder='MM' className='mx-1 w-6 text-center'></input>
        <input type='number' max={2} min={2} onChange={(event) => dateHandler(event, 'day')} placeholder='DD' className='mx-1 w-6 text-center'></input>
        </form>
        <h1>{purchaseDate}</h1>
        <div className='flex text-xl text-darkblue p-4'>
          ${roundNumber(usdValue, 2)}
          <label className='flex text-sm pl-1 items-center'>USD</label>
        </div>
        <div className='flex justify-between w-full pb-4 text-blackeye-blue'>
          <div>Current Balance</div>
          <div>
            {roundNumber(totalAmount, 4)} {symbol.toUpperCase()}
          </div>
        </div>
        <button
          className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer w-full'
          onClick={() => transactionHandler()}
        >
          {modalBuySell === 'buy' ? 'Purchase' : 'Sell'}
        </button>
      </div>
    </div>
  );
};
