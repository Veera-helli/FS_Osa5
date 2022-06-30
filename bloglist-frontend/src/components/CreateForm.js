import { useState } from 'react';

const CreateForm = ({ create, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    create(title, author, url);
    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          className='titleInput'
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          className='authorInput'
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          className='urlInput'
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button
        className='create-button'
        type='submit'
        onClick={toggleVisibility}
      >
        create
      </button>
    </form>
  );
};

export default CreateForm;
