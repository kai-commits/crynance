import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options } from 'highcharts';
import useSWRImmutable from 'swr/immutable';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface LineChartProps {
  queryParams: { name: string; queryString: string }[];
  pid: string | string[] | undefined;
  currentTimeRange: string;
}

const axiosFetcher = async (url: string, queryParams = '') => {
  return await axios.get(`${url}${queryParams}`).then((res) => res.data);
};

export const LineChart = ({
  queryParams,
  pid,
  currentTimeRange,
}: LineChartProps) => {
  const { data: coinMarket1DayResponse } = useSWRImmutable(
    [`/api/coins/${pid}`, queryParams[0].queryString],
    axiosFetcher
  );
  const { data: coinMarket1WeekResponse } = useSWRImmutable(
    [`/api/coins/${pid}`, queryParams[1].queryString],
    axiosFetcher
  );
  const { data: coinMarket1MonthResponse } = useSWRImmutable(
    [`/api/coins/${pid}`, queryParams[2].queryString],
    axiosFetcher
  );
  const { data: coinMarket1YearResponse } = useSWRImmutable(
    [`/api/coins/${pid}`, queryParams[3].queryString],
    axiosFetcher
  );

  const [currentTimeData, setCurrentTimeData] = useState();

  useEffect(() => {
    switch (currentTimeRange) {
      case '1D':
        setCurrentTimeData(coinMarket1DayResponse);
        break;
      case '1W':
        console.log(coinMarket1WeekResponse)
        setCurrentTimeData(coinMarket1WeekResponse);
        break;
      case '1M':
        setCurrentTimeData(coinMarket1MonthResponse);
        break;
      case '1Y':
        setCurrentTimeData(coinMarket1YearResponse);
        break;
      default:
        break;
    }
  }, [
    coinMarket1DayResponse,
    coinMarket1MonthResponse,
    coinMarket1WeekResponse,
    coinMarket1YearResponse,
    currentTimeRange,
    currentTimeData,
  ]);

  const options: Options = {
    chart: {
      backgroundColor: undefined,
      // zoomType: 'x',
      type: 'area',
      spacingLeft: -8,
      spacingRight: -8,
    },
    title: {
      text: '',
    },
    series: [
      {
        type: 'area',
        name: 'Bitcoin',
        data: currentTimeData,
        color: 'rgba(255,0,0,0.5)',
      },
    ],
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      visible: false,
    },
    yAxis: {
      gridLineWidth: 0,
      visible: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        threshold: null,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, 'rgba(255,0,0,0.3)'],
            [0.5, 'rgba(255,0,0,0.1)'],
            [1, 'rgba(255,0,0,0.0)'],
          ],
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
