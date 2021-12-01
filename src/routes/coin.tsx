import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
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
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  const { coinId } = useParams();
  const { state } = useLocation();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      console.log(info, priceInfo);
    })();
  }, []);
  return (
    <Container>
      <Header>{<Title>{state?.name || "Loading..."}</Title>}</Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <span>{/* {priceInfo.quotes.USD.price} */}</span>
      )}
    </Container>
  );
}

export default Coin;
