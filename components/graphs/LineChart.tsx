import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import useSWR from 'swr';

const axiosFetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const LineChart = () => {
  const { data: coinMarketRangeResponse } = useSWR(
    '/api/coinMarketRange',
    axiosFetcher
  );

  const options = {
    chart: {
      backgroundColor: null,
      zoomType: 'x',
      type: 'area',
    },
    title: {
      text: '',
    },
    series: [
      {
        name: 'name',
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
            [1, 'rgba(255,0,0,0)'],
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
