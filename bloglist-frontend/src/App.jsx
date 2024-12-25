import { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import BlogPage from "./components/BlogPage";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, likeCurrentBlog } from "./reducers/blogReducer";
import { userLogin, userLogout, setUserByLocal } from "./reducers/loginReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userLocal = JSON.parse(loggedUserJSON);
      dispatch(setUserByLocal(userLocal));
      blogService.setToken(userLocal.token);
    }
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      dispatch(userLogin({ username, password }));
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification({ msg: `${exception}`, time: 2, type: false }));
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleCreate = async () => {
    console.log("create");
    blogFormRef.current.toggleVisibility();
    dispatch(initializeBlogs());
  };

  const handleEdit = async (blogElement) => {
    const blog = blogs.find((b) => b.id === blogElement.id);

    const newBlog = {
      user: blog.user.id,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    try {
      dispatch(likeCurrentBlog(newBlog));
      dispatch(initializeBlogs());
    } catch (exception) {
      console.log(exception);
    }
  };

  const padding = {
    padding: 5,
    color: "black",
  };

  const bar = {
    backgroundColor: "lightblue",
    padding: 10,
  };

  return (
    <Router>
      <div className="container bg-white">
        <div
          className="d-flex justify-content-between align-items-center"
          style={bar}
        >
          <div className="bar-left">
            <Link
              className="text-decoration-none fw-bold"
              style={padding}
              to={"/"}
            >
              blogs
            </Link>
            <Link
              className="text-decoration-none fw-bold"
              style={padding}
              to={"/users"}
            >
              users
            </Link>
          </div>
          {user && (
            <div className="bar-right">
              <span className="me-3">
                <b>{user.name}</b> logged in
              </span>
              <button onClick={handleLogout} type="submit">
                logout
              </button>
            </div>
          )}
        </div>
        <div className="header mb-5 mt-2 d-flex justify-content-between">
          <div className="d-flex flex-column">
            <h2 className="fw-bold">Blogs App</h2>
          </div>
          {!user && (
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          )}
        </div>
        <Notification />

        <Routes>
          <Route path="/users" element={<Users blogs={blogs} />} />
          <Route path="/users/:id" element={<User blogs={blogs} />} />
          <Route
            path="/blogs/:id"
            element={<BlogPage handleEdit={handleEdit} />}
          />
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
