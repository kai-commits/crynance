import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import useSWR from 'swr';
import { axiosFetcher } from '../../helpers/axiosFetcher';


export const LineChart = () => {
  const { data: coinMarketRangeResponse } = useSWR(
    '/api/coinMarketRange',
    axiosFetcher
  );

  const options = {
    chart: {
      backgroundColor: null,
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
      title: '',
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
