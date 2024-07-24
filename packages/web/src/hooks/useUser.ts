import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "src/types/user";
import { API_URL } from "../utils/api";

const fetchUser = async () => {
  const response = await fetch(`${API_URL}/user-info`, {
    method: "GET",
    //redirect: "follow",
    credentials: "include",
  }).then((response) => response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
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
    enabled: true,
  });

  return { user: user ?? undefined, error, isLoading };
};
