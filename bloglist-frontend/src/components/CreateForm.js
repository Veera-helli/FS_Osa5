import { useState } from 'react';

const CreateForm = ({ create, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    create(title, author, url);
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          id='titleInput'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id='authorInput'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          id='urlInput'
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button id='create-button' type='submit' onClick={toggleVisibility}>
        create
      </button>
    </form>
  );
};

export default CreateForm;
