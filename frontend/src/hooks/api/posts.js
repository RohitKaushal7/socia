import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useAppContext } from "../../context/AppContext";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../../services/api/posts";

export const useGetPosts = ({ userId, isFollowing }) => {
  const { authToken } = useAppContext();
  let _key = ["posts"];
  if (userId) {
    _key = ["posts", userId];
  }
  return useInfiniteQuery(
    _key,
    ({ pageParam }) =>
      getPosts({ userId, isFollowing, skip: pageParam }, authToken),
    {
      getNextPageParam: (lastPage) => (lastPage.skip ? lastPage.skip : null),
    }
  );
};

export const useGetPost = ({ postId }) => {
  const { authToken } = useAppContext();

  return useQuery(["post", postId], () => getPost({ postId }, authToken), {
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const { authToken, currentUser } = useAppContext();
  const queryClient = useQueryClient();

  return useMutation(createPost(authToken), {
    onSuccess: (data) => {
      console.log("Post Created - ", data);
      queryClient.setQueryData(["posts", currentUser.id], (oldData) => {
        if (!oldData) return;
        let _newData = JSON.parse(JSON.stringify(oldData));
        _newData?.pages?.[0].posts.unshift(data.createPost);
        return _newData;
      });
      queryClient.invalidateQueries(["posts", null]);
    },
    onError: (err) => {
      console.log("Failed to create Post - ", err.message);
    },
  });
};
export const useUpdatePost = () => {
  const { authToken } = useAppContext();

  return useMutation(updatePost(authToken), {
    onSuccess: (data) => {
      console.log("Post Updated - ", data);
    },
    onError: (err) => {
      console.log("Failed to update Post - ", err.message);
    },
  });
};
export const useDeletePost = () => {
  const { authToken, currentUser } = useAppContext();
  const queryClient = useQueryClient();

  return useMutation(deletePost(authToken), {
    onSuccess: (data, { id }) => {
      console.log("Post Deleted - ", id, data);
      queryClient.setQueryData(["posts", currentUser.id], (oldData) => {
        if (!oldData) return;
        let _newData = JSON.parse(JSON.stringify(oldData));
        _newData?.pages?.some((page) => {
          let _post = page.posts.find((p) => p.id == id);
          if (_post) {
            page.posts = page.posts.filter((p) => p.id != id);
            return true;
          }
          return false;
        });
        return _newData;
      });
    },
    onError: (err) => {
      console.log("Failed to delete Post - ", err);
    },
  });
};
