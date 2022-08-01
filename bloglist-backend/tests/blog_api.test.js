const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();

  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//4.8
test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// 4.9
test('ids are defined', async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

describe('adding blogs', () => {
  // 4.10
  test('a valid note can be added ', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      title: 'Adding blog',
      author: 'Will Addthis',
      url: 'https://reactpatterns.com/',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain('Adding blog');
  });

  // 4.11
  test('blog without likes has default likes of 0', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      title: 'I have no likes',
      author: 'Will Addthis',
      url: 'https://reactpatterns.com/',
    };

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201);

    expect(JSON.parse(savedBlog.text).likes).toEqual(0);
  });

  // 4.12
  test('blog without title and url is not added', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      author: 'Will Addthis',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  //extra
  test('blog without title and with url is added', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      author: 'Will Addthis',
      url: 'https://reactpatterns.com/',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  //extra
  test('blog with title and without url is added', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      title: 'This is title',
      author: 'Will Addthis',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });
});

// 4.13
describe('deleting blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      title: 'This will be deleted',
      author: 'Will Addthis',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

// 4.14
describe('updating blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const startBlogs = await helper.blogsInDb();
    const blogToUpdate = startBlogs[0];

    const updatedBlog = {
      likes: 34,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain(blogToUpdate.title);

    const likes = blogsAtEnd.find((blog) => blog.likes === updatedBlog.likes);

    expect(likes).toBeDefined();
  });
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('blog creation succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const loginRes = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newBlog = {
      title: 'Andorra adventure',
      author: 'Me',
      url: 'google.com',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginRes.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(result.body.title).toEqual('Andorra adventure');

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
