import "./Login.css";

export const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="logo-container">
          <h1 className="heading">Blogosphere</h1>
          <p className="tagline">
            <i>like atmosphere like Blogosphere</i>
          </p>
        </div>
        <div className="form-container">
          <div className="form-data">
            <h1 className="login-heading">Login</h1>
            <input
              className="input-container"
              type="email"
              placeholder="Email"
            ></input>
            <input
              className="input-container"
              type="password"
              placeholder="password"
            ></input>
            <button className="login-button">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};
