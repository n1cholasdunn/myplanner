import { API_URL } from "src/utils/api";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };
  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;
