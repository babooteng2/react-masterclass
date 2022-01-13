import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../Atoms";

const ToggleWrapper = styled.label`
  width: 130px;
  display: block;
  position: absolute;
  left: 0;
`;
const ToggleInput = styled.input`
  position: relative;
  top: 0;
  opacity: 0;
`;
const ToggleDiv = styled.div<{ isEnabled: boolean }>`
  height: 32px;
  width: 65px;
  background: ${(props) => props.theme.black};
  transition: background-color 1s ease-out;
  border-radius: 20px;
  padding: 6px;
  position: relative;
  cursor: pointer;
  ::before {
    content: "";
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 15px;
    background: ${(props) => props.theme.white};
    position: absolute;
    z-index: 2;
    transform: ${(props) => (props.isEnabled ? "translateX(32px)" : "translateX(4)")};
    transition: transform 0.5s ease;
  }
`;
const IconsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 2px;
  svg {
    fill: ${(props) => props.theme.white};
    z-index: 0;
  }
`;

function ToggleTheme() {
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleState = () => {
    setDarkAtom((prev) => !prev);
  };
  return (
    <ToggleWrapper htmlFor="toggle">
      <ToggleDiv isEnabled={isDark}>
        <IconsDiv>
          <FaMoon />
          <FaSun />
        </IconsDiv>
        <ToggleInput type="checkbox" id="toggle" checked={isDark} onChange={toggleState} />
      </ToggleDiv>
    </ToggleWrapper>
  );
}

export default ToggleTheme;
