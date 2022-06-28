import { useState } from 'react';

const Blog = ({ blog }) => {
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

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle}>
      "{blog.title}" by: {blog.author}{' '}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <div style={showWhenVisible}>
        {blog.url} <br></br>
        likes {blog.likes}
        <button>like</button>
      </div>
    </div>
  );
};

export default Blog;
