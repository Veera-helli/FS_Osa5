import Notification from './Notification';
import CreateForm from './CreateForm';
import Blog from './Blog';
import { useState } from 'react';

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
          <button onClick={toggleVisibility}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateForm setBlogs={setBlogs} setMessage={setMessage} />
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
