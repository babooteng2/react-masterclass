import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import Header from "../component/Header";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boardColor};
  color: black;
  border-radius: 15px;
  margin-bottom: 10px;
  ::before {
    opacity: 0;
  }
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  @keyframes Fadein {
    from {
      opacity: 0;
      margin-bottom: 100vh;
    }
    to {
      opacity: 1;
      margin-bottom: 10px;
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 1em;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>COINS</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin, index) => (
            <Coin
              key={coin.id}
              style={{
                animation: `2s ease .${index}s 1 normal none running Fadein`,
              }}>
              <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
