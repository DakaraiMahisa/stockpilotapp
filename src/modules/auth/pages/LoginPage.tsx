import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>

      <LoginForm />
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default LoginPage;
