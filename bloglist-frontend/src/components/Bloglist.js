import Notification from './Notification';
import CreateForm from './CreateForm';
import Blog from './Blog';

const Bloglist = ({
  errorMessage,
  setMessage,
  user,
  setUser,
  blogs,
  setBlogs,
}) => (
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
    <CreateForm setBlogs={setBlogs} setMessage={setMessage} />

    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default Bloglist;
