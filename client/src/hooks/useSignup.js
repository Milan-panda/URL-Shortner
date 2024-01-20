import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (name, username, email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(' /api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsLoading(false);
        // Optionally, you can handle the successful signup, e.g., dispatch a login action
        setSuccessMessage(responseData.message); // Set success message
        // Redirect the user to the login page
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setIsLoading(false);
        setError(responseData.error || "Error during signup");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
      setError("Error during signup");
    }
  };

  return { signup, isLoading, error, successMessage };
};
