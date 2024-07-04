const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;
