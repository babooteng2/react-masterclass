import React from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { enumKeys, fetchCoinHistory } from "../api";
import { chartTypes, CHART_TYPES, isDarkAtom } from "../Atoms";
import CandleChart from "../component/CandleChart";
import LineChart from "../component/LineChart";
interface IChartProps {
  coinId: string;
}
export interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
export interface IChartTypesProps {
  data?: IHistorical[];
  isDark?: boolean;
}

const ChartTypes = ({ data, isDark }: IChartTypesProps) => ({
  0: <LineChart data={data} isDark={isDark} />,
  1: <CandleChart data={data} isDark={isDark} />,
});

function Chart({ coinId }: IChartProps) {
  const [cType, setCtype] = useRecoilState(chartTypes);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  const buildSelectBox = () => {
    const result = [];
    for (const key in enumKeys(CHART_TYPES)) {
      result.push(
        <option key={key} value={key}>
          {CHART_TYPES[key]}
        </option>
      );
    }
    return result;
  };
  const selectEH = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCtype(+e.currentTarget.value);
  };
  return (
    <div>
      <select onChange={selectEH} value={cType} defaultValue={cType}>
        {buildSelectBox()}
      </select>
      {isLoading ? "Loading chart..." : ChartTypes({ data, isDark })[cType]}
    </div>
  );
}

export default Chart;
