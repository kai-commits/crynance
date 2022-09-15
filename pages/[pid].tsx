import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { ParsedCoin } from './api/coins/[pid]';
import { Transaction } from '../components/Transaction';
import axios from 'axios';
import { roundNumber } from '../helpers/math';
import { CoinModal } from '../components/CoinModal';
import { ConditionWrapper } from '../helpers/conditionalWrapper';

interface TimeRangeButton {
  name: string;
  queryString: string;
  percentageChange: number;
}

const { today, oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo } = {
  today: dayjs().unix(),
  oneDayAgo: dayjs().subtract(1, 'day').unix(),
  oneWeekAgo: dayjs().subtract(1, 'week').unix(),
  oneMonthAgo: dayjs().subtract(1, 'month').unix(),
  oneYearAgo: dayjs().subtract(1, 'year').unix(),
};

const axiosFetcher = async (
  url: string,
  setter: Dispatch<SetStateAction<ParsedCoin>>
) => {
  return await axios.get(`${url}`).then((res) => setter(res.data));
};

const CoinPage: NextPage = (): JSX.Element => {
  const { pid } = useRouter().query;
  const [coinDataResponse, setCoinDataResponse] = useState<ParsedCoin>();
  const [activeTimeButton, setActiveTimeButton] = useState<string>('1D');
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<string>(
    `?from=${oneDayAgo}&to=${today}`
  );
  const [timeRangeButtons, setTimeRangeButtons] = useState<TimeRangeButton[]>(
    []
  );

  useSWR([`/api/coins/${pid}`, setCoinDataResponse], axiosFetcher);

  useEffect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        setModalActive(false);
      }, 500);
    }
  }, [modalOpen]);

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
    return <div className='bg-darkblue w-full h-screen'></div>;
  } else {
    return (
      <>
        <div className='w-full h-full bg-blackeye-blue'>
          <div className='flex flex-col justify-between bg-darkblue h-max max-w-3xl mx-auto'>
            <ConditionWrapper
              condition={modalOpen}
              wrapper={(children) => (
                <div className='bg-black opacity-60 w-full h-full z-50'>
                  {children}
                </div>
              )}
            >
              <div className='flex flex-col items-center px-5'>
                <div className='w-full max-w-3xl'>
                  <div className='flex justify-center text-lightpink text-3xl font-bold cursor-pointer p-4'>
                    {coinDataResponse.name}
                  </div>
                  <div className='flex justify-evenly text-xl'>
                    <div className='text-offwhite pr-3'>
                      ${roundNumber(coinDataResponse.currentMarketValue, 5)}
                    </div>
                    {percentageChange >= 0 ? (
                      <div className='text-green-500 pl-3'>
                        {percentageChange}%
                      </div>
                    ) : (
                      <div className='text-red-500 pl-3'>
                        {percentageChange}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='w-full mx-auto max-w-3xl'>
                {pid && <LineChart queryParams={queryParams} pid={pid} />}
              </div>
              <div className='flex flex-col items-center px-5'>
                <div className='w-full max-w-3xl'>
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
                    <div className='flex justify-center text-lightpink text-xl my-5'>
                      0.146 {coinDataResponse.symbol.toUpperCase()}
                    </div>
                    <div className='flex justify-between text-offwhite'>
                      <div>Current Balance</div>
                      <div>$500</div>
                    </div>
                    <div className='flex justify-between text-lightblue'>
                      <div>Starting Balance</div>
                      <div>$400</div>
                    </div>
                  </div>
                  <div className='flex justify-between w-full my-8'>
                    <button
                      onClick={() => {
                        setModalActive(true);
                        setModalOpen(!modalOpen);
                      }}
                      className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 mr-5'
                    >
                      Buy
                    </button>

                    <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 ml-5'>
                      Sell
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col grow bg-lightblue'>
                <div className='flex flex-col items-center px-5 pb-3'>
                  <Transaction />
                  <Transaction />
                  <Transaction />
                  <Transaction />
                  <Transaction />
                </div>
              </div>
              <Nav />
            </ConditionWrapper>

            <CoinModal
              setModalOpen={setModalOpen}
              modalActive={modalActive}
              modalOpen={modalOpen}
              name={coinDataResponse.name}
              symbol={coinDataResponse.symbol}
              currentMarketValue={coinDataResponse.currentMarketValue}
            />
          </div>
        </div>
      </>
    );
  }
};

export default CoinPage;
