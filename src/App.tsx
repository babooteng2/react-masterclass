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
  invisible: { opacity: 0, x: 500, scale: 0 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -500, scale: 0 },
};

function App() {
  const [visible, setVisible] = useState(1);
  const nextPlz = () => setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  const prevPlz = () => setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  return (
    <Wrapper>
      <GlobalStyle />
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <Box
              variants={box}
              initial="invisible"
              animate="visible"
              exit="exit"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
      <button onClick={nextPlz}>next</button>
      <button onClick={prevPlz}>prev</button>
    </Wrapper>
  );
}
export default App;
