import Notification from './Notification';
import CreateForm from './CreateForm';
import Blog from './Blog';
import LoginForm from './LoginForm';
import blogService from '../services/blogs';
import { useState } from 'react';

const Bloglist = ({
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  setMessage,
  user,
  setUser,
  blogs,
  setBlogs,
  handleLogin,
}) => {
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

  const create = async (title, author, url) => {
    try {
      await blogService.create({
        title,
        author,
        url,
      });
      console.log('Created new blog!');
      setMessage('A new blog was added!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setMessage('Could not add a new blog');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log('Create form exception!');
    }
  };

  const loggedIn = () => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
      setVisible(!visible);
      console.log(`logged in visibility: ${visible}`);
    };
    return (
      <div>
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
          <div style={showWhenVisible}>
            <button onClick={toggleVisibility}>create new blog</button>
          </div>
          <div style={hideWhenVisible}>
            <CreateForm create={create} toggleVisibility={toggleVisibility} />
            <button onClick={toggleVisibility}>cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const loginForm = () => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
      setVisible(!visible);
      console.log(`not logged in visibility: ${visible}`);
    };

    return (
      <div>
        <button
          id='init-login'
          style={hideWhenVisible}
          onClick={toggleVisibility}
        >
          login
        </button>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <div>{user === null ? loginForm() : loggedIn()}</div>

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

export default Bloglist;
