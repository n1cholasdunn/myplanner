const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "/api/oauth2/authorization/google";
  };
  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;
