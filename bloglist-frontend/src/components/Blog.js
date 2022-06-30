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
  // if no user or a wrong user is logged in the remove button is hidden
  // remove button is only shown to the user who has added the blog
  const removeButtonVisible = {
    display: user
      ? user.username === blog.user.username
        ? ''
        : 'none'
      : 'none',
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className='blog' style={blogStyle}>
      {`"${blog.title}"`} by: {blog.author}{' '}
      <button
        className='view-button'
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        view
      </button>
      <button
        id='hide-button'
        style={showWhenVisible}
        onClick={toggleVisibility}
      >
        hide
      </button>
      <div id='moreInfo' style={showWhenVisible}>
        {blog.url} <br></br>
        likes {blog.likes}
        <button className='like-button' onClick={() => addLike(blog)}>
          like
        </button>{' '}
        <br></br>
        {blog.user.name}
        <br></br>
        <button
          className='remove-button'
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
