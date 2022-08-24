import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options } from 'highcharts';
import useSWR from 'swr';
import axios from 'axios';

interface LineChartProps {
  queryParams: string;
  pid: string | string[] | undefined;
}

const axiosFetcher = async (url: string, queryParams = '') => {
  return await axios.get(`${url}${queryParams}`).then((res) => res.data);
};

export const LineChart = ({ queryParams, pid }: LineChartProps) => {
  const { data: coinMarketRangeResponse } = useSWR(
    [`/api/coins/${pid}`, queryParams],
    axiosFetcher
  );

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
        data: coinMarketRangeResponse,
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
      {coinMarketRangeResponse && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};
