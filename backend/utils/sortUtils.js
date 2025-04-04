exports.sortByPostCount = (users) => {
    return users.sort((a, b) => b.postCount - a.postCount);
  };
  
  exports.sortByCommentCount = (posts) => {
    return posts.sort((a, b) => b.commentCount - a.commentCount);
  };
  
  exports.sortByRecency = (posts) => {
    return posts.sort((a, b) => b.id - a.id);
  };