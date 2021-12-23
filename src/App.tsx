import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import GlobalStyle from "./GlobalStyle";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const boxVariants: Variants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
  drag: { backgroundColor: "rgb(45, 52, 54)" },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <GlobalStyle />
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={1}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
      </BiggerBox>
    </Wrapper>
  );
}
export default App;
