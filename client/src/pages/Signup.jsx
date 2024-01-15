import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading, error, successMessage } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, userName, email, password);
  };

  return (
    <form className="sign-up" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </form>
  );
};

export default Signup;
