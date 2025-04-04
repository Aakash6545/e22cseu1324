import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTopUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Oops! Failed to fetch top users:', err);
      setError('Could not load users right now. Try again later!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  const getActivityStatus = (index) => {
    const statuses = ['Online now', 'Active today', 'Last seen recently', 'Away'];
    return statuses[index % statuses.length];
  };

  const UserSkeleton = () => (
    <div className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mx-3"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="text-right">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mb-1"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 ml-auto"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-5 border-b pb-2 border-gray-200 dark:border-gray-700">
        🏆 Top Contributors
      </h2>

      {error && (
        <div className="bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 text-sm p-4 rounded-md text-center">
          {error}
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">No users found.</p>
      )}

      <div className="space-y-4">
        {isLoading
          ? Array(5).fill(0).map((_, index) => <UserSkeleton key={`skeleton-${index}`} />)
          : users.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200"
              >
                <img
                  src={`https://i.pravatar.cc/80?img=${(user.id % 70) || index}`}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover mx-3 border-2 border-purple-200 dark:border-purple-700"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getActivityStatus(index)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {user.postCount}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopUsers;
