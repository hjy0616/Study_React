import { useQuery } from "@tanstack/react-query";
import { queryChart } from "../api";
import ApexChart from "react-apexcharts";

interface IOhlcv {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: { coinId: string }) => {
  const { data: chartData, isLoading } = useQuery<IOhlcv[]>({
    queryKey: ["chart", coinId],
    queryFn: () => queryChart(coinId),
  });

  return (
    <>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: chartData?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "line",
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              grid: {
                show: false,
              },
              xaxis: {
                labels: {
                  show: false,
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default Chart;
