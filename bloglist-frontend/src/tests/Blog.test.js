import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('Blog', () => {
  let container;
  const addLikeMock = jest.fn();
  const removeMock = jest.fn();

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Annie',
      url: 'testurl.com',
      user: { username: 'Anne' },
    };

    container = render(
      <Blog
        blog={blog}
        addLike={addLikeMock}
        remove={removeMock}
        user={{ username: 'Anne' }}
      />
    ).container;
  });
  // 5.13
  test('renders title and author but not url or likes', () => {
    const titleAndAuthor = screen.getByText(
      '"Component testing is done with react-testing-library" by: Annie'
    );
    expect(titleAndAuthor).toBeDefined();

    const div = container.querySelector('#moreInfo');
    expect(div).toHaveStyle('display: none');
  });
  // 5.14
  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const div = container.querySelector('#moreInfo');
    expect(div).toHaveStyle('display: block');
  });

  // 5.15
  test('calls mock twice when like button is clicked', async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(addLikeMock.mock.calls).toHaveLength(2);
  });
});
