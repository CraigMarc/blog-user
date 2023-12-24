import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="error">
      <h1>Login</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default Login;