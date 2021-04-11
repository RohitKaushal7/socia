import { useInfiniteQuery } from "react-query";
import { useAppContext } from "../../context/AppContext";
import { getPosts } from "../../services/api/posts";

export const useGetPosts = ({ userId, isFollowing }) => {
  const { authToken } = useAppContext();
  return useInfiniteQuery(
    ["posts", userId],
    ({ pageParam }) =>
      getPosts({ userId, isFollowing, skip: pageParam }, authToken),
    {
      getNextPageParam: (lastPage) => (lastPage.skip ? lastPage.skip : null),
    }
  );
};
