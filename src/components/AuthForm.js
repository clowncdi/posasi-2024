import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "@emotion/styled";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setError(error.message.split(":")[1]);
      });
  };
  return (
    <Container onSubmit={onSubmit}>
      <AuthInput
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={onChange}
      />
      <AuthInput
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onChange}
      />
      <AuthSubmit type="submit" value={"로그인"} />
      {error && <span className="authError">{error}</span>}
    </Container>
  );
};

export default AuthForm;

const Container = styled.form`
  width: 100%;
  max-width: 800px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
`;

const AuthInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

const AuthSubmit = styled.input`
  padding: 10px 20px;
  border-radius: 99px;
  border: none;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
`;
