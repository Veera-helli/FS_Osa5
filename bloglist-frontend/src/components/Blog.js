import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, user }) => {
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

  const addLike = async () => {
    //HTTP PUT
    console.log('adding like');
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const remove = async () => {
    //HTTP DELETE
    if (window.confirm(`Are you sure you want to remove ${blog.name}?`)) {
      console.log('DELETING BLOG');
      await blogService.remove(blog.id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
  };

  return (
    <div style={blogStyle}>
      {`"${blog.title}"`} by: {blog.author}{' '}
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        hide
      </button>
      <div style={showWhenVisible}>
        {blog.url} <br></br>
        likes {blog.likes}
        <button onClick={addLike}>like</button> <br></br>
        {blog.user.name}
        <br></br>
        <button style={removeButtonVisible} onClick={remove}>
          remove blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
