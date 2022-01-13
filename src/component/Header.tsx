import styled from "styled-components";
import { useMatch, useLocation, useNavigate } from "react-router";
import ToggleTheme from "./ToggleTheme";

const HeaderSection = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Title = styled.h1`
  font-size: 2em;
  color: ${(props) => props.theme.accentColor};
`;
const BackBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 7px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  font-family: "Source Sans Pro";
  font-weight: 300;
`;
interface HeaderProps {
  infoDataName?: string;
  loading?: boolean;
}

function Header({ infoDataName, loading }: HeaderProps) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const coinsMatch = useMatch("/");
  const backClickEH = () => {
    navigate("/");
  };
  return (
    <HeaderSection>
      <Title>
        {coinsMatch ? "Coins" : state ? state.name : loading ? "loading..." : infoDataName}
      </Title>
      {coinsMatch ? null : <BackBtn onClick={backClickEH}>Back to Coins</BackBtn>}
      <ToggleTheme />
    </HeaderSection>
  );
}

export default Header;
