import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useMatch, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Header from "../component/Header";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px 20px;

  span:first-child {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Description = styled.p`
  margin: 20px 5px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 7px 0;
  border-radius: 10px;
  a {
    display: block;
  }
`;
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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
export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: Date;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () =>
    fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>
      <Header infoDataName={infoData?.name} loading={loading} />
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>total supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch ? false : true}>
              <Link to="chart">chart</Link>
            </Tab>
            <Tab isActive={priceMatch ? true : false}>
              <Link to="price">price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route index element={<Chart coinId={coinId as string} />} />
            <Route path="chart" element={<Chart coinId={coinId as string} />} />
            <Route path="price" element={<Price coinId={coinId as string} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
