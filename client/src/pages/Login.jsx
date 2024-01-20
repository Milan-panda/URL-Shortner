import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import styles from "../css/input.module.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, successMessage } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(userName, password);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        className: "foo-bar",
      });
    }

    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-right",
        className: "foo-bar",
      });
    }
  }, [error, successMessage]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-2 auth-div">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Login
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={styles.input}
                id="username"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={styles.input}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center flex-col">
              <button
                className={`bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit ` + (userName=="" || password=="" ? `cursor-not-allowed` : `hover:bg-indigo-700`)}
                type="submit"
                disabled={userName=="" || password==""}
              >
                {isLoading && <Loader />} Login
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-500"
                to="#"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-sm mt-6">
              <span className="text-gray-700">Don't have an account?</span>
              <Link
                className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-500 ml-1"
                to="/register"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
