

const LoginForm = (props) => {
  return (
    <>
      <form
        className="d-flex flex-column justify-content-end"
        onSubmit={props.handleLogin}
      >
        <div>
          <span className="me-2">username</span>
          <input
            className="mb-2"
            data-testid="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          <span className="me-2">password</span>
          <input
            className="mb-2"
            data-testid="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
