import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoading, error, successMessage} = useLogin()

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await login(userName, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
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

      <button>Login</button>
    </form>
  );
};

export default Login;
