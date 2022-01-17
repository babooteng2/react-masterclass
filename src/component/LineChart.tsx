import ApexChart from "react-apexcharts";
import { IChartTypesProps } from "../routes/Chart";

function LineChart({ data, isDark }: IChartTypesProps) {
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "Price",
          data: data?.map((prop) => prop.close),
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
        stroke: {
          curve: "smooth",
          width: 3,
        },
        yaxis: { labels: { show: false } },
        xaxis: {
          /* type: "datetime", */
          labels: { show: false },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          categories: data?.map((prop) => prop.time_close.slice(0, 10)),
        },
        fill: {
          colors: ["#0fbcf9"],
          type: "gradient",
          gradient: {
            type: "Horizontal",
            gradientToColors: ["#0be881"],
            stops: [0, 100],
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `$${value.toFixed(3)}`,
          },
        },
      }}
    />
  );
}

export default LineChart;
