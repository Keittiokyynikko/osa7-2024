import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducers/blogReducer";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    console.log("creating", title, author, url);

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(createNewBlog(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      const ntfnForm = {
        msg: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        time: 2,
        type: true,
      };
      dispatch(setNotification(ntfnForm));
    } catch (exception) {
      dispatch(setNotification({ msg: exception, time: 2, type: false }));
    }
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-start">Create new</h2>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleCreate}
      >
        <div>
          <p className="m-0">title:</p>
          <input
            className="title mb-2"
            data-testid="title"
            title="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <p className="m-0">author:</p>
          <input
            className="author mb-2"
            data-testid="author"
            title="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <p className="m-0">url:</p>
          <input
            className="url mb-4"
            data-testid="url"
            title="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="mb-4" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
