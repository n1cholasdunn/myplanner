import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "src/types/user";

const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if no token is found
    window.location.href = `/login`;
    return null;
  }

  const response = await fetch("/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Clear the token if unauthorized and redirect to login
      localStorage.removeItem("token");
      window.location.href = `/login`;
      return null;
    }

    const text = await response.text();
    console.error("Failed to fetch user:", text);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useUser = (): {
  user: User | undefined;
  error: Error | null;
  isLoading: boolean;
} => {
  const {
    data: user,
    error,
    isLoading,
  }: UseQueryResult<User | null, Error> = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!localStorage.getItem("token"), // Only fetch if token exists
  });

  console.log("user", user);
  return { user: user ?? undefined, error, isLoading };
};

/*

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "src/types/user";

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

export const useUser = (): {
  user: User | undefined;
  error: Error | null;
  isLoading: boolean;
} => {
  const {
    data: user,
    error,
    isLoading,
  }: UseQueryResult<User | null, Error> = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  console.log("user", user);
  return { user: user ?? undefined, error, isLoading };
};
*/
