import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import { useRef } from "react";

const Home = ({ user, handleCreate }) => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <>
      {user && (
        <div className="mb-3">
          <Togglable ref={blogFormRef} buttonLabel="New blog">
            <BlogForm createBlog={handleCreate} />
          </Togglable>
        </div>
      )}
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-6 col-md-4 col-lg-3">
            <Blog key={blog.id} blog={blog} user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
