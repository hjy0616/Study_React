import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";

export const queryInfo = async (coinId: string) => {
  const res = await axios.get(`${BASE_URL}/coins/${coinId}`);
  return res.data;
};

export const queryPrice = async (coinId: string) => {
  const res = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  return res.data;
};

export const queryCoins = async () => {
  const res = await axios.get(`${BASE_URL}/coins`);
  return res.data;
};

const ChartBASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export const queryChart = async (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  const res = await axios.get(
    `${ChartBASE_URL}?coinId=${coinId}&start=${startDate}&end=${endDate}`
  );
  return res.data;
};
