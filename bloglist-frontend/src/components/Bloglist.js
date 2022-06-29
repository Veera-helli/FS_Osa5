import Notification from './Notification';
import CreateForm from './CreateForm';
import Blog from './Blog';
import blogService from '../services/blogs';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Bloglist = ({
  errorMessage,
  setMessage,
  user,
  setUser,
  blogs,
  setBlogs,
}) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async (blog) => {
    //HTTP PUT
    //console.log('adding like');
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const remove = async (blog) => {
    //HTTP DELETE
    if (window.confirm(`Are you sure you want to remove ${blog.name}?`)) {
      console.log('DELETING BLOG');
      await blogService.remove(blog.id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser');
          setUser(null);
        }}
      >
        log out
      </button>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm
            setBlogs={setBlogs}
            setMessage={setMessage}
            toggleVisibility={toggleVisibility}
          />
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes) //sorting to order blogs by likes
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            remove={remove}
            user={user}
          />
        ))}
    </div>
  );
};

Bloglist.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Bloglist;
