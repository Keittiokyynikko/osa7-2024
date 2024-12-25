import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogPage = ({ handleEdit }) => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState("");

  if (!blog) {
    return null;
  }

  const handleComment = async (event) => {
    event.preventDefault();
    const newComment = {
      content: comment,
      blog: blog.id,
    };
    blogService.comment(newComment);
    setComment("")
  };

  const listStyle = {
    listStyle: "none",
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mb-5">
        <h1 className="fs-1">{blog.title}</h1>
        <a className="mb-4" href={blog.url}>
          {blog.url}
        </a>
        <p className="mt-3 mb-1 fs-4">{blog.likes} likes</p>
        <p>
          <button onClick={() => handleEdit(blog)}>Like</button>
        </p>
        <p>
          added by <b>{blog.user.name}</b>
        </p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <form onSubmit={handleComment}>
            <input
              className="me-3"
              title="comment"
              type="text"
              value={comment}
              name="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">Add comment</button>
          </form>
        </div>
        <div className="text-end">
          <h3>Comments</h3>
          <ul className="p-0 mt-3">
            {blog.comments.map((blog) => (
              <li
                style={listStyle}
                className="text-end text-decoration-none mb-2"
                key={blog.id}
              >
                {blog.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
