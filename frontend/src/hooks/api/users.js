import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import { getUser, updateUser } from "../../services/api/users";

export const useGetUser = ({ userId }) => {
  const { authToken } = useAppContext();
  return useQuery(["user", userId], () => getUser({ userId }, authToken));
};

export const useUpdateUser = () => {
  const { authToken, currentUser } = useAppContext();
  const queryClient = useQueryClient();
  return useMutation(
    ({ data }) => updateUser({ userId: currentUser.id, data }, authToken),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["user", currentUser.id]);
      },
    }
  );
};
