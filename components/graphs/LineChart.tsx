import HighchartsReact from 'highcharts-react-official';
import Highcharts, { Options, GradientColorStopObject } from 'highcharts';
import useSWR from 'swr';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface LineChartProps {
  queryParams: string;
  pid: string | string[] | undefined;
}

const axiosFetcher = async (
  url: string,
  queryParams = '',
  setter: Dispatch<SetStateAction<number[][]>>
) => {
  return await axios
    .get(`${url}${queryParams}`)
    .then((res) => setter(res.data));
};

export const LineChart = ({ queryParams, pid }: LineChartProps) => {
  const [graphLineColor, setGraphLineColor] = useState('');
  const [graphGradientColor, setGraphGradientColor] = useState<
    GradientColorStopObject[]
  >([]);
  const [coinMarketRangeResponse, setCoinMarketRangeResponse] = useState<
    number[][]
  >([]);

  useSWR(
    [`/api/coins/market_chart/${pid}`, queryParams, setCoinMarketRangeResponse],
    axiosFetcher
  );

  useEffect(() => {
    if (coinMarketRangeResponse.length > 0) {
      if (
        coinMarketRangeResponse[0][1] <
        coinMarketRangeResponse[coinMarketRangeResponse.length - 1][1]
      ) {
        setGraphLineColor('rgba(0,255,0,0.5');
        setGraphGradientColor([
          [0, 'rgba(0,255,0,0.3)'],
          [0.5, 'rgba(0,255,0,0.1)'],
          [1, 'rgba(0,255,0,0.0)'],
        ]);
      } else {
        setGraphLineColor('rgba(255,0,0,0.5');
        setGraphGradientColor([
          [0, 'rgba(255,0,0,0.3)'],
          [0.5, 'rgba(255,0,0,0.1)'],
          [1, 'rgba(255,0,0,0.0)'],
        ]);
      }
    }
  }, [coinMarketRangeResponse]);

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
        name: `${pid}`,
        data: coinMarketRangeResponse,
        color: graphLineColor,
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
          stops: graphGradientColor,
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
