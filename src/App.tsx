import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 40px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const box = {
  entry: (isBack: boolean) => ({
    opacity: 0,
    x: isBack ? -300 : 300,
    scale: 0,
  }),
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.1 } },
  exit: (isBack: boolean) => ({
    opacity: 0,
    x: isBack ? 300 : -300,
    scale: 0,
    transition: { duration: 0.1 },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlz = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const prevPlz = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };
  return (
    <Wrapper>
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box
          custom={back}
          variants={box}
          initial="entry"
          animate="visible"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlz}>next</button>
      <button onClick={prevPlz}>prev</button>
    </Wrapper>
  );
}
export default App;
