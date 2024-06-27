const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <button onClick={handleLogin} className="login-button">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
