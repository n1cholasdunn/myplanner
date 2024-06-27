import { useUser } from "../hooks/useUser";
import SignOutButton from "../components/SignOutButton";

const User = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <SignOutButton />
        </>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
};

export default User;
