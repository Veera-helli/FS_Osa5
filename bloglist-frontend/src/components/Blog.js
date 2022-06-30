import { useState } from 'react';

const Blog = ({ blog, addLike, remove, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const removeButtonVisible = {
    display: user.username === blog.user.username ? '' : 'none',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      {`"${blog.title}"`} by: {blog.author}{' '}
      <button
        id='view-button'
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        view
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <div id='moreInfo' style={showWhenVisible}>
        {blog.url} <br></br>
        likes {blog.likes}
        <button id='like-button' onClick={() => addLike(blog)}>
          like
        </button>{' '}
        <br></br>
        {blog.user.name}
        <br></br>
        <button
          id='remove-button'
          style={removeButtonVisible}
          onClick={() => remove(blog)}
        >
          remove blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
