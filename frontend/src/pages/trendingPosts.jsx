import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/posts?type=popular');
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch trending posts:', error);
      setError('Unable to load trending posts. Please try again later!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - postTime) / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-orange-500 dark:text-orange-400">🔥 Trending Posts</h1>
      </div>

      {error && (
        <div className="text-center py-6 bg-red-50 dark:bg-red-900 dark:text-red-200 text-red-600 rounded-xl">
          <p>{error}</p>
        </div>
      )}

      {!error && isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-lg">No trending posts found. Be the trendsetter!</p>
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/trending-${post.id || index}/600/400`}
                  alt="Trending post visual"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {post.title || `Hot Post #${index + 1}`}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getTimeAgo(post.timestamp || new Date())}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://i.pravatar.cc/40?img=${post.userid || index}`}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      User #{post.userid || 'Unknown'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    💬 {post.commentCount ?? Math.floor(Math.random() * 10)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;
