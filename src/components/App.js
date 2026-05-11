import React from "react";
import AppRouter from "components/Router";
import Footer from "components/Footer";
import styled from "@emotion/styled";

function App() {
  return (
    <Container>
      <AppRouter />
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;
