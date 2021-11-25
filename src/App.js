import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: ${props=>props.theme.backgroundColor}
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>wow</Title>
    </Wrapper>
  )
}

export default App;
