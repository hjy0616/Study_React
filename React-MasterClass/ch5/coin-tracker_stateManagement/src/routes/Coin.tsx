import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useMatch } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { queryInfo, queryPrice } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
  quotes: {
    USD: {
      price: number;
      market_cap: number;
    };
  };
  total_supply: number;
  max_supply: number;
}

export default function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);
  const { state } = useLocation();

  const { data: info, isLoading: isInfoLoading } = useQuery<IInfo>({
    queryKey: ["info", coinId],
    queryFn: () => queryInfo(coinId!),
    enabled: !!coinId,
  });

  const { data: price, isLoading: isPriceLoading } = useQuery<IPrice>({
    queryKey: ["price", coinId],
    queryFn: () => queryPrice(coinId!),
    enabled: !!coinId,
    refetchInterval: 5000,
  });

  const loading = isInfoLoading || isPriceLoading;

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : isInfoLoading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${price?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Market Cap:</span>
              <span>{price?.quotes.USD.market_cap}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          {priceMatch ? (
            <Price />
          ) : chartMatch ? (
            <Chart coinId={coinId!} />
          ) : null}

          <Routes>
            <Route path={`/:coinId/price`} element={<Price />} />
            <Route
              path={`/:coinId/chart`}
              element={<Chart coinId={coinId!} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}
