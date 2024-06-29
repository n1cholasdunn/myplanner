import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React from "react";

const LoginButton = () => {
  const handleLoginSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const token = response.credential;

      console.log("Token from Google:", JSON.stringify(token));
      fetch("http://localhost:8080/api/oauth2/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("HELLO");
          console.log("User info from backend:", data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error("No credential found in the response");
    }
  };
  const handleLoginFailure = () => {
    console.error("Login failed");
  };

  return (
    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
  );
};

export default LoginButton;
