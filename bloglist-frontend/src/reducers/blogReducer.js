import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    newBlog(state, action) {
      const blog = action.payload;
      state.push({
        title: blog.title,
        author: blog.author,
        url: blog.url,
      });
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      const blogToLike = state.filter((b) => b.id === id);
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      state.map((a) => (a.id !== id ? a : changedBlog));
      return state;
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      state.filter((a) => a.id !== id);
      return state;
    },
  },
});

export const { newBlog, setBlogs, appendBlog, likeBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeCurrentBlog = (blog) => {
  return async (dispatch) => {
    const editedBlog = await blogService.edit(blog);
    dispatch(likeBlog(editedBlog));
  };
};

export const removeCurrentBlog = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blog);
    dispatch(removeBlog(removedBlog));
  };
};

export default blogSlice.reducer;
