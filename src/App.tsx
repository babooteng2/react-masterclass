import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 100px;
  width: 200px;
  height: 200px;
  border-radius: 50px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const boxVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, rotateZ: 360 },
  exit: { opacity: 0, scale: 0, y: 100 },
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => {
    setShowing((prev) => !prev);
  };
  return (
    <Wrapper>
      <GlobalStyle />
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        ) : null}
      </AnimatePresence>
      <button onClick={toggleShowing}>Click</button>
    </Wrapper>
  );
}
export default App;
