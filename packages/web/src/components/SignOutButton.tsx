import { useQueryClient } from "@tanstack/react-query";

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });

    queryClient.invalidateQueries({ queryKey: ["user"], exact: true });
    window.location.href = "/";
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
