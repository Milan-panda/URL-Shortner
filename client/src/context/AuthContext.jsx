import { createContext, useEffect, useReducer } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('Authorization');

    if (token) {
      const decodedToken = jwtDecode(token);

      dispatch({
        type: 'LOGIN',
        payload: {
          id: decodedToken.user.id,
          email: decodedToken.user.email,
          name: decodedToken.user.name,
          username: decodedToken.user.username,
        },
      });
    }
  }, []);

  // console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
