import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { IPriceData } from "./Coin";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2em;
  color: ${(props) => props.theme.accentColor};
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 10px;

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
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const PercentSpan = styled.span<{ value: number }>`
  color: ${(props) => (props.value > 0 ? "#3498db" : "#e74c3c")};
`;
const PriceList = styled.div``;
interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  let rates = [
    data?.quotes.USD.percent_change_1h,
    data?.quotes.USD.percent_change_6h,
    data?.quotes.USD.percent_change_12h,
    data?.quotes.USD.percent_change_24h,
  ];
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Price</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>Price</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <PriceList>
          <Overview>
            <OverviewItem>
              <span>ATH Price ( {data?.quotes.USD.ath_date.toString().substring(0, 10)} )</span>
              <span style={{ color: "#3498db" }}>
                $
                {data?.quotes.USD.ath_price.toLocaleString("ko-kr", {
                  maximumSignificantDigits: 11,
                })}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Max rate</span>
              <PercentSpan
                style={{ fontSize: 26 }}
                value={Math.max(rates[0]!, rates[1]!, rates[2]!, rates[3]!)}>
                {Math.max(rates[0]!, rates[1]!, rates[2]!, rates[3]!)}%
              </PercentSpan>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>1 hours percent change</span>
              <PercentSpan value={rates[0]!}>{rates[0]}%</PercentSpan>
            </OverviewItem>
            <OverviewItem>
              <span>6 hours percent change</span>
              <PercentSpan value={rates[1]!}>{rates[1]}%</PercentSpan>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>12 hours percent change</span>
              <PercentSpan value={rates[2]!}>{rates[2]}%</PercentSpan>
            </OverviewItem>
            <OverviewItem>
              <span>24 hours percent change</span>
              <PercentSpan value={rates[3]!}>{rates[3]}%</PercentSpan>
            </OverviewItem>
          </Overview>
        </PriceList>
      )}
    </Container>
  );
}

export default Price;
