// Requiring the lodash library
const lodash = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

//favoriteBlog
const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes >= item.likes ? favorite : item;
  };

  return blogs.length === 0 ? NaN : blogs.reduce(reducer, 0);
};

const mostBlogs = (bloglist) => {
  const bloggerObj = lodash.countBy(bloglist, 'author');
  const reducer = (mostBlogger, item) => {
    return mostBlogger.blogs >= item.blogs ? mostBlogger : item;
  };

  const mostBlogger = Object.entries(bloggerObj)
    .map((p) => ({
      author: p[0],
      blogs: p[1],
    }))
    .reduce(reducer, {});

  //console.log(`length ${bloglist.length}: ${JSON.stringify(ret)}`);

  return mostBlogger;
};

const mostLikes = (bloglist) => {
  // _.groupBy(objects, 'author');
  // _.sumBy(objects, 'likes');

  const bloggerObj = lodash.groupBy(bloglist, 'author');
  const bloggerObjWithLikes = lodash.mapValues(bloggerObj, function (o) {
    const likeAmount = lodash.sumBy(o, function (p) {
      return p.likes;
    });
    return likeAmount;
  });

  const reducer = (mostBlogger, item) => {
    return mostBlogger.likes >= item.likes ? mostBlogger : item;
  };

  const bestBlogger = lodash
    .toPairs(bloggerObjWithLikes)
    .map((p) => ({
      author: p[0],
      likes: p[1],
    }))
    .reduce(reducer, {});
  //console.log(JSON.stringify(bestBlogger));
  return bestBlogger;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
