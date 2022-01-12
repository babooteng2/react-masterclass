import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalStyle from "./GlobalStyle";
import "./styles.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
