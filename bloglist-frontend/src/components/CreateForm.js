import { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const CreateForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setTitle('');
      setAuthor('');
      setURL('');
    } catch (exception) {
      console.log('Create form exception!');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default CreateForm;
