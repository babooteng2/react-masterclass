import ApexChart from "react-apexcharts";
import { IChartTypesProps } from "../routes/Chart";

function CandleChart({ data, isDark }: IChartTypesProps) {
  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          name: "Price",
          data: data?.map((prop) => {
            return {
              x: prop.time_close.substring(0, 10),
              y: [
                prop.open.toFixed(3),
                prop.high.toFixed(3),
                prop.low.toFixed(3),
                prop.close.toFixed(3),
              ],
            };
          }),
        },
      ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          height: 300,
          width: 500,
          background: "transparent",
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        /*    stroke: {
          curve: "smooth",
          width: 3,
        }, */
        yaxis: {
          tooltip: {
            enabled: false,
          },
        },
        xaxis: {
          type: "datetime",
          labels: { show: true },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: true,
          },
          categories: data?.map((prop) => prop.time_close.slice(0, 10)),
        },
        tooltip: {
          y: {
            formatter: (value) => `$${value.toFixed(0)}`,
          },
        },
      }}
    />
  );
}

export default CandleChart;
