import { useUser } from "../hooks/useUser";

const Avatar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {user && user.picture ? (
        <img
          src={user.picture}
          alt="avatar"
          className="ml-6 inline-block h-12 w-12 rounded-full"
        />
      ) : (
        <>
          <span className="ml-6 inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </>
      )}
    </div>
  );
};

export default Avatar;
