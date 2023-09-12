import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Transaction } from '../components/Transaction';
import axios from 'axios';
import { roundNumber } from '../helpers/math';
import { CoinModal } from '../components/CoinModal';
import { ConditionWrapper } from '../helpers/conditionalWrapper';
import { TrendingDown, TrendingUp } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ParsedCoin, TransactionLog } from '@/types';

interface TimeRangeButton {
  name: string;
  queryString: string;
  percentageChange: number;
}

interface TotalCoinData {
  totalAmount: number;
  totalCurrentValue: number;
  totalInitialValue: number;
}

const { today, oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo } = {
  today: dayjs().unix(),
  oneDayAgo: dayjs().subtract(1, 'day').unix(),
  oneWeekAgo: dayjs().subtract(1, 'week').unix(),
  oneMonthAgo: dayjs().subtract(1, 'month').unix(),
  oneYearAgo: dayjs().subtract(1, 'year').unix(),
};

const CoinPage: NextPage = (): JSX.Element => {
  const { pid } = useRouter().query;
  const [user] = useAuthState(auth);
  const [coinDataResponse, setCoinDataResponse] = useState<ParsedCoin>();
  const [activeTimeButton, setActiveTimeButton] = useState<string>('1D');
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalBuySell, setModalBuySell] = useState<string>('');
  const [transactions, setTransactions] = useState<TransactionLog[]>([]);
  const [queryParams, setQueryParams] = useState<string>(
    `?from=${oneDayAgo}&to=${today}`
  );
  const [timeRangeButtons, setTimeRangeButtons] = useState<TimeRangeButton[]>(
    []
  );
  const [totalCoinData, setTotalCoinData] = useState<TotalCoinData>({
    totalAmount: 0,
    totalCurrentValue: 0,
    totalInitialValue: 0,
  });

  useEffect(() => {
    if (pid !== undefined) {
      axios
        .get(`/api/coins/${pid}`)
        .then((res) => setCoinDataResponse(res.data));
    }
  }, [pid]);

  useEffect(() => {
    if (user?.email && coinDataResponse?.name) {
      axios
        .get(
          `api/db/transactions?user=${user.email}&coin=${coinDataResponse.name}`
        )
        .then((res) => {
          setTransactions(res.data);
        });
    }
  }, [user?.email, coinDataResponse?.name]);

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        setModalActive(false);
      }, 500);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (coinDataResponse) {
      const totalAmount = transactions
        .map((transaction: TransactionLog) => {
          if (transaction.buyOrSell === 'buy') {
            return transaction.coinAmount;
          } else {
            return -transaction.coinAmount;
          }
        })
        .reduce((prev, curr) => prev + curr, 0);
      const totalInitialValue = transactions
        .map((transactions: TransactionLog) => {
          if (transactions.buyOrSell === 'buy') {
            return transactions.usdAmount;
          } else {
            return -transactions.usdAmount;
          }
        })
        .reduce((prev, curr) => prev + curr, 0);
      const totalCurrentValue =
        totalAmount * coinDataResponse.currentMarketValue;
      setTotalCoinData({
        totalAmount,
        totalInitialValue,
        totalCurrentValue,
      });
    }
  }, [coinDataResponse, transactions]);

  useEffect(() => {
    if (coinDataResponse) {
      setPercentageChange(
        roundNumber(coinDataResponse.priceChangePercentage1D, 2)
      );
      setTimeRangeButtons([
        {
          name: '1D',
          queryString: `?from=${oneDayAgo}&to=${today}`,
          percentageChange: roundNumber(
            coinDataResponse.priceChangePercentage1D,
            2
          ),
        },
        {
          name: '1W',
          queryString: `?from=${oneWeekAgo}&to=${today}`,
          percentageChange: roundNumber(
            coinDataResponse.priceChangePercentage1W,
            2
          ),
        },
        {
          name: '1M',
          queryString: `?from=${oneMonthAgo}&to=${today}`,
          percentageChange: roundNumber(
            coinDataResponse.priceChangePercentage1M,
            2
          ),
        },
        {
          name: '1Y',
          queryString: `?from=${oneYearAgo}&to=${today}`,
          percentageChange: roundNumber(
            coinDataResponse.priceChangePercentage1Y,
            2
          ),
        },
      ]);
    }
  }, [coinDataResponse]);

  const timeRangeButtonClasses = (button: TimeRangeButton): string => {
    return classNames('text-bold border-2 px-2 rounded', {
      'border-darkblue text-lightblue': activeTimeButton !== button.name,
      'border-offwhite text-offwhite': activeTimeButton === button.name,
    });
  };

  const timeButtonHandler = (button: TimeRangeButton) => {
    setActiveTimeButton(button.name);
    setQueryParams(button.queryString);
    setPercentageChange(button.percentageChange);
  };

  if (!coinDataResponse) {
    return <div className='w-full h-screen bg-gray-500'></div>;
  } else {
    return (
      <>
        <div className='w-full h-full bg-gray-500'>
          <div className='flex flex-col justify-between sm:w-[26rem] w-full min-h-screen mx-auto bg-darkblue'>
            <div className='fixed top-0 z-20 h-24 bg-gray-500 sm:w-full' />
            <div className='sticky sm:top-9 top-0 z-30 flex-col items-center px-5 pb-6 bg-darkblue sm:rounded-t-[4rem] sm:border-black sm:border-t-8 sm:border-x-8'>
              <div className='w-full mt-6'>
                <div className='flex justify-center p-4 text-3xl font-bold cursor-pointer text-lightpink'>
                  {coinDataResponse.name}
                </div>
                <div className='flex text-xl justify-evenly'>
                  <div className='pr-3 text-offwhite'>
                    ${roundNumber(coinDataResponse.currentMarketValue, 5)}
                  </div>
                  {percentageChange >= 0 ? (
                    <div className='flex text-green-500'>
                      {percentageChange}%
                      <TrendingUp className='pt-1 ml-1' />
                    </div>
                  ) : (
                    <div className='flex text-red-500'>
                      {percentageChange}%
                      <TrendingDown className='pt-1 ml-1' />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='w-full mx-auto sm:border-black sm:border-x-8'>
              {pid && <LineChart queryParams={queryParams} pid={pid} />}
            </div>
            <div className='flex flex-col items-center px-5 sm:border-black sm:border-x-8'>
              <div className='w-full max-w-4xl'>
                <div className='flex justify-between'>
                  {timeRangeButtons.map((button, index) => (
                    <button
                      key={index}
                      className={timeRangeButtonClasses(button)}
                      onClick={() => timeButtonHandler(button)}
                    >
                      {button.name}
                    </button>
                  ))}
                </div>
                <div className='flex flex-col'>
                  <div className='flex justify-center my-5 text-xl text-lightpink'>
                    {roundNumber(totalCoinData.totalAmount, 4)}{' '}
                    {coinDataResponse.symbol.toUpperCase()}
                  </div>
                  <div className='flex justify-between text-offwhite'>
                    <div>Current Balance</div>
                    <div>
                      ${roundNumber(totalCoinData.totalCurrentValue, 2)}
                    </div>
                  </div>
                  <div className='flex justify-between text-lightblue'>
                    <div>Starting Balance</div>
                    <div>
                      ${roundNumber(totalCoinData.totalInitialValue, 2)}
                    </div>
                  </div>
                </div>
                <div className='flex justify-between w-full my-8'>
                  <button
                    onClick={() => {
                      setModalActive(true);
                      setModalOpen(!modalOpen);
                      setModalBuySell('buy');
                    }}
                    className='flex-1 px-4 py-2 mr-5 font-bold rounded cursor-pointer bg-lightpink text-darkblue'
                  >
                    Bought
                  </button>

                  <button
                    onClick={() => {
                      setModalActive(true);
                      setModalOpen(!modalOpen);
                      setModalBuySell('sell');
                    }}
                    className='flex-1 px-4 py-2 ml-5 font-bold rounded cursor-pointer bg-lightpink text-darkblue'
                  >
                    Sold
                  </button>
                </div>
              </div>
            </div>
            {transactions.length > 0 ? (
              <div className='flex flex-col sm:border-black grow bg-lightblue sm:border-x-8'>
                <div className='flex flex-col px-5 pb-12'>
                  {transactions.map((transaction, index) => (
                    <Transaction
                      key={index}
                      {...transaction}
                      totalAmount={totalCoinData.totalAmount}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            <Nav />

            <CoinModal
              setModalOpen={setModalOpen}
              modalActive={modalActive}
              modalOpen={modalOpen}
              modalBuySell={modalBuySell}
              name={coinDataResponse.name}
              symbol={coinDataResponse.symbol}
              totalAmount={totalCoinData.totalAmount}
            />
          </div>
          <div className='fixed bottom-0 z-20 h-24 bg-gray-500 sm:w-full' />
        </div>
      </>
    );
  }
};

export default CoinPage;
