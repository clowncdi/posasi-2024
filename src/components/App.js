import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import Footer from "components/Footer";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import styled from "@emotion/styled";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <Container>
      {init ? (
        <>
          <AppRouter isLoggedIn={isLoggedIn} user={user} />
        </>
      ) : (
        "Loading..."
      )}
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
