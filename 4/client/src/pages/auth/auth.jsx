import { useState } from "react";
import { Button, Input } from "../../ui";
import { AuthAPI } from "../../api";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";

const auth = AuthAPI()

export const AuthPage = () => {
  const [flag, setFlag] = useState(true);

  return (
    <main className={styles.auth}>
      {flag ? (
        <Login flag={flag} setFlag={setFlag} />
      ) : (
        <Register flag={flag} setFlag={setFlag} />
      )}
    </main>
  );
};

const Login = ({ flag, setFlag }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(email.length && password.length) {
      const response = await auth.login({email, password})

      if(response) {
        navigate("/")
      }

      setEmail("")
      setPassword("")
    }
  }

  return (
    <>
      <h1 className={styles.title}>Авторизация</h1>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
      <Input value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"></Input>
      <Button onClick={handleLogin}>Войти</Button>
      <Button onClick={() => setFlag(!flag)} variant="default">
        Хотите зарегистрироваться?
      </Button>
    </>
  );
};

const Register = ({ flag, setFlag }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    if(email.length && password.length) {
      await auth.register({email, password})

      setFlag(true)

      setEmail("")
      setPassword("")
    }
  }

  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <Input value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"></Input>
      <Button onClick={handleRegister}>Зарегистрироваться</Button>
      <Button onClick={() => setFlag(!flag)} variant="default">
        Уже есть аккаунт?
      </Button>
    </>
  );
};
