import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCurrentBlog, initializeBlogs } from "../reducers/blogReducer";

const Blog = ({ blog, user}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const userIsLoggedIn = user !== null ? user.name === blog.user.name : null;

  if(!blog) {
    return null
  }

  const blogStyle = {
    padding: 5,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 2,
    marginBottom: 15,
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    console.log('click')
    setVisible(!visible);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const editBlog = {
      id: blog.id,
      user: blog.user.id,
    };
    if (window.confirm("Do you really wanna delete it?")) {
      try {
        console.log(blog.id);
        dispatch(removeCurrentBlog(editBlog))
        dispatch(initializeBlogs())
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center" style={blogStyle}>
        <span className="d-flex justify-content-center">
          <Link className="link text-center text-dark text-decoration-none" to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </span>
    </div>
  );
};

export default Blog;
