import { useParams } from "react-router-dom";

const User = ({ blogs }) => {
  const id = useParams().id;
  const user = blogs.find((b) => b.user.id === id);
  const userBlogs = [];
  blogs.forEach((blog) => {
    if (blog.user.name === user.user.name) {
      userBlogs.push(blog);
    }
  });

  if (!user) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-5">{user.user.name}</h1>
      <h3 className="text-center ">Added blogs</h3>
      <ul className="p-0">
        {userBlogs.map((blog) => (
          <li className="list-unstyled text-center" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
