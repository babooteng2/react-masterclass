import { useParams } from "react-router";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const params = useParams() as RouteParams;
  const coinId = params.coinId;
  console.log(coinId);
  return <h2>Coin: {coinId}</h2>;
}

export default Coin;
