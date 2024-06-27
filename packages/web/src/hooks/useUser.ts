import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await fetch("/api/user", {
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Redirect to login page if unauthenticated
      window.location.href = `/login`; // Adjust the login URL as needed
      return null;
    }

    const text = await response.text();
    console.error("Failed to fetch user:", text);
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  console.log("user", user);
  return { user: user ?? undefined, error, isLoading };
};
