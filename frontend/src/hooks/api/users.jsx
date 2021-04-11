import { useQuery } from "react-query";
import { useAppContext } from "../../context/AppContext";
import { getUser } from "../../services/api/users";

export const useGetUser = ({ userId }) => {
  const { authToken } = useAppContext();
  return useQuery(["user", userId], () => getUser({ userId }, authToken));
};
