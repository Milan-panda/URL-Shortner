import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(" /api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Optionally, you can handle the successful signup, e.g., dispatch a login action
        setSuccessMessage(responseData.message); // Set success message
        
        //Loading set to false
        setIsLoading(false);
        
        // Redirect the user to the login page
        
        setTimeout(()=>{
          navigate("/dashboard");
          // Store the token in localStorage
          localStorage.setItem("Authorization", responseData.token);
          // Dispatch the 'LOGIN' action with the user data (e.g., token)
          dispatch({ type: "LOGIN", payload: responseData.token });
        }, 3000)

      } else {
        setIsLoading(false);
        setError(responseData.error || "Error during signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setIsLoading(false);
      setError("Error during signup");
    }
  };

  return { login, isLoading, error, successMessage };
};
