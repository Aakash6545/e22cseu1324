const axios = require("axios");
const cache = require("../cache/cache");
const {
  sortByPostCount,
  sortByCommentCount,
  sortByRecency,
} = require("../utils/sortUtils");

const { getValidToken } = require("../utils/tokenManager");

const axiosInstance = axios.create({
  baseURL: "http://20.244.56.144/evaluation-service",
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  config.headers.Authorization = token;
  return config;
});

exports.getTopUsersByPostCount = async () => {
  try {
    const cached = cache.get("topUsers");
    if (cached) return cached;

    const { data } = await axiosInstance.get("/users");
    const users = Object.entries(data.users).map(([id, name]) => ({ id, name }));

    const results = await Promise.allSettled(
      users.map(user => axiosInstance.get(`/users/${user.id}/posts`))
    );

    const postCounts = users.map((user, index) => {
      const result = results[index];
      const postCount = result.status === 'fulfilled' ? result.value.data.posts.length : 0;
      return { ...user, postCount };
    });

    const topUsers = sortByPostCount(postCounts).slice(0, 5);
    cache.set("topUsers", topUsers);
    return topUsers;
  } catch (err) {
    console.error("Failed to fetch top users:", err.message);
    throw new Error("Failed to retrieve top users");
  }
};

exports.getPopularPosts = async () => {
  try {
    const cached = cache.get("popularPosts");
    if (cached) return cached;

    const { data: userData } = await axiosInstance.get("/users");
    const userIds = Object.keys(userData.users);

    const postResults = await Promise.allSettled(
      userIds.map(id => axiosInstance.get(`/users/${id}/posts`))
    );

    const allPosts = postResults
      .filter(res => res.status === 'fulfilled')
      .flatMap(res => res.value.data.posts);

    const commentResults = await Promise.allSettled(
      allPosts.map(post => axiosInstance.get(`/posts/${post.id}/comments`))
    );

    const postsWithCommentCount = allPosts.map((post, index) => {
      const commentRes = commentResults[index];
      const commentCount = commentRes.status === 'fulfilled' ? commentRes.value.data.comments.length : 0;
      return { ...post, commentCount };
    });

    const maxCount = Math.max(...postsWithCommentCount.map(p => p.commentCount));
    const popular = postsWithCommentCount.filter(p => p.commentCount === maxCount);

    cache.set("popularPosts", popular);
    return popular;
  } catch (err) {
    console.error("Failed to fetch popular posts:", err.message);
    throw new Error("Failed to retrieve popular posts");
  }
};

exports.getLatestPosts = async () => {
  try {
    const cached = cache.get("latestPosts");
    if (cached) return cached;

    const { data: userData } = await axiosInstance.get("/users");
    const userIds = Object.keys(userData.users);

    const postResults = await Promise.allSettled(
      userIds.map(id => axiosInstance.get(`/users/${id}/posts`))
    );

    const allPosts = postResults
      .filter(res => res.status === 'fulfilled')
      .flatMap(res => res.value.data.posts);

    const latest = sortByRecency(allPosts).slice(0, 5);
    cache.set("latestPosts", latest);
    return latest;
  } catch (err) {
    console.error("Failed to fetch latest posts:", err.message);
    throw new Error("Failed to retrieve latest posts");
  }
};
