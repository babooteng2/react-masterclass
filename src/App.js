import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;
const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius: 0px;
  }
  50% {    
    border-radius: 100px;
  }
  100% {
    transform:rotate(360deg);
    border-radius: 0px;
  }
`;
const Emoji = styled.span`
  font-size: 36px;  
`;
const Box = styled.div`
  background-color: tomato;
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 3s linear infinite;
  ${Emoji} {    
    &:hover {
      font-size: 60px;
    }
    &:active {
      opacity: .5;
    }
  }
`;


function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😊</Emoji>
      </Box>
      <Emoji>😊</Emoji>
    </Wrapper>
  )
}

export default App;
