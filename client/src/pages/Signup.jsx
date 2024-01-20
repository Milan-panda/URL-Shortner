import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import styles from "../css/input.module.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading, error, successMessage } = useSignup();

  useEffect(()=>{
    if(error){
      toast.error(error, {
        position: "bottom-right",
        className: 'foo-bar'
      });
    }
    if(successMessage){
      toast.success(successMessage, {
        position: "bottom-right",
        className: 'foo-bar'
      });
    }
  }, [error, successMessage])

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, userName, email, password);
  };
  
  return (
    <>
    <div className="flex flex-col items-center justify-center py-2 auth-div">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Sign Up
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={styles.input}
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className={`bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit ` + (userName=="" || password=="" || name=="" || email=="" ? `cursor-not-allowed` : `hover:bg-indigo-700`)}
              type="submit"
              disabled={userName=="" || password=="" || name=="" || email==""}
            >
              {isLoading && <Loader />}Sign Up
            </button>
          </div>
          <div className="text-sm mt-6">
          <span className="text-gray-700">
            Already have an account?
          </span>
          <Link
            className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-500 ml-1"
            to="/login"
          >
            Sign in
          </Link>
        </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Signup;
