import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  await response.data.sort((a, b) => b.likes - a.likes);
  return response.data;
};

const newBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
  return true;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const newComment = {
    content: comment
  }

  await axios.post(`${baseUrl}/${id}/comments`, newComment, config)
  return true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, newBlog, setToken, addLike, deleteBlog, addComment };
