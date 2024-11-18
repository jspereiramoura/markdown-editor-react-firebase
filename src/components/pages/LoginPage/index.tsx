import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../stores/contexts/AuthContext";
import Button from "../../atoms/Button";
import LabeledInput from "../../molecules/LabeledInput";
import Layout from "../../templates/Layout";
import { useState } from "react";

type LoginPageProps = {};

const LoginPage = ({}: LoginPageProps) => {
  const { hash } = useLocation();
  const { login, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const shouldShowSignUp = hash === "#sign-up";
  const text = shouldShowSignUp ? "Sign up" : "Sign in";

  const handlerSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const handler = shouldShowSignUp ? signUp : login;
    handler?.(email, password);
  };

  return (
    <Layout className="flex flex-col justify-center items-center gap-4 text-paragraph">
      <section className="flex flex-col justify-center items-center border p-4">
        <h1 className="text-title">{text}</h1>
        <form
          onSubmit={handlerSubmit}
          className="flex flex-col w-[320px] mx-auto text-gray-200 gap-4"
        >
          <LabeledInput
            label="Username"
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <LabeledInput
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button type="submit">{text}</Button>
        </form>
      </section>
      <div className="flex p-4 border text-center">
        <span className="w-[320px]">
          {shouldShowSignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link
            to={shouldShowSignUp ? "#" : "#sign-up"}
            className="text-cyan-200 font-bold hover:underline"
          >
            {shouldShowSignUp ? "Sign in" : "Sign up"}
          </Link>
        </span>
      </div>
    </Layout>
  );
};

export default LoginPage;
