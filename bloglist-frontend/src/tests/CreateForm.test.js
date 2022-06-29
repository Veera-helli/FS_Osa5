import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateForm from '../components/CreateForm';

describe('CreateForm', () => {
  let container;
  const createMock = jest.fn();
  const toggleVisibilityMock = jest.fn();

  beforeEach(() => {
    container = render(
      <CreateForm create={createMock} toggleVisibility={toggleVisibilityMock} />
    ).container;
  });

  // 5.16
  test('calls create', async () => {
    const user = userEvent.setup();

    const titleInput = container.querySelector('#titleInput');
    const authorInput = container.querySelector('#authorInput');
    const urlInput = container.querySelector('#urlInput');
    const createButton = screen.getByText('create');

    await user.type(titleInput, 'Test Title');
    await user.type(authorInput, 'Tester1');
    await user.type(urlInput, 'test.com');
    await user.click(createButton);

    console.log(`00: ${createMock.mock.calls[0][0]}`);
    expect(createMock.mock.calls).toHaveLength(1);
    expect(createMock.mock.calls[0][0]).toBe('Test Title');
    expect(createMock.mock.calls[0][1]).toBe('Tester1');
    expect(createMock.mock.calls[0][2]).toBe('test.com');
  });
});
